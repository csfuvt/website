import './styles.css';
export const KChapter = ({
  title,
  url,
  description,
  pageStart,
  pageEnd,
}: {
  title: string;
  url: string;
  description: string;
  pageStart: number;
  pageEnd: number;
}) => {
  return (
    <a href={url} className="chapterContainer">
      <div className="details">
        <span className="title">{title}</span>
        <span className="desc">{description}</span>
      </div>
      <span className="pages">
        pag. {pageStart} - {pageEnd}
      </span>
    </a>
  );
};
