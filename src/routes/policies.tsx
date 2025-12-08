import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/seo'
import { seoConfig } from '@/config/seo'

function PoliciesPage() {
  return (
    <>
      <SEO
        title="Privacy Policy - ekiliSync"
        description="Read ekiliSync's privacy policy to understand how we collect, use, and protect your data."
        keywords="privacy policy, data protection, privacy, terms"
        canonical={`${seoConfig.siteUrl}/policies`}
        noindex={false}
      />
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-4">Policies</h1>
        {/* <p className="text-muted-foreground mb-2">This is the Policies page. Please update with your actual policies.</p> */}
      </div>
    </>
  )
}

export const Route = createFileRoute('/policies')({
  component: PoliciesPage,
}) 