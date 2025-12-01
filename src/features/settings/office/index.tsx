import ContentSection from '../components/content-section'
import OfficeForm from './office-form'

export default function SettingsOffice() {
  return (
    <ContentSection
      title="Office Settings"
      desc="Manage your office details and location information"
    >
      <OfficeForm />
    </ContentSection>
  )
}

