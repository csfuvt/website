import styles from './KBanner.module.css';
import { KBand } from '../KBand/KBand.tsx';

export const KBanner = ({ label }: { label: string }) => {
  return (
    <>
      <div className={styles.gradientSection}>
        <h2>{label}</h2>
      </div>
      <KBand />
    </>
  );
};
