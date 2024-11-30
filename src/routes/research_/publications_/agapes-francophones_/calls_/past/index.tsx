import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/research_/publications_/agapes-francophones_/calls_/past/',
)({
  component: () => (
    <div>Hello /research/publications/agapes-francophones/calls/past/!</div>
  ),
})
