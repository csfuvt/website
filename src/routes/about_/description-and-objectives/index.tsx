import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import styles from './DescriptionAndObjectivesPage.module.css';
import { KBanner } from '../../-components/KBanner/KBanner';

const DescriptionAndObjectivesPage = () => {
  const slides = [
    {
      title: 'Descriere',
      paragraphs: [
        'Centrul de Studii Francofone îşi propune să deruleze, din perspectiva interdisciplinaritatii, un program coerent de cercetare vizând marile arii culturale din spaţiul francofon și punând un accent deosebit pe contribuţiile româneşti în domeniul francofoniei.',
        'Pe lângă cadrele didactice care formează Colectivul de Limba franceză și au o bogată activitate de cercetare, Centrul implică în realizarea proiectelor sale și colaboratori români și străini: cercetători cu experiență, postdoctoranzi, doctoranzi sau studenţi la masterat.',
      ],
    },
    {
      title: 'Descriere',
      paragraphs: [
        'Rezultatele cercetării sunt valorificate în revista Centrului, Dialogues francophones. Se mai are în vedere publicarea unor cărţi despre fenomenul cultural francofon în lumea contemporană şi a unor studii pe teme de francofonie în reviste ştiinţifice din ţară şi din străinătate.',
        'De asemenea, Centrul se implică în organizarea de manifestări ştiinţifice cu participare naţională şi internaţională.',
      ],
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  return (
    <div>
      <KBanner label="DESCRIERE ȘI OBIECTIVE" />
      <div className={styles.pageContainer}>
        <div className={styles.slider}>
          <div className={styles.sectionContainer}>
            <div className={styles.textContainer}>
              <div className={styles.title}>{slides[currentSlide].title}</div>
              <div className={styles.paragraph}>
                {slides[currentSlide].paragraphs.map((line, index) => (
                  <div key={index} className={styles.line}>
                    <p className={styles.lineP}>{line}</p>
                  </div>
                ))}
              </div>
              <div className={styles.sliderIndicators}>
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.indicator} ${index === currentSlide ? styles.indicatorActive : ''}`}
                    onClick={() => setCurrentSlide(index)}></span>
                ))}
              </div>
            </div>
            <img
              src="/path/to/image.jpg"
              alt="Description of image"
              className={styles.imageBox}
            />
          </div>
          <button onClick={nextSlide} className={styles.sliderBtn}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about/description-and-objectives/')({
  component: DescriptionAndObjectivesPage,
});

export default DescriptionAndObjectivesPage;
