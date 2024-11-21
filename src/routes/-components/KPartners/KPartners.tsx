import './styles.css';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth.ts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../constants.ts';

const deleteIndex = (id: number, partnerLocation: string) =>
  axios.delete(`/partners/${id}/${partnerLocation}`).then(res => res.data);

export const KPartners = ({
  id,
  name,
  pictureUrl,
  link,
  address,
  partnerLocation,
}: {
  id: number;
  name: string;
  pictureUrl?: string;
  link?: string;
  address?: string;
  partnerLocation:
    | 'CENTRAL_EASTERN_EUROPE'
    | 'WESTERN_EUROPE'
    | 'NORTH_AMERICA'
    | 'CENTRAL_SOUTH_AMERICA'
    | 'AFRICA'
    | 'ASIA';
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteIndex(id, partnerLocation),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['partners', partnerLocation],
      });
      toast.success('Partnerul a fost șters cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  return (
    <div className="container-partners">
      <div className="index-item">
        <img
          src={`${BASE_URL}/pics/partners/${pictureUrl}`}
          alt={name}
          className="image-partners"
          onClick={() => {
            if (link) {
              window.open(link, '_blank', 'noopener,noreferrer');
            }
          }}
          style={{ cursor: link ? 'pointer' : 'default' }}
        />
        <div className="text-container-partners">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <div className="text-content-partners">
                {name}
                {address && (
                  <>
                    <br />
                    <span className="address-partners">{address}</span>
                  </>
                )}
              </div>
            </a>
          ) : (
            <div className="text-content-partners">
              {name}
              {address && (
                <>
                  <br />
                  <span className="address-partners">{address}</span>
                </>
              )}
            </div>
          )}
        </div>
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

export default KPartners;
