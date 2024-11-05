import { useQuery } from '@tanstack/react-query';
import KIndex from '../KIndex/KIndex.tsx';
import axios from 'axios';
import styles from '../../research_/publications_/dialogue-francophones_/indexing/Indexing.module.css';
//import styles from './styles.css'
import { Spin } from 'antd';

const fetchIndexes = (publicationType: string) =>
  axios.get(`/indexes/${publicationType}`).then(res => res.data);

type Index = {
  id: number;
  name: string;
  pictureUrl: string;
  link?: string;
};

export const KIndexList = ({
  publicationType,
}: {
  publicationType: 'DIALOGUES_FRANCOPHONE' | 'AGAPES_FRANCOPHONE';
}) => {
  const {
    data: indexes,
    isLoading,
    error,
  } = useQuery<Index[]>({
    queryKey: ['indexes', publicationType],
    queryFn: () => fetchIndexes(publicationType),
  });

  if (isLoading) return <Spin />;
  if (error) return <div>A apărut o eroare la încărcarea indexurilor.</div>;

  return (
    <div className={styles.nohover}>
      <div className={styles.imgsection}>
        <div className={styles.imgcontainer}>
          {indexes?.map(index => (
            <KIndex
              key={index.id}
              id={index.id}
              name={index.name}
              pictureUrl={index.pictureUrl}
              link={index.link}
              publicationType={publicationType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KIndexList;
