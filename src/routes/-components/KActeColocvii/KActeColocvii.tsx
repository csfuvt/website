import React from 'react';
import styles from './KActeColocvii.module.css';

export const KActeColocvii = ({
  summaryText,
  link,
  bookImage,
}: {
  summaryText: string;
  link: string;
  bookImage: string;
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
