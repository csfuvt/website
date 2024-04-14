import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/events/round-tables/')({
  component: () => <div>Hello /events/round-tables/!</div>,
});
