import styles from './KActeColocvii.module.css';
import bookImage from '../../../../public/ActeColocviiPics/copertavolum.png';

export const KActeColocvii = ({
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
        style={{ backgroundImage: `url(${bookImage})` }}></div>
      <div className={styles.content}>
        <a href={link} className={styles.summaryText}>
          {summaryText}
        </a>
      </div>
    </div>
  );
};

export default KActeColocvii;
