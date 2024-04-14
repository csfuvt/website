import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/members-publications/'
)({
  component: () => (
    <div>Hello /research/publications/members-publications/!</div>
  ),
});
