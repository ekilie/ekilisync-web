import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

function CareersPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">Careers</h1>
      <p className="text-muted-foreground mb-2">Explore career opportunities at EkiliSync here.</p>
    </div>
  )
}

export const Route = createFileRoute('/careers')({
  component: ComingSoon,
}) 