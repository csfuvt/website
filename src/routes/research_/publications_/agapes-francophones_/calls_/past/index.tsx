import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/agapes-francophones/calls/past/'
)({
  component: () => (
    <div>Hello /research/publications/agapes-francophones/calls/past/!</div>
  ),
});
