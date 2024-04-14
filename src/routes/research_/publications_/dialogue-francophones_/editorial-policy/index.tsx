import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/editorial-policy/'
)({
  component: () => (
    <div>
      Hello /research/publications/dialogue-francophones/editorial-policy/!
    </div>
  ),
});
