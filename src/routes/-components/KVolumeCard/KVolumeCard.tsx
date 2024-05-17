import styles from './KVolumeCard.module.css';
import { Link } from '@tanstack/react-router';

export const KVolumeCard = ({
  issueNumber,
  buttonText,
  url,
  volumeImageUrl,
}: {
  issueNumber: string;
  buttonText: string;
  url: string;
  volumeImageUrl: string;
}) => {
  return (
    <div className={styles.card}>
      <img
        src={volumeImageUrl}
        alt={'cover'}
        className={styles.backgroundImage}
      />
      <div className={styles.center}>
        <span className={styles.issueNumber}>{issueNumber}</span>

        <Link to={url}>
          <button className={styles.button}>{buttonText}</button>
        </Link>
      </div>
    </div>
  );
};

export default KVolumeCard;
