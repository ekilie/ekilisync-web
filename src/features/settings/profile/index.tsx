import ContentSection from '../components/content-section'
import ProfileForm from './profile-form'

export default function SettingsProfile() {
  return (
    <ContentSection
      title='Profile'
      desc='Your profile details'
    >
      <ProfileForm />
    </ContentSection>
  )
}
