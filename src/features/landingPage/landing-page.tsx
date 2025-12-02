import HeroSection from '@/features/landingPage/HeroSection'
import FeaturesSection from './FeaturesSection'
import LandingHeader from './components/LandingHeader'
import HowItWorksSection from './components/HowItWorksSection'
import PricingSection from './components/PricingSection'
import FAQSection from './components/FAQSection'
import CTASection from './components/CTASection'
import LandingFooter from './components/LandingFooter'

export default function LandingPage() {
  return (
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
  )
}
