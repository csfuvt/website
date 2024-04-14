import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/committees/'
)({
  component: () => (
    <div>Hello /research/publications/dialogue-francophones/committees/!</div>
  ),
});
