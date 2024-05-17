import './styles.css';
export const KChapter = ({
  title,
  url,
  description,
  pages,
}: {
  title: string;
  url: string;
  description: string;
  pages: string;
}) => {
  return (
    <div className="chapterContainer">
      <div className="details">
        <a href={url} className="title">
          {title}
        </a>
        <span className="desc">{description}</span>
      </div>
      <span className="pages">p. {pages}</span>
    </div>
  );
};
