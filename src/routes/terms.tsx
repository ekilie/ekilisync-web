import { createFileRoute } from '@tanstack/react-router'

function TermsPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-muted-foreground mb-2">This is the Terms of Service page. Please update with your actual terms.</p>
    </div>
  )
}

export const Route = createFileRoute('/terms')({
  component: TermsPage,
}) 