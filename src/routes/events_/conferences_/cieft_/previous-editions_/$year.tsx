import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/cieft/previous-editions/$year'
)({
  component: () => (
    <div>Hello /events/conferences/cieft/previous-editions/$year!</div>
  ),
});
