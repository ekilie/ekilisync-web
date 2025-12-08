import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/seo'
import { seoConfig, routeSEO } from '@/config/seo'

function SupportPage() {
  return (
    <>
      <SEO
        title={routeSEO.support.title}
        description={routeSEO.support.description}
        keywords={routeSEO.support.keywords}
        canonical={`${seoConfig.siteUrl}/support`}
      />
      <ComingSoon />
    </>
  )
}

export const Route = createFileRoute('/support')({
  component: SupportPage,
}) 