import { KBanner } from '../../../../-components/KBanner/KBanner';
import { KVolumeCard } from '../../../../-components/KVolumeCard/KVolumeCard';
import styles from './VolumePage.module.css';
import axios from 'axios';
import { Volume } from './-volumes.model.ts';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import { createFileRoute } from '@tanstack/react-router';

const getVolumes = () =>
  axios
    .get<Volume[]>('/volumes/type/DIALOGUES_FRANCOPHONE')
    .then(res => res.data.reverse());

const VolumesPage = () => {
  const {
    data: volumes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['volumes'],
    queryFn: getVolumes,
  });

  return (
    <div>
      <KBanner label="Dialogues Francophones - VOLUME" />
      <div className={styles.cardsContainer}>
        <div className="flex">
          {isLoading ? (
            <Spin />
          ) : isError ? (
            <span>
              Volumele nu pot fi afișate momentan. Reveniți mai târziu!
            </span>
          ) : isEmpty(volumes) ? (
            <span>Nu există volume momentan.</span>
          ) : (
            volumes?.map((volume, index) => (
              <KVolumeCard
                key={index}
                title={volume.title}
                buttonText="Deschide >"
                url={`/research/publications/dialogue-francophones/volumes/${volume.id}`}
                volumeImageUrl={volume.cover}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/volumes/'
)({
  component: VolumesPage,
});

export default VolumesPage;
