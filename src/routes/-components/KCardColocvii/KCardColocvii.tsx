import styles from './KCardColocvii.module.css';

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};


export const KCardColocvii = ({
  title,
  meetingDate,
  programme,
  resume,
  redactionArticle,
}: {
  id: number;
  title: string;
  organizers?: string; 
  meetingDate: string;
  programme: string;
  resume?: string;
  redactionArticle?: string;
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
          <p className={styles.content}><strong>Data întâlnirii:</strong> {formatDate(meetingDate)}</p>
          <div className={styles.colocviiDetails}>
            {programme && resume == null && (
              <a href={programme}><strong>Programme et résumés</strong></a>
            )}
            {programme && resume && (
              <a href={programme}><strong>Programme</strong></a>
            )}
            {resume && (
              <a href={resume}><strong>Résumés</strong></a>
            )} 
            {redactionArticle && (
              <a href={redactionArticle}><strong>Protocole de rédaction</strong></a>
            )}
          </div>
      </div>
    </div>
  );
};

export default KCardColocvii;