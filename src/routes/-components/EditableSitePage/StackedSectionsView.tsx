import { KTitle } from '../KTitle/KTitle.tsx';
import { HistorySlide } from './HistorySlidesEditor.tsx';
import './StackedSectionsView.css';

export const StackedSectionsView = ({ slides }: { slides: HistorySlide[] }) => (
  <div className="stacked-sections-view">
    {slides.map((slide, sectionIndex) => (
      <section key={sectionIndex} className="stacked-sections-view__section">
        {slide.title ? <KTitle label={slide.title} /> : null}
        <div className="stacked-sections-view__paragraphs">
          {slide.paragraphs.map((paragraph, paragraphIndex) => (
            <div key={paragraphIndex} className="stacked-sections-view__line">
              <p
                className="stacked-sections-view__text"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);
