import ContentSection from '../components/content-section'
import { BillingForm } from './billing-form'

export default function SettingsBilling() {
  return (
    <ContentSection
      title='Billing'
      desc='Manage your subscription, billing details, and payment methods.'
    >
      <BillingForm />
    </ContentSection>
  )
}