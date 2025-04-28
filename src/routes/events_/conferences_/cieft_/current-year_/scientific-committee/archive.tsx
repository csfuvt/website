import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/cieft/current-year/scientific-committee/archive'
)({
  component: () => (
    <div>
      Hello /events/conferences/cieft/current-year/scientific-committee/archive!
    </div>
  ),
});
