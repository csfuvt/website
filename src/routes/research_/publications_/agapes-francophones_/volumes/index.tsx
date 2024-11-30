import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/research_/publications_/agapes-francophones_/volumes/',
)({
  component: () => (
    <div>Hello /research/publications/agapes-francophones/volumes/!</div>
  ),
})
