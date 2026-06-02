import { Button, Card, Input, Popconfirm, Space } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import TextEditor from '../KTextEditor/KTextEditor.tsx';
import {
  EditorialBlock,
  EditorialSection,
  emptyList,
  emptyParagraph,
  emptySection,
} from '../../research_/publications_/dialogue-francophones_/editorial-policy/-editorial-policy.model.ts';
import './HistorySlidesEditor.css';
import './EditorialPolicyEditor.css';

type EditorialPolicyEditorProps = {
  sections: EditorialSection[];
  onChange: (sections: EditorialSection[]) => void;
};

export const EditorialPolicyEditor = ({
  sections,
  onChange,
}: EditorialPolicyEditorProps) => {
  const updateSection = (index: number, patch: Partial<EditorialSection>) => {
    onChange(
      sections.map((section, i) =>
        i === index ? { ...section, ...patch } : section
      )
    );
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const removeSection = (index: number) => {
    onChange(sections.filter((_, i) => i !== index));
  };

  const addSection = () => {
    onChange([...sections, emptySection()]);
  };

  const updateBlock = (
    sectionIndex: number,
    blockIndex: number,
    block: EditorialBlock
  ) => {
    const section = sections[sectionIndex];
    const blocks = section.blocks.map((b, i) => (i === blockIndex ? block : b));
    updateSection(sectionIndex, { blocks });
  };

  const removeBlock = (sectionIndex: number, blockIndex: number) => {
    const section = sections[sectionIndex];
    const blocks = section.blocks.filter((_, i) => i !== blockIndex);
    updateSection(sectionIndex, {
      blocks: blocks.length ? blocks : [emptyParagraph()],
    });
  };

  const moveBlock = (
    sectionIndex: number,
    blockIndex: number,
    direction: -1 | 1
  ) => {
    const section = sections[sectionIndex];
    const target = blockIndex + direction;
    if (target < 0 || target >= section.blocks.length) return;
    const blocks = [...section.blocks];
    [blocks[blockIndex], blocks[target]] = [blocks[target], blocks[blockIndex]];
    updateSection(sectionIndex, { blocks });
  };

  const addBlock = (sectionIndex: number, type: 'paragraph' | 'list') => {
    const section = sections[sectionIndex];
    updateSection(sectionIndex, {
      blocks: [
        ...section.blocks,
        type === 'paragraph' ? emptyParagraph() : emptyList(),
      ],
    });
  };

  return (
    <div className="history-slides-editor editorial-policy-editor">
      {sections.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          className="history-slides-editor__section"
          title={`Secțiunea ${sectionIndex + 1}`}
          extra={
            <Space size="small" wrap>
              <Button
                size="small"
                icon={<ArrowUpOutlined />}
                disabled={sectionIndex === 0}
                onClick={() => moveSection(sectionIndex, -1)}
              />
              <Button
                size="small"
                icon={<ArrowDownOutlined />}
                disabled={sectionIndex === sections.length - 1}
                onClick={() => moveSection(sectionIndex, 1)}
              />
              <Popconfirm
                title="Ștergi această secțiune?"
                okText="Da"
                cancelText="Nu"
                onConfirm={() => removeSection(sectionIndex)}
                disabled={sections.length <= 1}>
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  disabled={sections.length <= 1}>
                  Șterge secțiunea
                </Button>
              </Popconfirm>
            </Space>
          }>
          <div className="history-slides-editor__field">
            <label>Titlu secțiune (opțional)</label>
            <Input
              value={section.title}
              placeholder="Lăsați gol dacă nu aveți titlu"
              onChange={e =>
                updateSection(sectionIndex, { title: e.target.value })
              }
            />
          </div>

          <div className="history-slides-editor__paragraphs">
            <label>Blocuri de conținut</label>
            {section.blocks.map((block, blockIndex) => (
              <div
                key={blockIndex}
                className="history-slides-editor__paragraph-block editorial-policy-editor__block">
                <div className="history-slides-editor__paragraph-header">
                  <span>
                    {block.type === 'paragraph'
                      ? `Paragraf ${blockIndex + 1}`
                      : `Listă ${blockIndex + 1}`}
                  </span>
                  <Space size="small">
                    <Button
                      type="text"
                      size="small"
                      icon={<ArrowUpOutlined />}
                      disabled={blockIndex === 0}
                      onClick={() => moveBlock(sectionIndex, blockIndex, -1)}
                    />
                    <Button
                      type="text"
                      size="small"
                      icon={<ArrowDownOutlined />}
                      disabled={blockIndex === section.blocks.length - 1}
                      onClick={() => moveBlock(sectionIndex, blockIndex, 1)}
                    />
                    <Popconfirm
                      title="Ștergi acest bloc?"
                      okText="Da"
                      cancelText="Nu"
                      onConfirm={() => removeBlock(sectionIndex, blockIndex)}
                      disabled={section.blocks.length <= 1}>
                      <Button
                        type="text"
                        danger
                        size="small"
                        disabled={section.blocks.length <= 1}>
                        Șterge
                      </Button>
                    </Popconfirm>
                  </Space>
                </div>

                {block.type === 'paragraph' ? (
                  <TextEditor
                    value={block.content}
                    onChange={content =>
                      updateBlock(sectionIndex, blockIndex, {
                        type: 'paragraph',
                        content,
                      })
                    }
                    placeholder="Text paragraf"
                  />
                ) : (
                  <div className="editorial-policy-editor__list-fields">
                    <div>
                      <label>Text înainte de listă</label>
                      <TextEditor
                        value={block.intro}
                        onChange={intro =>
                          updateBlock(sectionIndex, blockIndex, {
                            ...block,
                            intro,
                          })
                        }
                        placeholder="Ex: Se apreciază:"
                      />
                    </div>
                    <div>
                      <label>Elemente listă</label>
                      {block.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="editorial-policy-editor__list-item">
                          <Input.TextArea
                            value={item}
                            rows={2}
                            placeholder={`Element ${itemIndex + 1}`}
                            onChange={e => {
                              const items = block.items.map((it, i) =>
                                i === itemIndex ? e.target.value : it
                              );
                              updateBlock(sectionIndex, blockIndex, {
                                ...block,
                                items,
                              });
                            }}
                          />
                          <Popconfirm
                            title="Ștergi elementul?"
                            okText="Da"
                            cancelText="Nu"
                            onConfirm={() => {
                              const items = block.items.filter(
                                (_, i) => i !== itemIndex
                              );
                              updateBlock(sectionIndex, blockIndex, {
                                ...block,
                                items: items.length ? items : [''],
                              });
                            }}
                            disabled={block.items.length <= 1}>
                            <Button
                              type="text"
                              danger
                              size="small"
                              disabled={block.items.length <= 1}>
                              Șterge
                            </Button>
                          </Popconfirm>
                        </div>
                      ))}
                      <Button
                        type="dashed"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() =>
                          updateBlock(sectionIndex, blockIndex, {
                            ...block,
                            items: [...block.items, ''],
                          })
                        }>
                        Adaugă element
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Space wrap>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => addBlock(sectionIndex, 'paragraph')}>
                Adaugă paragraf
              </Button>
              <Button
                type="dashed"
                icon={<UnorderedListOutlined />}
                onClick={() => addBlock(sectionIndex, 'list')}>
                Adaugă listă
              </Button>
            </Space>
          </div>
        </Card>
      ))}

      <Button type="primary" icon={<PlusOutlined />} onClick={addSection} block>
        Adaugă secțiune
      </Button>
    </div>
  );
};
