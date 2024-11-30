import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/events_/conferences_/cieft_/previous-editions_/',
)({
  component: () => <div>Hello /conferences/cieft/previous-editions!</div>,
})
