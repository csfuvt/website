import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from './styles.module.css';
import { KMovingBanner } from '../-components/KMovingBanner/KMovingBanner';
import home2 from '../../../public/home2.jpg';
import home0 from '../../../public/home0.png';
import { useTranslation } from 'react-i18next';

const images = [home0, home2];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

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
      <KMovingBanner />
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
              <h1 className={styles.title}>{t('Anunțuri')}</h1>
              <div className={styles.textContainer}>
                <Link
                  to="/events/conferences/cieft/current-year/calls"
                  className={styles.blueText}>
                  CIEFT
                </Link>
                <Link
                  to="/events/conferences/francophones-studies/current-year/calls"
                  className={styles.blueText}>
                  {t('Colocviul studențesc de studii francofone')}
                </Link>
                <Link
                  to="/research/publications/dialogue-francophones/about"
                  className={styles.blueText}>
                  Dialogues Francophones
                </Link>
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
