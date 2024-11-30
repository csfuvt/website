import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/events_/conferences_/cieft_/current-year_/info',
)({
  component: () => (
    <div>Hello /events/conferences/cieft/current-year/info!</div>
  ),
})
