import HeroSection from '@/features/landingPage/HeroSection'
import FeaturesSection from './FeaturesSection'
import LandingHeader from './components/LandingHeader'
import HowItWorksSection from './components/HowItWorksSection'
import PricingSection from './components/PricingSection'
import FAQSection from './components/FAQSection'
import CTASection from './components/CTASection'
import LandingFooter from './components/LandingFooter'
import { SEO, StructuredData } from '@/components/seo'
import { 
  seoConfig, 
  routeSEO, 
  organizationSchema, 
  websiteSchema, 
  softwareApplicationSchema 
} from '@/config/seo'

export default function LandingPage() {
  const currentUrl = seoConfig.siteUrl

  // Combined structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      softwareApplicationSchema,
      {
        '@type': 'WebPage',
        '@id': `${currentUrl}/#webpage`,
        url: currentUrl,
        name: routeSEO.home.title,
        description: routeSEO.home.description,
        isPartOf: {
          '@id': `${currentUrl}/#website`,
        },
        about: {
          '@id': `${currentUrl}/#organization`,
        },
        inLanguage: 'en-US',
      },
    ],
  }
  
  return (
    <>
      <SEO
        title={routeSEO.home.title}
        description={routeSEO.home.description}
        keywords={routeSEO.home.keywords}
        ogTitle={routeSEO.home.title}
        ogDescription={routeSEO.home.description}
        ogImage={routeSEO.home.ogImage || seoConfig.defaultOgImage}
        ogUrl={currentUrl}
        ogType="website"
        twitterCard="summary_large_image"
        canonical={currentUrl}
      />
      <StructuredData data={structuredData} />
      
      <div className='flex min-h-[100dvh] flex-col'>
        <LandingHeader />
        <main className='flex-1'>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </main>
        <LandingFooter />
      </div>
    </>
  )
}
