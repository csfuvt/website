import './styles.css';

export const KParagraph = ({
  children,
  list,
  listElements,
  title,
  titleLabel,
}: {
  children: React.ReactNode;
  list?: boolean;
  listElements?: string[];
  title?: boolean;
  titleLabel?: string;
}) => {
  return (
    <div className="line">
      {title && <div>{titleLabel}</div>}
      <span className="lineP">{children}</span>
      {list && (
        <ul>
          {listElements?.map(element => <li className="lineP">- {element}</li>)}
        </ul>
      )}
    </div>
  );
};
