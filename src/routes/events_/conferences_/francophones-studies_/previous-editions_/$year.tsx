import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/events_/conferences_/francophones-studies_/previous-editions_/$year',
)({
  component: () => (
    <div>
      Hello /events/conferences/francophones-studies/previous-editions/$year!
    </div>
  ),
})
