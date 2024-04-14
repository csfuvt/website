import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/cieft/current-year/organizers-and-partners'
)({
  component: () => (
    <div>
      Hello /events/conferences/cieft/current-year/organizers-and-partners!
    </div>
  ),
});
