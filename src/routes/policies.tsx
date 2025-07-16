import { createFileRoute } from '@tanstack/react-router'

function PoliciesPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">Policies</h1>
      <p className="text-muted-foreground mb-2">This is the Policies page. Please update with your actual policies.</p>
    </div>
  )
}

export const Route = createFileRoute('/policies')({
  component: PoliciesPage,
}) 