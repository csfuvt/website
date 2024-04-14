import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/description-and-objectives/')({
  component: () => <div>Hello /about/description-and-objectives/!</div>,
});
