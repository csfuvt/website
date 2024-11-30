import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/research_/publications_/agapes-francophones_/editorial-policy/',
)({
  component: () => (
    <div>
      Hello /research/publications/agapes-francophones/editorial-policy/!
    </div>
  ),
})
