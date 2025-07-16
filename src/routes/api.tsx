import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

function APIPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">API</h1>
      <p className="text-muted-foreground mb-2">API documentation and integration details will be available here.</p>
    </div>
  )
}

export const Route = createFileRoute('/api')({
  component: ComingSoon,
}) 