import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/events_/conferences_/francophones-studies_/current-year_/info',
)({
  component: () => (
    <div>Hello /events/conferences/francophones-studies/current-year/info!</div>
  ),
})
