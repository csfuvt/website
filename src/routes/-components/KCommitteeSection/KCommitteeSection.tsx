import { KArticle } from '../KArticle/KArticle.tsx';
import './styles.css';
export const KCommitteeSection = ({
  title,
  isTitle,
  list,
}: {
  title?: string;
  isTitle?: boolean;
  list: { country: string; university: string; name: string }[];
}) => {
  return (
    <div className="line">
      {isTitle && <KArticle label={title} />}
      <ul>
        {list?.map(element => (
          <li className="lineP">
            {element.name}, {element.university}, {element.country}
          </li>
        ))}
      </ul>
    </div>
  );
};
