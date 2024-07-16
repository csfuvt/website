import React from 'react';
import styles from './KBanner.module.css';
import { KBand } from '../KBand/KBand.tsx';

interface KBannerProps {
  label: string;
}

export const KBanner: React.FC<KBannerProps> = ({ label }) => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.gradientSection}>
        <h2>{label}</h2>
      </div>
      <KBand />
    </div>
  );
};
