import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/events/phd-theses/')({
  component: () => <div>Hello /events/phd-theses/!</div>,
});
