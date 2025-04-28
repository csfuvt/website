import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/francophones-studies/current-year/committee/scientific-committee'
)({
  component: () => (
    <div>
      Hello
      /events/conferences/francophones-studies/current-year/scientific-committee!
    </div>
  ),
});
