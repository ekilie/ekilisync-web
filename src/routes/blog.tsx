import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

function BlogPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className="text-muted-foreground mb-2">Our latest news and articles will be posted here.</p>
    </div>
  )
}

export const Route = createFileRoute('/blog')({
  component: ComingSoon,
}) 