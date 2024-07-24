import styles from './KVolumeCard.module.css';
import { Link } from '@tanstack/react-router';
import { Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

const deleteVolume = (id: number) =>
  axios.delete(`/volumes/${id}`).then(res => res.data);

export const KVolumeCard = ({
  id,
  title,
  buttonText,
  url,
  volumeImageUrl,
}: {
  id: number;
  title: string;
  buttonText: string;
  url: string;
  volumeImageUrl: string;
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteVolume,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['volumes'] });
      toast.success('Volumul a fost șters cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere volum',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți volumul?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        mutate(id);
      },
    });
  };
  return (
    <div className={styles.card}>
      <img
        src={volumeImageUrl}
        alt={'cover'}
        className={styles.backgroundImage}
      />
      {isLoggedIn && (
        <div className={styles.deleteVolume}>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={showPropsConfirm}
            loading={isPending}
          />
        </div>
      )}
      <div className={styles.center}>
        <span className={styles.issueNumber}>{title}</span>

        <Link to={url}>
          <button className={styles.button}>{buttonText}</button>
        </Link>
      </div>
    </div>
  );
};

export default KVolumeCard;
