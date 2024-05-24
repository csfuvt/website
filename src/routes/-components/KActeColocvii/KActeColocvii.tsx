import './styles.css';
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
    <a href={link} className="cardContainer">
      <div className="card">
        <div
          className="backgroundImage"
          style={{ backgroundImage: `url(${bookImage})` }}></div>
        <div>{summaryText}</div>
      </div>
    </a>
  );
};

export default KActeColocvii;
