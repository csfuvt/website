import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth.ts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../constants.ts';
import styles from './KMemberCardNew.module.css';
import Tooltip from '../KHoverTip/KHoverTip.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const deleteIndex = (id: number, memberCategory: string) =>
  axios.delete(`/members/${id}/${memberCategory}`).then(res => res.data);

export const KMemberCardNew = ({
  id,
  name,
  description,
  role,
  documentUrl,
  pictureUrl,
  memberCategory,
  isOpen,
  toggleDescription,
}: {
  id: number;
  name: string;
  description: string;
  role: string;
  documentUrl?: string;
  pictureUrl?: string;
  memberCategory:
    | 'FOUNDER'
    | 'MANAGEMENT'
    | 'BASE_TEAM'
    | 'COLLABORATOR'
    | 'STUDENTS'
    | 'ASSOCIATE_MEMBER';
  isOpen: boolean;
  toggleDescription: () => void;
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteIndex(id, memberCategory),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['members', memberCategory],
      });
      toast.success('Membrul a fost șters cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const defaultImage = `/public/profile.png`;
  const profileImageUrl = pictureUrl
    ? `${BASE_URL}/files/members/${pictureUrl}`
    : defaultImage;

  return (
    <div className={styles.card}>
      {isOpen && (
        <div className={styles.overlay} onClick={toggleDescription}></div>
      )}
      <div className={styles.blueSection} onClick={toggleDescription}>
        <div
          className={styles.profileImage}
          style={{ backgroundImage: `url(${profileImageUrl})` }}></div>
      </div>
      <div className={styles.textSection}>
        <Tooltip description={description}>
          <div className={styles.name}>{name}</div>
        </Tooltip>
        <div className={styles.title}>{role}</div>
      </div>
      {isOpen && (
        <div className={styles.descriptionContainer}>
          <button className={styles.closeButton} onClick={toggleDescription}>
            <FontAwesomeIcon icon={faX} />
          </button>
          <h3 className={styles.descriptionName}>{name}</h3>
          <p>{description}</p>
          {documentUrl && (
            <a
              href={`${BASE_URL}/files/members/${documentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cvButton}>
              CV
            </a>
          )}
        </div>
      )}
      {isLoggedIn && (
        <div className="delete">
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() => {
              mutate();
            }}
            loading={isPending}
          />
        </div>
      )}
    </div>
  );
};

export default KMemberCardNew;
