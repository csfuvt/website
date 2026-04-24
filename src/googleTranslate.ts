export type SiteTranslateLang = 'ro' | 'en' | 'fr';

type GTranslateElementCtor = {
  new (
    options: {
      pageLanguage: string;
      includedLanguages: string;
      layout?: number;
      autoDisplay?: boolean;
    },
    elementId: string
  ): unknown;
  InlineLayout: { SIMPLE: number };
};

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: GTranslateElementCtor;
      };
    };
  }
}

const GOOGTRANS = 'googtrans';

let translateWidgetInitialized = false;

/** Citește limba țintă din cookie-ul folosit de widget-ul Google Translate. */
export function getTranslateTargetFromCookie(): SiteTranslateLang {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${GOOGTRANS}=([^;]+)`)
  );
  if (!match?.[1]) return 'ro';
  const decoded = decodeURIComponent(match[1]);
  const parts = decoded.split('/').filter(Boolean);
  const last = parts[parts.length - 1]?.toLowerCase();
  if (last === 'en' || last === 'fr') return last;
  return 'ro';
}

function clearGoogtransCookies() {
  const expire = 'max-age=0';
  const host = window.location.hostname;
  const base = `${GOOGTRANS}=;path=/;${expire}`;
  document.cookie = base;
  document.cookie = `${GOOGTRANS}=;path=/;domain=${host};${expire}`;
  if (!host.includes('localhost') && host.split('.').length > 1) {
    const root = host.split('.').slice(-2).join('.');
    document.cookie = `${GOOGTRANS}=;path=/;domain=.${root};${expire}`;
  }
}

/** Setează limba prin Google Translate și reîncarcă pagina (fără fișiere JSON). */
export function applySiteLanguage(lang: SiteTranslateLang) {
  if (lang === 'ro') {
    clearGoogtransCookies();
  } else {
    clearGoogtransCookies();
    const v = `/ro/${lang}`;
    document.cookie = `${GOOGTRANS}=${encodeURIComponent(v)};path=/`;
  }
  window.location.reload();
}

export function initGoogleTranslateWidget() {
  if (translateWidgetInitialized) return;
  const el = document.getElementById('google_translate_element');
  if (!el || !window.google?.translate?.TranslateElement) return;

  translateWidgetInitialized = true;
  const { TranslateElement } = window.google.translate;
  new TranslateElement(
    {
      pageLanguage: 'ro',
      includedLanguages: 'ro,en,fr',
      layout: TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    'google_translate_element'
  );
}
