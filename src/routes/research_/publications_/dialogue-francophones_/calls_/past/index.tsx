import { createFileRoute } from '@tanstack/react-router';
import { KArchiveSection } from '../../../../../-components/KArchiveSection/KArchiveSection.tsx';
import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import './styles.css';
import { calls } from '../../../../../-constants/mock.data.ts';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/calls/past/'
)({
  component: () => (
    <div>
      <KBanner label="Dialogues Francophones - Apeluri trecute" />
      <div className="archives">
        {calls
          .filter(call => call.id !== 5)!
          .map(call => (
            <KArchiveSection
              title={call.title}
              description={call.description}
              url={`/research/publications/dialogue-francophones/calls/${call.id}`}
            />
          ))}
      </div>
    </div>
  ),
});
