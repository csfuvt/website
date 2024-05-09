import styles from './KMemberCard.module.css';
import profileImage from '../../../../public/profile.png';

export const KMemberCard = ({
  label_name,
  label_title,
}: {
  label_name: string;
  label_title: string;
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.blueSection}>
        <div
          className={styles.profileImage}
          style={{ backgroundImage: `url(${profileImage})` }}></div>
      </div>
      <div className={styles.textSection}>
        <div className={styles.name}>{label_name}</div>
        <div className={styles.title}>{label_title}</div>
      </div>
    </div>
  );
};

export default KMemberCard;
