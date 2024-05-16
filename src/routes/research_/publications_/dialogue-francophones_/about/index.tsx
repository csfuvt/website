import { createFileRoute } from '@tanstack/react-router';
import { DialoguesFrancophonesAboutPage } from '../../../../-pages/research/publications/dialogues-francophones/about/DialoguesFrancophonesAbout.tsx';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/about/'
)({
  component: () => <DialoguesFrancophonesAboutPage />,
});
