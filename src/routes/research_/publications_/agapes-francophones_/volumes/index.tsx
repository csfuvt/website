import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/agapes-francophones/volumes/'
)({
  component: () => (
    <div>Hello /research/publications/agapes-francophones/volumes/!</div>
  ),
});
