import { createFileRoute } from '@tanstack/react-router'
import ComingSoon from '@/components/coming-soon'
import { SEO } from '@/components/seo'
import { seoConfig, routeSEO } from '@/config/seo'

function BlogPage() {
  return (
    <>
      <SEO
        title={routeSEO.blog.title}
        description={routeSEO.blog.description}
        keywords={routeSEO.blog.keywords}
        canonical={`${seoConfig.siteUrl}/blog`}
        ogType="website"
      />
      <ComingSoon />
    </>
  )
}

export const Route = createFileRoute('/blog')({
  component: BlogPage,
}) 