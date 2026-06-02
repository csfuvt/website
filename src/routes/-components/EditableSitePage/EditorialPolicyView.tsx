import {
  EditorialPolicyContent,
  EditorialSection,
} from '../../research_/publications_/dialogue-francophones_/editorial-policy/-editorial-policy.model.ts';

export const EditorialPolicyView = ({
  content,
}: {
  content: EditorialPolicyContent;
}) => (
  <div className="site-page-html editorial-policy-view">
    {content.sections.map((section, sectionIndex) => (
      <EditorialSectionView key={sectionIndex} section={section} />
    ))}
  </div>
);

const EditorialSectionView = ({ section }: { section: EditorialSection }) => (
  <div className="editorial-policy-view__section">
    {section.title ? (
      <h3 className="editorial-policy-view__section-title">{section.title}</h3>
    ) : null}
    {section.blocks.map((block, blockIndex) => {
      if (block.type === 'paragraph') {
        return (
          <p
            key={blockIndex}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      }
      return (
        <div key={blockIndex} className="editorial-policy-view__list-block">
          {block.intro ? (
            <p dangerouslySetInnerHTML={{ __html: block.intro }} />
          ) : null}
          <ul>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      );
    })}
  </div>
);
