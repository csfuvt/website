import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/indexing/'
)({
  component: () => (
    <div>Hello /research/publications/dialogue-francophones/indexing/!</div>
  ),
});
