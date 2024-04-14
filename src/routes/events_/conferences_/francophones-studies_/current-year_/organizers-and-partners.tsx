import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/francophones-studies/current-year/organizers-and-partners'
)({
  component: () => (
    <div>
      Hello
      /events/conferences/francophones-studies/current-year/organizers-and-partners!
    </div>
  ),
});
