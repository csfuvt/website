import './styles.css';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth.ts';
import axios from 'axios';
import { toast } from 'react-toastify';

const deleteTranslation = (id: number) =>
  axios.delete(`/translations/${id}`).then(res => res.data);

export const KTranslationCard = ({
  id,
  summaryText,
  link,
  translationImage,
}: {
  id: number;
  summaryText: string;
  link?: string;
  translationImage: string;
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteTranslation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['translations'] });
      toast.success('Traducerea a fost ștearsă cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  return (
    <div className="container">
      <img
        src={translationImage}
        className="image"
        onClick={() => {
          if (link) {
            window.open(link, '_blank');
          }
        }}
      />
      {isLoggedIn && (
        <div className="delete">
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() => {
              mutate(id);
            }}
            loading={isPending}
          />
        </div>
      )}
      <div className="middle">
        <div>{summaryText}</div>
      </div>
    </div>
  );
};

export default KTranslationCard;
