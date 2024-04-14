import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/international')({
  component: () => <div>Hello /international!</div>,
});
