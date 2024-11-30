import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/francophones-studies/current-year/info'
)({
  component: () => (
    <div>Hello /events/conferences/francophones-studies/current-year/info!</div>
  ),
});
