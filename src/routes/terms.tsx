import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/seo'
import { seoConfig } from '@/config/seo'

function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service - ekiliSync"
        description="Read ekiliSync's terms of service to understand the rules and regulations for using our attendance tracking platform."
        keywords="terms of service, terms and conditions, legal, user agreement"
        canonical={`${seoConfig.siteUrl}/terms`}
        noindex={false}
      />
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        {/* <p className="text-muted-foreground mb-2">This is the Terms of Service page. Please update with your actual terms.</p> */}
      </div>
    </>
  )
}

export const Route = createFileRoute('/terms')({
  component: TermsPage,
}) 