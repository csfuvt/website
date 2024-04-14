import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/lingvistic-conferences/'
)({
  component: () => (
    <div>Hello /research/publications/lingvistic-conferences/!</div>
  ),
});
