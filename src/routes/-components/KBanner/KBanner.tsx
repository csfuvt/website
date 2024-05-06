import styles from './KBanner.module.css';

export const KBanner = ({ label }: { label: string }) => {
  return (
    <div className={styles.gradientSection}>
      <h2>{label}</h2>
    </div>
  );
};
