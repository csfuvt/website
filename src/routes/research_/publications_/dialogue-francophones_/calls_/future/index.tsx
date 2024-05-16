import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import { KTitle } from '../../../../../-components/KTitle/KTitle.tsx';
import './styles.css';
import { calls } from '../../../../../-constants/mock.data.ts';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/calls/future/'
)({
  component: () => (
    <div>
      <KBanner label={calls.find(call => Math.max(call.id))!.title} />
      <div className="iframeContainer">
        <KTitle label="Apel la contribuții" />
        <iframe
          src={calls.find(call => Math.max(call.id))!.url}
          className="iframe"></iframe>
      </div>
    </div>
  ),
});
