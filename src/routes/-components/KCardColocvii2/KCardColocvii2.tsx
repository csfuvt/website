import styles from './KCardColocvii2.module.css';

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

export const KCardColocvii2 = ({
  title,
  meetingDate,
  colloquyName,
  organizers,
}: {
  id: number;
  title: string;
  organizers: string;
  meetingDate: string;
  colloquyName: string;
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <p className={styles.content}>
          <strong>Titlu:</strong> {colloquyName}
        </p>
        <p className={styles.content}>
          <strong>Organizatori:</strong> {organizers}
        </p>
        <p className={styles.content}>
          <strong>Data întâlnirii:</strong> {formatDate(meetingDate)}
        </p>
      </div>
    </div>
  );
};

export default KCardColocvii2;
