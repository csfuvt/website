import { createFileRoute } from '@tanstack/react-router'
import { KBanner } from '../../../../-components/KBanner/KBanner'

const CallsPage = () => {
  return (
    <div>
      <KBanner label="CIEFT 2024 - Apel la comunicari" />
    </div>
  )
}

export const Route = createFileRoute(
  '/events_/conferences_/cieft_/current-year_/calls',
)({
  component: CallsPage,
})

export default CallsPage
