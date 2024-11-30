import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/agapes-francophones/editorial-policy/'
)({
  component: () => (
    <div>
      Hello /research/publications/agapes-francophones/editorial-policy/!
    </div>
  ),
});
