import { useState } from 'react';
import { KTitle } from '../KTitle/KTitle.tsx';
import './styles.css'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const KSliderRight = ({
  slides,
  image,
  imageUrl,
  imageDescription,
}: {
  slides: { title: string; paragraphs: string[] }[];
  image?: boolean;
  imageUrl?: string;
  imageDescription?: string;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => -(prev - 1) % slides.length);
  };
  return (
    <div className="sliderRight">
      <FontAwesomeIcon onClick={prevSlide} icon={faChevronLeft} />
      <div className="sectionContainerRight">
        <div className="textContainerRight">
          <div className="text-contentRight">
            <KTitle label={slides[currentSlide].title} />
            <div className="paragraphRight">
              {slides[currentSlide].paragraphs.map((line, index) => (
                <div key={index} className="lineRight">
                  <p className="linePRight">{line}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sliderIndicatorsRight">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`indicatorRight ${index === currentSlide ? `indicatorActiveRight` : ''}`}
                onClick={() => setCurrentSlide(index)}></span>
            ))}
          </div>
        </div>
        {image && (
          <img src={imageUrl} alt={imageDescription} className="imageBoxRight" />
        )}
      </div>
      <FontAwesomeIcon onClick={nextSlide} icon={faChevronRight} />
    </div>
  );
};
