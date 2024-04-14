import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/agapes-francophones/committees/'
)({
  component: () => (
    <div>Hello /research/publications/agapes-francophones/committees/!</div>
  ),
});
