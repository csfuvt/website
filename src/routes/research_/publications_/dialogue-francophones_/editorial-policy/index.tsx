import { createFileRoute } from '@tanstack/react-router';
import './styles.css';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';
import { useAuth } from '../../../../../hooks/useAuth.ts';
import { useSitePage } from '../../../../../hooks/useSitePage.ts';
import { Button, Spin } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_EDITORIAL_POLICY,
  EditorialSection,
  normalizeEditorialPolicy,
  parseEditorialPolicyContent,
  serializeEditorialPolicy,
} from './-editorial-policy.model.ts';
import { EditorialPolicyView } from '../../../../-components/EditableSitePage/EditorialPolicyView.tsx';
import { EditorialPolicyEditor } from '../../../../-components/EditableSitePage/EditorialPolicyEditor.tsx';
import '../../../../-components/EditableSitePage/sitePageContent.css';
import '../../../../-components/EditableSitePage/HistorySlidesEditor.css';
import '../../../../-components/EditableSitePage/EditorialPolicyEditor.css';

const EDITORIAL_POLICY_SLUG = 'dialogue-francophones-editorial-policy';

const cloneSections = (sections: EditorialSection[]): EditorialSection[] =>
  sections.map(s => ({
    title: s.title,
    blocks: s.blocks.map(b =>
      b.type === 'paragraph'
        ? { type: 'paragraph' as const, content: b.content }
        : { type: 'list' as const, intro: b.intro, items: [...b.items] }
    ),
  }));

const EditorialPolicyPage = () => {
  const { isLoggedIn } = useAuth();
  const { data, isLoading, isError, saveContent, isSaving } = useSitePage(
    EDITORIAL_POLICY_SLUG
  );

  const policyContent = useMemo(() => {
    if (!data?.content) return DEFAULT_EDITORIAL_POLICY;
    return parseEditorialPolicyContent(data.content);
  }, [data]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftSections, setDraftSections] = useState<EditorialSection[]>([]);

  useEffect(() => {
    if (!isEditMode) {
      setDraftSections(cloneSections(policyContent.sections));
    }
  }, [policyContent, isEditMode]);

  const enterEditMode = () => {
    setDraftSections(cloneSections(policyContent.sections));
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setDraftSections(cloneSections(policyContent.sections));
    setIsEditMode(false);
  };

  const handleSave = async () => {
    const normalized = normalizeEditorialPolicy({ sections: draftSections });
    if (!normalized.sections.length) return;
    await saveContent(serializeEditorialPolicy(normalized));
    setIsEditMode(false);
  };

  const canSave =
    normalizeEditorialPolicy({ sections: draftSections }).sections.length > 0;

  return (
    <div>
      <KBanner label="Dialogues Francophones - Politica editorială" />

      {isLoggedIn && (
        <div className="history-edit-toolbar">
          {isEditMode ? (
            <>
              <span className="history-edit-toolbar__hint">
                Organizează conținutul în secțiuni — paragrafe și liste cu
                elemente editabile.
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

      <div className="content-policy">
        {isLoading ? (
          <Spin />
        ) : isError ? (
          <span>Pagina nu poate fi afișată momentan. Reveniți mai târziu!</span>
        ) : isEditMode ? (
          <div className="editorial-policy-edit-layout">
            <EditorialPolicyEditor
              sections={draftSections}
              onChange={setDraftSections}
            />
          </div>
        ) : (
          <EditorialPolicyView content={policyContent} />
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/research_/publications_/dialogue-francophones_/editorial-policy/'
)({
  component: EditorialPolicyPage,
});
