import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/francophones-studies/current-year/info/archive'
)({
  component: () => (
    <div>
      Hello /events/conferences/francophones-studies/current-year/info/archive!
    </div>
  ),
});
