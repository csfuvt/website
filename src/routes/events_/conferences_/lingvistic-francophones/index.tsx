import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/lingvistic-francophones/'
)({
  component: () => (
    <div>Hello /events/conferences/lingvistic-francophones/!</div>
  ),
});
