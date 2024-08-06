import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/partners')({
  component: () => <div>Hello /about/parteneri!</div>,
});
