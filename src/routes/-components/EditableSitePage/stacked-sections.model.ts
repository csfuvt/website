import { HistorySlide } from './HistorySlidesEditor.tsx';

export type StackedSectionsContent = {
  slides: HistorySlide[];
};

export const parseStackedSectionsContent = (
  content: string
): StackedSectionsContent => {
  try {
    const parsed = JSON.parse(content) as StackedSectionsContent;
    if (Array.isArray(parsed?.slides)) {
      return {
        slides: parsed.slides.map(s => ({
          title: s.title ?? '',
          paragraphs:
            Array.isArray(s.paragraphs) && s.paragraphs.length
              ? s.paragraphs
              : [''],
        })),
      };
    }
  } catch {
    /* fallback */
  }
  return { slides: [] };
};

export const normalizeStackedSections = (
  slides: HistorySlide[]
): HistorySlide[] =>
  slides
    .map(slide => ({
      title: slide.title.trim(),
      paragraphs: slide.paragraphs.map(p => p.trim()).filter(Boolean),
    }))
    .filter(slide => slide.paragraphs.length > 0);

export const serializeStackedSections = (slides: HistorySlide[]): string =>
  JSON.stringify({ slides: normalizeStackedSections(slides) });
