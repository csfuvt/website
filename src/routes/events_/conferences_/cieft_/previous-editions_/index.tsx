import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/cieft/previous-editions/'
)({
  component: () => <div>Hello /conferences/cieft/previous-editions!</div>,
});
