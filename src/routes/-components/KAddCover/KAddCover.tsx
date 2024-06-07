import './styles.css';

export const KAddCover = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <input
      type="file"
      className={`cover-button ${className}`}
      onClick={onClick}>
      {/*<FontAwesomeIcon icon={faPlus} color="white" />*/}
    </input>
  );
};
