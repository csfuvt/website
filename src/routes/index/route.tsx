import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import styles from './styles.module.css';
import { KBanner } from '../-components/KBanner/KBanner';
import home1 from '../../../public/home1.jpg';
import home2 from '../../../public/home2.jpg';
import home0 from '../../../public/home0.png';

const images = [home0, home2, home1];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <KBanner label="CENTRUL DE STUDII FRANCOFONE" />
      <div className={styles.pageContainer}>
        <div className={styles.sectionContainer}>
          <div className={styles.boxContainer}>
            <div className={styles.imageSliderContainer}>
              <button className={styles.arrowButton} onClick={handlePrev}>
                {'<'}
              </button>
              <img
                src={images[currentIndex]}
                alt="Slider"
                className={styles.image}
              />
              <button className={styles.arrowButton} onClick={handleNext}>
                {'>'}
              </button>
            </div>
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.callToContributeContainer}>
              <h1 className={styles.title}>Apeluri la contribuții</h1>
              <div className={styles.textContainer}>
                <div className={styles.section}>
                  <h2 className={styles.blueTextBold}>Evenimente</h2>
                  <a
                    href="/events/conferences/cieft/current-year/calls"
                    className={styles.blueText}>
                    CIEFT
                  </a>
                  <a
                    href="/events/conferences/francophones-studies/current-year/calls"
                    className={styles.blueText}>
                    Colocviul studențesc de studii francofone
                  </a>
                </div>
                <div className={styles.section}>
                  <h2 className={styles.blueTextBold}>Publicații</h2>
                  <a
                    href="/research/publications/dialogue-francophones/about"
                    className={styles.blueText}>
                    Dialogues Francophones
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
});

export default HomePage;
