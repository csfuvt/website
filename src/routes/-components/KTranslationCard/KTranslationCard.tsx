import styles from './KTranslationCard.module.css';
import translationImage from './../../../../public/TranslationPics/copertavolum.png';

export const KTranslationCard = ({
  summaryText,
  link,
}: {
  summaryText: string;
  link: string;
}) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${translationImage})` }}></div>
      <div className={styles.detailsOverlay}>
        <div className={styles.content}>
          <a href={link} className={styles.summaryText}>
            {summaryText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default KTranslationCard;
