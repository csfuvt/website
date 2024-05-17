import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../-components/KBanner/KBanner';
import { KVolumeCard } from '../../../../-components/KVolumeCard/KVolumeCard';
import styles from './VolumePage.module.css';
import { volumes } from '../../../../-constants/mock.data.ts';

const VolumePage = () => {
  return (
    <div>
      <KBanner label="Dialogues Francophones - VOLUME" />
      <div className={styles.cardsContainer}>
        {volumes.reverse().map(volume => (
          <KVolumeCard
            issueNumber={volume.issueNumber}
            buttonText="Deschide >"
            url={`/research/publications/dialogue-francophones/volumes/${volume.id}`}
            volumeImageUrl={volume.coverUrl}
          />
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/volumes/'
)({
  component: VolumePage,
});

export default VolumePage;
