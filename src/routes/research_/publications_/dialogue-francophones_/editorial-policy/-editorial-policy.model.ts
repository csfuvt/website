export type EditorialBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'list'; intro: string; items: string[] };

export type EditorialSection = {
  title: string;
  blocks: EditorialBlock[];
};

export type EditorialPolicyContent = {
  sections: EditorialSection[];
};

export const emptyParagraph = (): EditorialBlock => ({
  type: 'paragraph',
  content: '',
});

export const emptyList = (): EditorialBlock => ({
  type: 'list',
  intro: '',
  items: [''],
});

export const emptySection = (): EditorialSection => ({
  title: '',
  blocks: [emptyParagraph()],
});

export const DEFAULT_EDITORIAL_POLICY: EditorialPolicyContent = {
  sections: [
    {
      title: '',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Revista <i>Dialogues francophones</i> stabilește o temă pentru fiecare număr prin consultarea membrilor comitetului științific. Calitatea articolelor publicate în <i>Dialogues francophones</i> rezultă din evaluarea temeinică a contribuțiilor trimise pe adresa revistei.',
        },
        {
          type: 'paragraph',
          content:
            'Textele trimise pe adresa redacției sunt evaluate, în prima etapă, de comitetul de redacției al <i>Dialogues francophones</i> pentru a stabili gradul de adecvare la tematica anunțată.',
        },
        {
          type: 'paragraph',
          content:
            'Redacția <i>Dialogues francophones</i> trimite textele evaluatorilor după obținerea raportului de originalitate (Ithenticate, Turnitin etc.) pentru fiecare articol.',
        },
        {
          type: 'paragraph',
          content:
            'Evaluarea dublu anonimizată – a autorului și a evaluatorilor – este efectuată de cel puțin doi cercetători în domeniu (alții decât membrii comitetului de redacție), membri în comitetul științific sau experți la care se apelează ocazional.',
        },
        {
          type: 'paragraph',
          content:
            'În fiecare număr al revistei, lista evaluatorilor este actualizată.',
        },
        {
          type: 'list',
          intro:
            'În procesul de evaluare, membrii comitetului științific și experții-evaluatori ad hoc au în vedere următoarele criterii :',
          items: [
            'Respectarea protocolului de tehnoredactare (nerespectarea antrenează respingerea automată a articolului)',
            'Originalitatea subiectului tratat în articolul supus evaluării',
            'Adecvarea acestuia la tematica numărului',
            'Relevanța studiului propus, problematica și argumentarea',
            'Calitatea resurselor bibliografice.',
          ],
        },
        {
          type: 'list',
          intro: 'Se apreciază:',
          items: [
            'Părțile originale și corect editate în materialul supus evaluării',
            'Referințele bibliografice primare, exegeza acestora dacă o impune subiectul',
            'Bunele practici în materie de integritate în prezentarea rezultatelor de cercetare',
          ],
        },
        {
          type: 'list',
          intro: 'Se sancționează:',
          items: [
            'Absența surselor primare din bibliografie în favoarea referințele bibliografice secundare',
            'Dubla citare incomplet semnalată',
            'Preluarea de idei cât și preluarea de text fără citările de rigoare',
            'Citatele care depășesc 10 rânduri',
            'Preluarea de tip mozaic a unui bloc de text, fără citarea de rigoare, iar în interiorului textului respectiv se înlocuiesc cuvinte, dar cu păstrarea structurii de ansamblu a frazării',
          ],
        },
        {
          type: 'paragraph',
          content:
            'Toți colaboratorii vor fi informați cu privire la acceptarea sau refuzul propunerii lor prin intermediul platformei <i>Dialogues francophones</i>.',
        },
      ],
    },
  ],
};

const normalizeBlock = (block: EditorialBlock): EditorialBlock | null => {
  if (block.type === 'paragraph') {
    const content = block.content.trim();
    return content ? { type: 'paragraph', content } : null;
  }
  const intro = block.intro.trim();
  const items = block.items.map(i => i.trim()).filter(Boolean);
  if (!intro && !items.length) return null;
  return { type: 'list', intro, items };
};

export const normalizeEditorialPolicy = (
  content: EditorialPolicyContent
): EditorialPolicyContent => ({
  sections: content.sections
    .map(section => ({
      title: section.title.trim(),
      blocks: section.blocks
        .map(normalizeBlock)
        .filter((b): b is EditorialBlock => b !== null),
    }))
    .filter(section => section.blocks.length > 0),
});

export const legacyHtmlToEditorialPolicy = (
  html: string
): EditorialPolicyContent => {
  if (typeof document === 'undefined') {
    return DEFAULT_EDITORIAL_POLICY;
  }
  const div = document.createElement('div');
  div.innerHTML = html;
  const blocks: EditorialBlock[] = [];

  Array.from(div.children).forEach(child => {
    if (child.tagName === 'P') {
      const content = child.innerHTML.trim();
      if (content) blocks.push({ type: 'paragraph', content });
    } else if (child.tagName === 'UL') {
      const items = Array.from(child.querySelectorAll('li'))
        .map(li => li.innerHTML.trim())
        .filter(Boolean);
      const last = blocks[blocks.length - 1];
      let intro = '';
      if (last?.type === 'paragraph') {
        intro = last.content;
        blocks.pop();
      }
      if (intro || items.length) {
        blocks.push({
          type: 'list',
          intro,
          items: items.length ? items : [''],
        });
      }
    }
  });

  return {
    sections: blocks.length
      ? [{ title: '', blocks }]
      : DEFAULT_EDITORIAL_POLICY.sections,
  };
};

export const parseEditorialPolicyContent = (
  raw: string
): EditorialPolicyContent => {
  try {
    const parsed = JSON.parse(raw) as EditorialPolicyContent;
    if (Array.isArray(parsed?.sections)) {
      return {
        sections: parsed.sections.map(s => ({
          title: s.title ?? '',
          blocks: (s.blocks ?? []).map(b => {
            if (b.type === 'list') {
              return {
                type: 'list' as const,
                intro: b.intro ?? '',
                items:
                  Array.isArray(b.items) && b.items.length ? b.items : [''],
              };
            }
            return {
              type: 'paragraph' as const,
              content: b.content ?? '',
            };
          }),
        })),
      };
    }
  } catch {
    /* legacy HTML */
  }
  if (raw.includes('<p>') || raw.includes('<ul>')) {
    return legacyHtmlToEditorialPolicy(raw);
  }
  return DEFAULT_EDITORIAL_POLICY;
};

export const serializeEditorialPolicy = (
  content: EditorialPolicyContent
): string => JSON.stringify(normalizeEditorialPolicy(content));
