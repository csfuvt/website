import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/calls/past/'
)({
  component: () => (
    <div>Hello /research/publications/dialogue-francophones/calls/past/!</div>
  ),
});
