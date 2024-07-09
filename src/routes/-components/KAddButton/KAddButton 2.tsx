import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const KAddButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button className={`plus-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} color="white" />
    </button>
  );
};
