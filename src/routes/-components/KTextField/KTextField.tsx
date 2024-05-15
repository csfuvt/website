import styles from './KTextField.module.css';

export const KTextField = ({
  label_title,
  label_text,
}: {
  label_title: string;
  label_text: React.ReactNode;
}) => {
  return (
    <div className={styles.section}>
      <span className={styles.title}>{label_title}</span>
      <span className={styles.text}>{label_text}</span>
    </div>
  );
};
