import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/members/')({
  component: () => <div>Hello /about/members/!</div>,
});
