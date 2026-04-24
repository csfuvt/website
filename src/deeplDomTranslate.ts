import axios from 'axios';

const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'SVG',
  'CODE',
  'PRE',
  'TEMPLATE',
]);

/** Noduri deja trimise la DeepL în această sesiune (evită retraducerea la fiecare mutație). */
let handledTextNodes = new WeakSet<Text>();

/** La schimbarea limbii sau când vrei retraducere completă (ex. după reload nu e nevoie). */
export function clearDeepLHandledTextNodes() {
  handledTextNodes = new WeakSet();
}

function skipAncestors(el: Element | null): boolean {
  let p: Element | null = el;
  while (p) {
    if (p.getAttribute('translate') === 'no') return true;
    if (p.classList?.contains('notranslate')) return true;
    if (SKIP_TAGS.has(p.tagName)) return true;
    if (p.closest('input, textarea')) return true;
    p = p.parentElement;
  }
  return false;
}

export function collectTranslatableTextNodes(root: HTMLElement): Text[] {
  const out: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const tn = n as Text;
    const parent = tn.parentElement;
    if (!parent) continue;
    if (skipAncestors(parent)) continue;
    if (!(tn.textContent ?? '').trim()) continue;
    out.push(tn);
  }
  return out;
}

/** Rădăcini unde căutăm text: SPA + modale/tooltip-uri Ant în portal pe body. */
function translationRoots(): HTMLElement[] {
  const roots: HTMLElement[] = [];
  const app = document.getElementById('app');
  if (app) roots.push(app);
  document.querySelectorAll('.ant-modal-root').forEach(el => {
    if (el instanceof HTMLElement) roots.push(el);
  });
  document
    .querySelectorAll('.ant-tooltip:not(.ant-tooltip-hidden)')
    .forEach(el => {
      if (el instanceof HTMLElement) roots.push(el);
    });
  document
    .querySelectorAll('.ant-dropdown:not(.ant-dropdown-hidden)')
    .forEach(el => {
      if (el instanceof HTMLElement) roots.push(el);
    });
  return roots;
}

type TranslateResponse =
  | { ok: true; translations: string[] }
  | { ok: false; error?: string };

const DEEPL_TARGET: Record<'en' | 'fr', 'EN' | 'FR'> = { en: 'EN', fr: 'FR' };

const CONTEXT_NEIGHBOR_SEGMENTS = 40;
const MAX_CONTEXT_CHARS = 10_000;

function buildBatchContext(
  allParts: string[],
  batchStart: number,
  batchLen: number
): string | undefined {
  const prev = allParts
    .slice(Math.max(0, batchStart - CONTEXT_NEIGHBOR_SEGMENTS), batchStart)
    .join('\n');
  const next = allParts
    .slice(
      batchStart + batchLen,
      Math.min(
        allParts.length,
        batchStart + batchLen + CONTEXT_NEIGHBOR_SEGMENTS
      )
    )
    .join('\n');
  const combined = [prev, next]
    .filter(s => s.trim().length > 0)
    .join('\n\n')
    .trim();
  if (!combined) return undefined;
  return combined.length > MAX_CONTEXT_CHARS
    ? combined.slice(0, MAX_CONTEXT_CHARS)
    : combined;
}

/**
 * O singură traducere la un moment dat: evită cereri duplicate când MutationObserver
 * și timeout-ul de rută pornesc în paralel sau când DOM-ul face multe mutații rapide.
 */
let translateSerial = Promise.resolve();

async function performTranslatePendingSiteDom(
  siteLang: 'en' | 'fr'
): Promise<void> {
  const nodes: Text[] = [];
  for (const root of translationRoots()) {
    for (const n of collectTranslatableTextNodes(root)) {
      if (!handledTextNodes.has(n)) nodes.push(n);
    }
  }
  if (!nodes.length) return;

  const originals = nodes.map(n => n.textContent ?? '');
  const targetLang = DEEPL_TARGET[siteLang];

  type Batch = { start: number; texts: string[] };
  const batches: Batch[] = [];
  let batchStart = 0;
  let curTexts: string[] = [];
  let size = 0;

  for (let i = 0; i < originals.length; i++) {
    const s = originals[i];
    const add = s.length + 32;
    const overCount = curTexts.length >= 45;
    const overBytes = size + add > 85_000 && curTexts.length > 0;
    if (overCount || overBytes) {
      batches.push({ start: batchStart, texts: curTexts });
      batchStart = i;
      curTexts = [s];
      size = add;
    } else {
      curTexts.push(s);
      size += add;
    }
  }
  if (curTexts.length) batches.push({ start: batchStart, texts: curTexts });

  for (const b of batches) {
    const context = buildBatchContext(originals, b.start, b.texts.length);
    const { data } = await axios.post<TranslateResponse>('/deepl/translate', {
      texts: b.texts,
      targetLang,
      ...(context ? { context } : {}),
    });
    if (!data.ok || !('translations' in data)) {
      throw new Error('DeepL translate răspuns invalid');
    }
    const { translations } = data;
    for (let j = 0; j < b.texts.length; j++) {
      const node = nodes[b.start + j];
      node.textContent = translations[j] ?? b.texts[j];
      handledTextNodes.add(node);
    }
  }
}

/**
 * Traduce doar noduri de text încă neprocesate (conținut nou: modale, descrieri deschise etc.).
 * Include portaluri Ant Design. Apelurile sunt serializate (coadă).
 */
export function translatePendingSiteDom(siteLang: 'en' | 'fr'): Promise<void> {
  const job = translateSerial.then(
    () => performTranslatePendingSiteDom(siteLang),
    () => performTranslatePendingSiteDom(siteLang)
  );
  translateSerial = job.then(
    () => undefined,
    () => undefined
  );
  return job;
}

/** Compat: același lucru ca translatePendingSiteDom (nu mai e legat de un singur root). */
export async function translatePageDom(
  _root: HTMLElement,
  siteLang: 'en' | 'fr'
): Promise<void> {
  await translatePendingSiteDom(siteLang);
}
