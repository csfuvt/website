import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/research_/publications_/agapes-francophones_/calls_/future/',
)({
  component: () => (
    <div>Hello /research/publications/agapes-francophones/calls/future/!</div>
  ),
})
