import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/events_/conferences_/cieft_/previous-editions_/$year',
)({
  component: () => (
    <div>Hello /events/conferences/cieft/previous-editions/$year!</div>
  ),
})
