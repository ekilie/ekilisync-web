import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/seo'
import { seoConfig, routeSEO } from '@/config/seo'

function CareersPage() {
  return (
    <>
      <SEO
        title={routeSEO.careers.title}
        description={routeSEO.careers.description}
        keywords={routeSEO.careers.keywords}
        canonical={`${seoConfig.siteUrl}/careers`}
      />
      <ComingSoon />
    </>
  )
}

export const Route = createFileRoute('/careers')({
  component: CareersPage,
}) 