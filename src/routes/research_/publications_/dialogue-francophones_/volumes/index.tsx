import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../-components/KBanner/KBanner';
import { KVolumeCard } from '../../../../-components/KVolumeCard/KVolumeCard';
import styles from './VolumePage.module.css';

const VolumePage = () => {
  return (
    <div>
      <KBanner label="Dialogues Francophones - VOLUME" />
      <div className={styles.cardsContainer}>
        {Array.from({ length: 8 }).map((_, index) => (
          <KVolumeCard
            key={index}
            //title="De la phrase / énoncé au texte / discours."
            issueNumber="NO 26-67/2022-2023"
            buttonText="Deschide >"
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
