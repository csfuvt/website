import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import './styles.css';
import { useAuth } from '../../../../../../hooks/useAuth.ts';
import { useSitePage } from '../../../../../../hooks/useSitePage.ts';
import { Button, Spin } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import {
  HistorySlide,
  HistorySlidesEditor,
} from '../../../../../-components/EditableSitePage/HistorySlidesEditor.tsx';
import { StackedSectionsView } from '../../../../../-components/EditableSitePage/StackedSectionsView.tsx';
import {
  normalizeStackedSections,
  parseStackedSectionsContent,
  serializeStackedSections,
} from '../../../../../-components/EditableSitePage/stacked-sections.model.ts';
import '../../../../../-components/EditableSitePage/sitePageContent.css';
import '../../../../../-components/EditableSitePage/HistorySlidesEditor.css';

const DIALOGUES_ABOUT_SLUG = 'dialogue-francophones-about';

export const DialoguesFrancophonesAboutPage = () => {
  const { isLoggedIn } = useAuth();
  const { data, isLoading, isError, saveContent, isSaving } =
    useSitePage(DIALOGUES_ABOUT_SLUG);

  const sectionsContent = useMemo(
    () => (data ? parseStackedSectionsContent(data.content) : { slides: [] }),
    [data]
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftSlides, setDraftSlides] = useState<HistorySlide[]>([]);

  useEffect(() => {
    if (!isEditMode && sectionsContent.slides.length) {
      setDraftSlides(
        sectionsContent.slides.map(s => ({
          title: s.title,
          paragraphs: [...s.paragraphs],
        }))
      );
    }
  }, [sectionsContent, isEditMode]);

  const enterEditMode = () => {
    setDraftSlides(
      sectionsContent.slides.map(s => ({
        title: s.title,
        paragraphs: [...s.paragraphs],
      }))
    );
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setDraftSlides(
      sectionsContent.slides.map(s => ({
        title: s.title,
        paragraphs: [...s.paragraphs],
      }))
    );
    setIsEditMode(false);
  };

  const handleSave = async () => {
    const normalized = normalizeStackedSections(draftSlides);
    if (!normalized.length) return;
    await saveContent(serializeStackedSections(normalized));
    setIsEditMode(false);
  };

  const canSave = normalizeStackedSections(draftSlides).length > 0;

  return (
    <div>
      <KBanner label="Dialogues francophones - Despre noi" />

      {isLoggedIn && (
        <div className="history-edit-toolbar">
          {isEditMode ? (
            <>
              <span className="history-edit-toolbar__hint">
                Secțiunile apar una sub alta pe pagină. Adaugă paragrafe sau
                secțiuni noi după nevoie.
              </span>
              <Button icon={<EyeOutlined />} onClick={cancelEdit}>
                Renunță
              </Button>
              <Button
                type="primary"
                loading={isSaving}
                onClick={handleSave}
                disabled={!canSave}>
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

      <div className="content content--stacked">
        {isLoading ? (
          <div className="flex">
            <Spin />
          </div>
        ) : isError ? (
          <span>Pagina nu poate fi afișată momentan. Reveniți mai târziu!</span>
        ) : isEditMode ? (
          <div className="dialogues-about-edit">
            <HistorySlidesEditor
              slides={draftSlides}
              onChange={setDraftSlides}
            />
          </div>
        ) : sectionsContent.slides.length > 0 ? (
          <StackedSectionsView slides={sectionsContent.slides} />
        ) : null}
      </div>
    </div>
  );
};
