import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

function SupportPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">Support</h1>
      <p className="text-muted-foreground mb-2">Contact support or find help resources here.</p>
    </div>
  )
}

export const Route = createFileRoute('/support')({
  component: ComingSoon,
}) 