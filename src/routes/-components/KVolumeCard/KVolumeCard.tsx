import styles from './KVolumeCard.module.css';
import volumeImage from '../../../../public/copertavolum.png';

export const KVolumeCard = ({
  issueNumber,
  buttonText,
}: {
  issueNumber: string;
  buttonText: string;
}) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${volumeImage})` }}>
        {/* <h3 className={styles.title}>{title}</h3> {} */}
      </div>
      <div className={styles.content}>
        <p className={styles.issueNumber}>{issueNumber}</p>
        <button className={styles.button}>{buttonText}</button>
      </div>
    </div>
  );
};

export default KVolumeCard;
