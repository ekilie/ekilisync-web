import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/seo'
import { seoConfig, routeSEO } from '@/config/seo'

function AboutPage() {
  return (
    <>
      <SEO
        title={routeSEO.about.title}
        description={routeSEO.about.description}
        keywords={routeSEO.about.keywords}
        canonical={`${seoConfig.siteUrl}/about`}
      />
      <ComingSoon />
    </>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
}) 