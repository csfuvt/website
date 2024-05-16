import './styles.css';
import { Link } from '@tanstack/react-router';
export const KArchiveSection = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <Link to={url}>
      <div className="archive">
        <span className="link">{title}</span>
        <span className="description">{description}</span>
      </div>
    </Link>
  );
};
