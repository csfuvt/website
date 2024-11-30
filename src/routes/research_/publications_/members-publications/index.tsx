import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/research_/publications_/members-publications/',
)({
  component: () => (
    <div>Hello /research/publications/members-publications/!</div>
  ),
})
