import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import styles from './DescriptionAndObjectivesPage.module.css';
import { KBanner } from '../../-components/KBanner/KBanner';
import descriere from '../../../../public/Despre_noi/descriere.jpg';
import { useTranslation } from 'react-i18next';

const DescriptionAndObjectivesPage = () => {
  const { t } = useTranslation();
  const slides = [
    {
      title: t('Descriere'),
      paragraphs: [
        t(
          'Centrul de Studii Francofone îşi propune să deruleze, din perspectiva interdisciplinaritatii, un program coerent de cercetare vizând marile arii culturale din spaţiul francofon și punând un accent deosebit pe contribuţiile româneşti în domeniul francofoniei.'
        ),
        t(
          'Pe lângă cadrele didactice care formează Colectivul de Limba franceză și au o bogată activitate de cercetare, Centrul implică în realizarea proiectelor sale și colaboratori români și străini: cercetători cu experiență, postdoctoranzi, doctoranzi sau studenţi la masterat.'
        ),
      ],
    },
    {
      title: t('Descriere'),
      paragraphs: [
        t(
          'Rezultatele cercetării sunt valorificate în revista Centrului, Dialogues francophones. Se mai are în vedere publicarea unor cărţi despre fenomenul cultural francofon în lumea contemporană şi a unor studii pe teme de francofonie în reviste ştiinţifice din ţară şi din străinătate.'
        ),
        t(
          'De asemenea, Centrul se implică în organizarea de manifestări ştiinţifice cu participare naţională şi internaţională.'
        ),
      ],
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  return (
    <div>
      <KBanner label={t('DESCRIERE ȘI OBIECTIVE')} />
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
              src={descriere}
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
          <div className={styles.title}>{t('Obiective')}</div>
          <div className={styles.paragraph}>
            <div className={styles.line}>
              <p className={styles.lineP}>
                <b>{t('Scopul fundamental')}</b>{' '}
                {t(
                  'al Centrului de Studii Francofone constă în dezvoltarea studiului culturilor de expresie franceză și promovarea francofoniei ca formă specifică a dialogului intercultural în lumea contemporană.'
                )}
                "
              </p>
            </div>
            <div className={styles.line}>
              <p className={styles.lineP}>
                {t('Cercetarea are drept obiect:')}
              </p>
              <ul>
                <li className={styles.lineP}>
                  {t(
                    'realizarea unor volume de studii referitoare la culturile francofone în epoca modernă/postmodernă;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'realizarea unor volume de studii care să facă cunoscută poziţia României în lumea francofonă şi contribuţia sa la dialogul intercultural francofon;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'publicarea în regim periodic (un număr pe an) a revistei de literatură francofonă contemporană Dialogues francophones;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'valorificarea rezultatelor cercetării în cadrul Colocviului internaţional de studii francofone - CIEFT, organizat anual la Universitatea de Vest din Timişoara, şi publicarea volumului de acte Agapes Francophones;'
                  )}
                </li>
              </ul>
            </div>
            <div className={styles.line}>
              <p className={styles.lineP}>
                <b>{t('Obiectivele specifice')}</b>{' '}
                {t('ale cercetării vizează:')}
              </p>
              <ol>
                <li className={styles.lineP}>
                  {t(
                    'realizarea unor volume de studii referitoare la culturile francofone în epoca modernă/postmodernă;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'realizarea unor volume de studii care să facă cunoscută poziţia României în lumea francofonă şi contribuţia sa la dialogul intercultural francofon;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'publicarea în regim periodic (un număr pe an) a revistei de literatură francofonă contemporană Dialogues francophones;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'valorificarea rezultatelor cercetării în cadrul Colocviului internaţional de studii francofone - CIEFT, organizat anual la Universitatea de Vest din Timişoara, şi publicarea volumului de acte Agapes Francophones;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'organizarea anuală de conferinţe, mese rotunde, colocvii cu participare naţională şi internaţionala;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'prezentarea de comunicări la sesiuni ştiinţifice, congrese, colocvii naţionale şi internaţionale;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'realizarea unui program de traduceri la edituri româneşti a unor cărţi ştiinţifice şi literare francofone;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'realizarea unui program de traduceri la edituri româneşti a unor cărţi ştiinţifice şi literare francofone;'
                  )}
                </li>
                <li className={styles.lineP}>
                  {t(
                    'asigurarea unui program de predare a limbii, literaturii şi civilizaţiei franceze din perspectiva studiilor francofone şi interdisciplinare.'
                  )}
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
