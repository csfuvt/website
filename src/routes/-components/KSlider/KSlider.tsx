import { useState } from 'react';
import { KTitle } from '../KTitle/KTitle.tsx';
import './styles.css';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const KSlider = ({
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
    <div className="slider">
      <FontAwesomeIcon onClick={prevSlide} icon={faChevronLeft} />
      <div className="sectionContainer">
        <div className="textContainer">
          <div className="text-content">
            <KTitle label={slides[currentSlide].title} />
            <div className="paragraph">
              {slides[currentSlide].paragraphs.map((line, index) => (
                <div key={index} className="line">
                  <p className="lineP">{line}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sliderIndicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentSlide ? `indicatorActive` : ''}`}
                onClick={() => setCurrentSlide(index)}></span>
            ))}
          </div>
        </div>
        {image && (
          <img src={imageUrl} alt={imageDescription} className="imageBox" />
        )}
      </div>
      <FontAwesomeIcon onClick={nextSlide} icon={faChevronRight} />
    </div>
  );
};
