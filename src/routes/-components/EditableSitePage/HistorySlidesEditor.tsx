import { Button, Card, Input, Popconfirm, Space } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import TextEditor from '../KTextEditor/KTextEditor.tsx';
import './HistorySlidesEditor.css';

export type HistorySlide = {
  title: string;
  paragraphs: string[];
};

type HistorySlidesEditorProps = {
  slides: HistorySlide[];
  onChange: (slides: HistorySlide[]) => void;
};

const emptySlide = (): HistorySlide => ({
  title: '',
  paragraphs: [''],
});

export const HistorySlidesEditor = ({
  slides,
  onChange,
}: HistorySlidesEditorProps) => {
  const updateSlide = (index: number, patch: Partial<HistorySlide>) => {
    onChange(
      slides.map((slide, i) => (i === index ? { ...slide, ...patch } : slide))
    );
  };

  const moveSlide = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= slides.length) return;
    const next = [...slides];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const removeSlide = (index: number) => {
    onChange(slides.filter((_, i) => i !== index));
  };

  const addSlide = () => {
    onChange([...slides, emptySlide()]);
  };

  const updateParagraph = (
    slideIndex: number,
    paragraphIndex: number,
    value: string
  ) => {
    const slide = slides[slideIndex];
    const paragraphs = slide.paragraphs.map((p, i) =>
      i === paragraphIndex ? value : p
    );
    updateSlide(slideIndex, { paragraphs });
  };

  const addParagraph = (slideIndex: number) => {
    const slide = slides[slideIndex];
    updateSlide(slideIndex, {
      paragraphs: [...slide.paragraphs, ''],
    });
  };

  const removeParagraph = (slideIndex: number, paragraphIndex: number) => {
    const slide = slides[slideIndex];
    const paragraphs = slide.paragraphs.filter((_, i) => i !== paragraphIndex);
    updateSlide(slideIndex, {
      paragraphs: paragraphs.length ? paragraphs : [''],
    });
  };

  return (
    <div className="history-slides-editor">
      {slides.map((slide, slideIndex) => (
        <Card
          key={slideIndex}
          className="history-slides-editor__section"
          title={`Secțiunea ${slideIndex + 1}`}
          extra={
            <Space size="small" wrap>
              <Button
                size="small"
                icon={<ArrowUpOutlined />}
                disabled={slideIndex === 0}
                onClick={() => moveSlide(slideIndex, -1)}
                aria-label="Mută sus"
              />
              <Button
                size="small"
                icon={<ArrowDownOutlined />}
                disabled={slideIndex === slides.length - 1}
                onClick={() => moveSlide(slideIndex, 1)}
                aria-label="Mută jos"
              />
              <Popconfirm
                title="Ștergi această secțiune?"
                okText="Da"
                cancelText="Nu"
                onConfirm={() => removeSlide(slideIndex)}
                disabled={slides.length <= 1}>
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  disabled={slides.length <= 1}>
                  Șterge secțiunea
                </Button>
              </Popconfirm>
            </Space>
          }>
          <div className="history-slides-editor__field">
            <label>Titlu secțiune (opțional)</label>
            <Input
              value={slide.title}
              placeholder="Lăsați gol dacă nu aveți titlu"
              onChange={e => updateSlide(slideIndex, { title: e.target.value })}
            />
          </div>

          <div className="history-slides-editor__paragraphs">
            <label>Paragrafe</label>
            {slide.paragraphs.map((paragraph, paragraphIndex) => (
              <div
                key={paragraphIndex}
                className="history-slides-editor__paragraph-block">
                <div className="history-slides-editor__paragraph-header">
                  <span>{`Paragraf ${paragraphIndex + 1}`}</span>
                  <Popconfirm
                    title="Ștergi acest paragraf?"
                    okText="Da"
                    cancelText="Nu"
                    onConfirm={() =>
                      removeParagraph(slideIndex, paragraphIndex)
                    }
                    disabled={slide.paragraphs.length <= 1}>
                    <Button
                      type="text"
                      danger
                      size="small"
                      disabled={slide.paragraphs.length <= 1}>
                      Șterge paragraful
                    </Button>
                  </Popconfirm>
                </div>
                <TextEditor
                  value={paragraph}
                  onChange={value =>
                    updateParagraph(slideIndex, paragraphIndex, value)
                  }
                  placeholder="Text paragraf"
                />
              </div>
            ))}
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => addParagraph(slideIndex)}
              block>
              Adaugă paragraf
            </Button>
          </div>
        </Card>
      ))}

      <Button type="primary" icon={<PlusOutlined />} onClick={addSlide} block>
        Adaugă secțiune
      </Button>
    </div>
  );
};
