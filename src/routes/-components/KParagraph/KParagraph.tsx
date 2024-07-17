import './styles.css';
import { KArticle } from '../KArticle/KArticle.tsx';

export const KParagraph = ({
  text,
  list,
  listElements,
  title,
  titleLabel,
}: {
  text: string;
  list?: boolean;
  listElements?: string[];
  title?: boolean;
  titleLabel?: string;
}) => {
  return (
    <div className="line">
      {title && <KArticle label={titleLabel} />}
      <span className="lineP">{text}</span>
      {list && (
        <ul>
          {listElements?.map(element => <li className="lineP">{element}</li>)}
        </ul>
      )}
    </div>
  );
};
