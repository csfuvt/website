import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from '../../events_/conferences_/cieft_/current-year_/events/Events.module.css';
import { Spin } from 'antd';
import KPoster from './KPoster.tsx'; // Import corect pentru KPoster

const fetchPosters = (type: string) =>
  axios.get(`/event-posters/ultimul/${type}`).then(res => res.data);

type Poster = {
  id: number;
  pictureUrl?: string;
  programDocUrl?: string;
  rezumatDocUrl?: string;
  type: 'CIEFT' | 'COLOCVIU';
  isLoggedIn: boolean;
};

export const KPostersList = ({
  type,
  isLoggedIn, // Aici primim parametrul pentru filtrare: CIEFT sau COLOCVIU
}: {
  type: 'CIEFT' | 'COLOCVIU';
  isLoggedIn: boolean;
}) => {
  const {
    data: posters,
    isLoading,
    error,
  } = useQuery<Poster[]>({
    queryKey: ['event-posters', type], // Folosim type în queryKey
    queryFn: () => fetchPosters(type), // Trimitem type ca parametru în queryFn
  });

  if (isLoading) return <Spin />;
  if (error) return <div>A apărut o eroare la încărcarea posterelor.</div>;

  return (
    <div className={styles.nohover}>
      <div className={styles.imgsection}>
        <div className={styles.imgcontainer}>
          {posters?.map(poster => (
            <KPoster
              key={poster.id}
              id={poster.id}
              pictureUrl={poster.pictureUrl}
              programDocUrl={poster.programDocUrl}
              rezumatDocUrl={poster.rezumatDocUrl}
              type={poster.type}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KPostersList;
