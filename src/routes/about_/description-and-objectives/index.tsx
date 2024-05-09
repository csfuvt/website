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

      <div className={styles.objectivesSection}>
        <div className={styles.textContainerObjectives}>
          <div className={styles.title}>Obiective</div>
          <div className={styles.paragraph}>
            <div className={styles.line}>
              <p className={styles.lineP}>
                <b>Scopul fundamental</b> al Centrului de Studii Francofone
                constă în dezvoltarea studiului culturilor de expresie franceză
                și promovarea francofoniei ca formă specifică a dialogului
                intercultural în lumea contemporană.
              </p>
            </div>
            <div className={styles.line}>
              <p className={styles.lineP}>Cercetarea are drept obiect:</p>
              <ul>
                <li className={styles.lineP}>
                  realizarea unor volume de studii referitoare la culturile
                  francofone în epoca modernă/postmodernă;
                </li>
                <li className={styles.lineP}>
                  realizarea unor volume de studii care să facă cunoscută
                  poziţia României în lumea francofonă şi contribuţia sa la
                  dialogul intercultural francofon;
                </li>
                <li className={styles.lineP}>
                  publicarea în regim periodic (un număr pe an) a revistei de
                  literatură francofonă contemporană Dialogues francophones;
                </li>
                <li className={styles.lineP}>
                  valorificarea rezultatelor cercetării în cadrul Colocviului
                  internaţional de studii francofone - CIEFT, organizat anual la
                  Universitatea de Vest din Timişoara, şi publicarea volumului
                  de acte Agapes Francophones;
                </li>
              </ul>
            </div>
            <div className={styles.line}>
              <p className={styles.lineP}>
                <b>Obiectivele specifice</b> ale cercetării vizează:
              </p>
              <ol>
                <li className={styles.lineP}>
                  realizarea unor volume de studii referitoare la culturile
                  francofone în epoca modernă/postmodernă;
                </li>
                <li className={styles.lineP}>
                  realizarea unor volume de studii care să facă cunoscută
                  poziţia României în lumea francofonă şi contribuţia sa la
                  dialogul intercultural francofon;
                </li>
                <li className={styles.lineP}>
                  publicarea în regim periodic (un număr pe an) a revistei de
                  literatură francofonă contemporană Dialogues francophones;
                </li>
                <li className={styles.lineP}>
                  valorificarea rezultatelor cercetării în cadrul Colocviului
                  internaţional de studii francofone - CIEFT, organizat anual la
                  Universitatea de Vest din Timişoara, şi publicarea volumului
                  de acte Agapes Francophones;
                </li>
                <li className={styles.lineP}>
                  organizarea anuală de conferinţe, mese rotunde, colocvii cu
                  participare naţională şi internaţionala;
                </li>
                <li className={styles.lineP}>
                  prezentarea de comunicări la sesiuni ştiinţifice, congrese,
                  colocvii naţionale şi internaţionale;
                </li>
                <li className={styles.lineP}>
                  realizarea unui program de traduceri la edituri româneşti a
                  unor cărţi ştiinţifice şi literare francofone;
                </li>
                <li className={styles.lineP}>
                  realizarea unui program de cercetare şi de predare a
                  francofoniei cu ajutorul noilor tehnologii ale comunicării;
                </li>
                <li className={styles.lineP}>
                  asigurarea unui program de predare a limbii, literaturii şi
                  civilizaţiei franceze din perspectiva studiilor francofone şi
                  interdisciplinare.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about/description-and-objectives/')({
  component: DescriptionAndObjectivesPage,
});

export default DescriptionAndObjectivesPage;
