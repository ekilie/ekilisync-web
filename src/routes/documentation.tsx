import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

function DocumentationPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">Documentation</h1>
      <p className="text-muted-foreground mb-2">Product documentation will be available here.</p>
    </div>
  )
}

export const Route = createFileRoute('/documentation')({
  component: ComingSoon,
}) 