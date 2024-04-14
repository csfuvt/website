import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/events/other-events/')({
  component: () => <div>Hello /events/other-events/!</div>,
});
