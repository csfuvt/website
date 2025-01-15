import './styles.css';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth.ts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../constants.ts';

const deleteIndex = (id: number, publicationType: string) =>
  axios.delete(`/indexes/${id}/${publicationType}`).then(res => res.data);

export const KIndex = ({
  id,
  name,
  pictureUrl,
  link,
  publicationType,
}: {
  id: number;
  name: string;
  pictureUrl?: string;
  link?: string;
  publicationType: 'DIALOGUES_FRANCOPHONE' | 'AGAPES_FRANCOPHONE';
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteIndex(id, publicationType),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['indexes', publicationType],
      });
      toast.success('Indexarea a fost ștearsă cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  return (
    <div className="container-index">
      <div className="index-item">
        <img
          src={`${BASE_URL}/pics/indexes/${pictureUrl}`}
          alt={name}
          className="image"
          onClick={() => {
            if (link) {
              window.open(link, '_blank', 'noopener,noreferrer');
            }
          }}
          style={{ cursor: link ? 'pointer' : 'default' }}
        />
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <div style={{ textAlign: 'center', paddingTop: '10px' }}>
              {name}
            </div>
          </a>
        ) : (
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>{name}</div>
        )}
      </div>
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

export default KIndex;
