import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/events/conferences/francophones-studies/previous-editions/'
)({
  component: () => (
    <div>
      Hello /events/conferences/francophones-studies/previous-editions/!
    </div>
  ),
});
