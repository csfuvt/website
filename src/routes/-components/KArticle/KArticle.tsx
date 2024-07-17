import './styles.css';
import { Button } from 'antd';
import { useAuth } from '../../../hooks/useAuth.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export const KArticle = ({ label }: { label?: string }) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="subtitle">
      {label}
      {isLoggedIn && (
        <Button type="primary" size="large">
          <FontAwesomeIcon icon={faPlus} />
          Adaugă un capitol
        </Button>
      )}
    </div>
  );
};
