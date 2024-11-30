import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/research_/publications_/agapes-francophones_/about/',
)({
  component: () => (
    <div>Hello /research/publications/agapes-francophones/about/!</div>
  ),
})
