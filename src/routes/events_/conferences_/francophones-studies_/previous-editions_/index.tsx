import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/events_/conferences_/francophones-studies_/previous-editions_/',
)({
  component: () => (
    <div>
      Hello /events/conferences/francophones-studies/previous-editions/!
    </div>
  ),
})
