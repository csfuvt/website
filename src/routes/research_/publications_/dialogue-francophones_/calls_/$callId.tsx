import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';
import { calls } from '../../../../-constants/mock.data.ts';
import './styles.css';
import { KTitle } from '../../../../-components/KTitle/KTitle.tsx';
export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/calls/$callId'
)({
  component: Call,
});

function Call() {
  const { callId } = Route.useParams();
  return (
    <div>
      <KBanner
        label={calls.find(call => call.id === parseInt(callId))!.title}
      />
      <div className="iframeContainer">
        <KTitle label="Apel la contribuții" />
        <iframe
          src={calls.find(call => call.id === parseInt(callId))!.url}
          className="iframe"></iframe>
      </div>
    </div>
  );
}
