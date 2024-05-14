import styles from './KRedTitle.module.css';

export const KRedTitle = ({ label_title }: { label_title: string }) => {
  return <div className={styles.title}>{label_title}</div>;
};
