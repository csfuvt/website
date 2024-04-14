import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/agapes-francophones/calls/future/'
)({
  component: () => (
    <div>Hello /research/publications/agapes-francophones/calls/future/!</div>
  ),
});
