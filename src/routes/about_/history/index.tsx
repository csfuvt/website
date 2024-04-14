import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/history/')({
  component: () => <div>Hello /about/history/!</div>,
});
