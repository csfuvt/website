import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../-components/KBanner/KBanner';
import { KSliderRight } from '../../-components/KSliderRight/KSliderRight';
import istoric1 from '../../../../public/Despre_noi/istoric1.jpg';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useSitePage } from '../../../hooks/useSitePage.ts';
import { Button, Spin } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import {
  HistorySlide,
  HistorySlidesEditor,
} from '../../-components/EditableSitePage/HistorySlidesEditor.tsx';
import '../../-components/EditableSitePage/sitePageContent.css';
import '../../-components/EditableSitePage/HistorySlidesEditor.css';

const HISTORY_SLUG = 'about-history';

export type HistorySlidesContent = {
  slides: HistorySlide[];
};

const parseHistoryContent = (content: string): HistorySlidesContent => {
  try {
    const parsed = JSON.parse(content) as HistorySlidesContent;
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

const normalizeForSave = (slides: HistorySlide[]): HistorySlide[] =>
  slides
    .map(slide => ({
      title: slide.title.trim(),
      paragraphs: slide.paragraphs.map(p => p.trim()).filter(Boolean),
    }))
    .filter(slide => slide.paragraphs.length > 0);

const HistoryPage = () => {
  const { isLoggedIn } = useAuth();
  const { data, isLoading, isError, saveContent, isSaving } =
    useSitePage(HISTORY_SLUG);

  const slidesContent = useMemo(
    () => (data ? parseHistoryContent(data.content) : { slides: [] }),
    [data]
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftSlides, setDraftSlides] = useState<HistorySlide[]>([]);

  useEffect(() => {
    if (!isEditMode && slidesContent.slides.length) {
      setDraftSlides(
        slidesContent.slides.map(s => ({
          title: s.title,
          paragraphs: [...s.paragraphs],
        }))
      );
    }
  }, [slidesContent, isEditMode]);

  const enterEditMode = () => {
    setDraftSlides(
      slidesContent.slides.map(s => ({
        title: s.title,
        paragraphs: [...s.paragraphs],
      }))
    );
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setDraftSlides(
      slidesContent.slides.map(s => ({
        title: s.title,
        paragraphs: [...s.paragraphs],
      }))
    );
    setIsEditMode(false);
  };

  const handleSave = async () => {
    const normalized = normalizeForSave(draftSlides);
    if (!normalized.length) return;
    await saveContent(JSON.stringify({ slides: normalized }));
    setIsEditMode(false);
  };

  return (
    <div>
      <KBanner label={'ISTORIC'} />

      {isLoggedIn && (
        <div className="history-edit-toolbar">
          {isEditMode ? (
            <>
              <span className="history-edit-toolbar__hint">
                Modifică secțiunile și paragrafele — sliderul afișează câte o
                secțiune pe slide.
              </span>
              <Button icon={<EyeOutlined />} onClick={cancelEdit}>
                Renunță
              </Button>
              <Button
                type="primary"
                loading={isSaving}
                onClick={handleSave}
                disabled={!normalizeForSave(draftSlides).length}>
                Salvează
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              size="large"
              icon={<EditOutlined />}
              onClick={enterEditMode}>
              Modifică conținutul
            </Button>
          )}
        </div>
      )}

      <div className="content">
        {isLoading ? (
          <div className="flex">
            <Spin />
          </div>
        ) : isError ? (
          <span>Pagina nu poate fi afișată momentan. Reveniți mai târziu!</span>
        ) : isEditMode ? (
          <div className="history-preview-layout">
            <img
              src={istoric1}
              alt="Istoric CSF"
              className="history-preview-layout__image"
            />
            <div className="history-preview-layout__editor">
              <HistorySlidesEditor
                slides={draftSlides}
                onChange={setDraftSlides}
              />
            </div>
          </div>
        ) : slidesContent.slides.length > 0 ? (
          <KSliderRight
            slides={slidesContent.slides}
            image
            imageUrl={istoric1}
          />
        ) : null}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about_/history/')({
  component: HistoryPage,
});

export default HistoryPage;
