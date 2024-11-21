import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from '../../about_/partners/Partners.module.css';
//import styles from './styles.css'
import { Spin } from 'antd';
import KPartners from './KPartners.tsx';

const fetchPartners = (partnerLocation: string) =>
  axios.get(`/partners/${partnerLocation}`).then(res => res.data);

type Partner = {
  id: number;
  name: string;
  pictureUrl?: string;
  link?: string;
  address?: string;
};

export const KPartnersList = ({
  partnerLocation,
}: {
  partnerLocation:
    | 'CENTRAL_EASTERN_EUROPE'
    | 'WESTERN_EUROPE'
    | 'NORTH_AMERICA'
    | 'CENTRAL_SOUTH_AMERICA'
    | 'AFRICA'
    | 'ASIA';
}) => {
  const {
    data: indexes,
    isLoading,
    error,
  } = useQuery<Partner[]>({
    queryKey: ['partners', partnerLocation],
    queryFn: () => fetchPartners(partnerLocation),
  });

  if (isLoading) return <Spin />;
  if (error) return <div>A apărut o eroare la încărcarea partenerilor.</div>;

  return (
    <div className={styles.nohover}>
      <div className={styles.imgsection}>
        <div className={styles.imgcontainer}>
          {indexes?.map(partner => (
            <KPartners
              key={partner.id}
              id={partner.id}
              name={partner.name}
              pictureUrl={partner.pictureUrl}
              link={partner.link}
              address={partner.address}
              partnerLocation={partnerLocation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KPartnersList;
