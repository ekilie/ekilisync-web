import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

function AboutPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="text-muted-foreground mb-2">Learn more about EkiliSync and our mission here.</p>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: ComingSoon,
}) 