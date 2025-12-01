import { Link } from '@tanstack/react-router'
import AuthLayout from '../auth-layout'
import { OnboardingFlow } from './components/onboarding-flow'

export default function SignUp() {
  return (
    <AuthLayout>
      <div className='w-full space-y-6'>
        <div className='text-center space-y-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Create your account
          </h1>
          <p className='text-muted-foreground text-sm'>
            Already have an account?{' '}
            <Link
              to='/sign-in'
              className='hover:text-primary underline underline-offset-4 font-medium'
            >
              Sign In
            </Link>
          </p>
        </div>
        <OnboardingFlow />
        <p className='text-muted-foreground px-4 text-center text-xs'>
          By creating an account, you agree to our{' '}
          <a
            href='/terms'
            className='hover:text-primary underline underline-offset-4'
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href='/privacy'
            className='hover:text-primary underline underline-offset-4'
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </AuthLayout>
  )
}
