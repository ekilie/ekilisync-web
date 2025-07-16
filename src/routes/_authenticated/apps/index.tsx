import { createFileRoute } from '@tanstack/react-router'
import Apps from '@/features/apps'
import ComingSoon from '@/components/coming-soon'

export const Route = createFileRoute('/_authenticated/apps/')({
  // component: Apps,
  component: ComingSoon, // Temporarily using ComingSoon component
})
