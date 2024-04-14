import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/research/projects/')({
  component: () => <div>Hello /research/projects/!</div>,
});
