import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/about/'
)({
  component: () => (
    <div>Hello /research/publications/dialogue-francophones/about/!</div>
  ),
});
