import React from 'react';
import styles from './KMemberCard.module.css';
import Tooltip from '../KHoverTip/KHoverTip';

interface KMemberCardProps {
  label_name: string;
  label_title: string;
  profileImage: string;
  cvLink: string;
  description: string;
}

export const KMemberCard: React.FC<KMemberCardProps> = ({
  label_name,
  label_title,
  profileImage,
  cvLink,
  description,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.blueSection}>
        <a href={cvLink} target="_blank" rel="noopener noreferrer">
          <div
            className={styles.profileImage}
            style={{ backgroundImage: `url(${profileImage})` }}></div>
        </a>
      </div>
      <div className={styles.textSection}>
        <Tooltip description={description}>
          <div className={styles.name}>{label_name}</div>
        </Tooltip>
        <div className={styles.title}>{label_title}</div>
      </div>
    </div>
  );
};

export default KMemberCard;
