import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/francophones-studies/current-year/committee/archive'
)({
  component: () => (
    <div>
      Hello
      /events/conferences/francophones-studies/current-year/committee/archive!
    </div>
  ),
});
