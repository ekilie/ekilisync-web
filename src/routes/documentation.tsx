import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/seo'
import { seoConfig, routeSEO } from '@/config/seo'

function DocumentationPage() {
  return (
    <>
      <SEO
        title={routeSEO.documentation.title}
        description={routeSEO.documentation.description}
        keywords={routeSEO.documentation.keywords}
        canonical={`${seoConfig.siteUrl}/documentation`}
      />
      <ComingSoon />
    </>
  )
}

export const Route = createFileRoute('/documentation')({
  component: DocumentationPage,
}) 