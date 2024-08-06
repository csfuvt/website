import React from 'react';
import styles from './KMemberCard.module.css';
import Tooltip from '../KHoverTip/KHoverTip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface KMemberCardProps {
  label_name: string;
  label_title: string;
  profileImage: string;
  cvLink: string;
  description: string;
  isOpen: boolean;
  toggleDescription: () => void;
}

export const KMemberCard: React.FC<KMemberCardProps> = ({
  label_name,
  label_title,
  profileImage,
  cvLink,
  description,
  isOpen,
  toggleDescription,
}) => {
  return (
    <div className={styles.card}>
      {isOpen && (
        <div className={styles.overlay} onClick={toggleDescription}></div>
      )}
      <div className={styles.blueSection} onClick={toggleDescription}>
        <div
          className={styles.profileImage}
          style={{ backgroundImage: `url(${profileImage})` }}></div>
      </div>
      <div className={styles.textSection}>
        <Tooltip description={description}>
          <div className={styles.name}>{label_name}</div>
        </Tooltip>
        <div className={styles.title}>{label_title}</div>
      </div>
      {isOpen && (
        <div className={styles.descriptionContainer}>
          <button className={styles.closeButton} onClick={toggleDescription}>
            <FontAwesomeIcon icon={faX} />
          </button>
          <h3 className={styles.descriptionName}>{label_name}</h3>
          <p>{description}</p>
          {cvLink && (
            <a
              href={cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cvButton}>
              CV
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default KMemberCard;
