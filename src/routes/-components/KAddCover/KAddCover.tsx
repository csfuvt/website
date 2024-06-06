import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const KAddCover = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button className={`cover-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} color="white" />
    </button>
  );
};
