import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

function MobileAppPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">Mobile App</h1>
      <p className="text-muted-foreground mb-2">Information about the EkiliSync mobile app will be available here.</p>
    </div>
  )
}

export const Route = createFileRoute('/mobile-app')({
  component: ComingSoon,
}) 