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
      {isTitle && <div>{title}</div>}
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
