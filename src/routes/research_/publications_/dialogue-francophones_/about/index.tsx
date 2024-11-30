import { createFileRoute } from '@tanstack/react-router'
import { DialoguesFrancophonesAboutPage } from '../../../../-pages/research/publications/dialogues-francophones/about/DialoguesFrancophonesAbout.tsx'

export const Route = createFileRoute(
  '/research_/publications_/dialogue-francophones_/about/',
)({
  component: () => <DialoguesFrancophonesAboutPage />,
})

export default DialoguesFrancophonesAboutPage
