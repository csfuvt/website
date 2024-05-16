import './styles.css';
export const KParagraph = ({
  text,
  list,
  listElements,
}: {
  text: string;
  list?: boolean;
  listElements?: string[];
}) => {
  return (
    <div className="line">
      <span className="lineP">{text}</span>
      {list && (
        <ul>
          {listElements?.map(element => <li className="lineP">{element}</li>)}
        </ul>
      )}
    </div>
  );
};
