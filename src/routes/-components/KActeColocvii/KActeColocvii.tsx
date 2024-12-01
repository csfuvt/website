import styles from './KActeColocvii.module.css';

export const KActeColocvii = ({
  title,
  summaryText,
  Sommairelink,
  APUlink,
  TexteIntegrallink,
  bookImage,
}: {
  title: string;
  summaryText: string;
  Sommairelink: string;
  APUlink?: string;
  TexteIntegrallink?: string;
  bookImage: string;
}) => {
  return (
    <div className={styles.acteColocviiContainer}>
      <div className={styles.card}>
        {}
        <img className={styles.cardImage} src={bookImage} alt={title} />

        <div className={styles.cardContent}>
          {}
          <div className={styles.title}>{title}</div>
          <div className={styles.summaryText}>{summaryText}</div>
          <div className={styles.colocviiDetails}>
            <a href={Sommairelink}><strong>Sommaire</strong></a>
            {APUlink && <a href={APUlink}><strong>APU</strong></a>}
            {TexteIntegrallink && <a href={TexteIntegrallink}><strong>Texte intégral</strong></a>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KActeColocvii;
