import { useState } from 'react'
import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import Api, { SignupDto } from '@/lib/api'
import {
  IconBuilding,
  IconMail,
  IconLock,
  IconCheck,
  IconArrowRight,
  IconArrowLeft,
  IconPhone,
  IconSparkles
} from '@tabler/icons-react'

type OnboardingFlowProps = HTMLAttributes<HTMLDivElement>

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter your office name' }),
    email: z
      .string()
      .min(1, { message: 'Please enter your email' })
      .email({ message: 'Invalid email address' }),
    phone: z.string().optional(),
    password: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(7, {
        message: 'Password must be at least 7 characters long',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof formSchema>

const steps = [
  {
    id: 1,
    title: 'Welcome',
    description: 'Get started with ekiliSync',
    icon: IconSparkles,
  },
  {
    id: 2,
    title: 'Office Information',
    description: 'Tell us about your office',
    icon: IconBuilding,
  },
  {
    id: 3,
    title: 'Admin Details',
    description: 'Set up your admin account',
    icon: IconMail,
  },
  {
    id: 4,
    title: 'Security',
    description: 'Create a secure password',
    icon: IconLock,
  },
  {
    id: 5,
    title: 'Review',
    description: 'Review your information',
    icon: IconCheck,
  },
]

export function OnboardingFlow({ className, ...props }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    mode: 'onChange',
  })

  const progress = (currentStep / steps.length) * 100

  const validateStep = async (step: number): Promise<boolean> => {
    const fields: (keyof FormData)[] = {
      1: [], // Welcome step, no validation
      2: ['name'],
      3: ['email', 'phone'],
      4: ['password', 'confirmPassword'],
      5: [], // Review step, no validation
    }[step] as (keyof FormData)[]

    if (fields.length === 0) return true

    const result = await form.trigger(fields)
    return result
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (!isValid) return

    if (currentStep < steps.length) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setError(null)
        setIsAnimating(false)
      }, 150)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setError(null)
        setIsAnimating(false)
      }, 150)
    }
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const payload: SignupDto = {
        officeName: data.name,
        adminEmail: data.email,
        adminPassword: data.password,
        phoneNumber: data.phone ?? '',
      }
      await Api.signup(payload)
      setSuccess('Registration successful! Redirecting to sign in...')
      setTimeout(() => {
        navigate({ to: '/sign-in' })
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    const step = steps[currentStep - 1]
    const Icon = step.icon

    switch (currentStep) {
      case 1:
        return (
          <div className='space-y-6 text-center'>
            <div className='space-y-3 rounded-lg border bg-muted/50 p-4 text-left'>
              <div className='flex items-start gap-3'>
                <IconCheck className='mt-0.5 h-5 w-5 text-primary shrink-0' />
                <div>
                  <p className='font-medium'>Easy Setup</p>
                  <p className='text-sm text-muted-foreground'>
                    Create your office and admin account in minutes
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <IconCheck className='mt-0.5 h-5 w-5 text-primary shrink-0' />
                <div>
                  <p className='font-medium'>Secure Access</p>
                  <p className='text-sm text-muted-foreground'>
                    Your data is protected with enterprise-grade security
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <IconCheck className='mt-0.5 h-5 w-5 text-primary shrink-0' />
                <div>
                  <p className='font-medium'>24/7 Support</p>
                  <p className='text-sm text-muted-foreground'>
                    We're here to help whenever you need us
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                <Icon className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h3 className='text-xl font-semibold'>{step.title}</h3>
                <p className='text-sm text-muted-foreground'>{step.description}</p>
              </div>
            </div>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Name</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., Acme Corporation' {...field} />
                  </FormControl>
                  <FormMessage />
                  <p className='text-xs text-muted-foreground'>
                    This will be the name of your organization
                  </p>
                </FormItem>
              )}
            />
          </div>
        )

      case 3:
        return (
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                <Icon className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h3 className='text-xl font-semibold'>{step.title}</h3>
                <p className='text-sm text-muted-foreground'>{step.description}</p>
              </div>
            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <IconMail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                        <Input
                          placeholder='admin@yourcompany.com'
                          className='pl-9'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <p className='text-xs text-muted-foreground'>
                      This email will be used to log in as admin
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <IconPhone className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                        <Input
                          placeholder='+1 (555) 000-0000'
                          className='pl-9'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                <Icon className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h3 className='text-xl font-semibold'>{step.title}</h3>
                <p className='text-sm text-muted-foreground'>{step.description}</p>
              </div>
            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <IconLock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                        <PasswordInput
                          placeholder='Create a strong password'
                          className='pl-9'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <p className='text-xs text-muted-foreground'>
                      Must be at least 7 characters long
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <IconLock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                        <PasswordInput
                          placeholder='Confirm your password'
                          className='pl-9'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 5:
        const formData = form.getValues()
        return (
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                <Icon className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h3 className='text-xl font-semibold'>{step.title}</h3>
                <p className='text-sm text-muted-foreground'>
                  Please review your information before submitting
                </p>
              </div>
            </div>
            <div className='space-y-4 rounded-lg border bg-muted/50 p-4'>
              <div className='space-y-3'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <IconBuilding className='h-4 w-4' />
                    <span>Office Name</span>
                  </div>
                  <span className='text-sm font-medium text-right'>{formData.name}</span>
                </div>
                <div className='h-px bg-border' />
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <IconMail className='h-4 w-4' />
                    <span>Admin Email</span>
                  </div>
                  <span className='text-sm font-medium text-right break-all'>{formData.email}</span>
                </div>
                {formData.phone && (
                  <>
                    <div className='h-px bg-border' />
                    <div className='flex items-start justify-between gap-4'>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <IconPhone className='h-4 w-4' />
                        <span>Phone Number</span>
                      </div>
                      <span className='text-sm font-medium text-right'>{formData.phone}</span>
                    </div>
                  </>
                )}
                <div className='h-px bg-border' />
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <IconLock className='h-4 w-4' />
                    <span>Password</span>
                  </div>
                  <span className='text-sm font-medium text-right'>••••••••</span>
                </div>
              </div>
            </div>
            {error && (
              <div className='rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive'>
                {error}
              </div>
            )}
            {success && (
              <div className='rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400'>
                {success}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6', className)} {...props}>
        {/* Progress Bar */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>
              Step {currentStep} of {steps.length}
            </span>
            <span className='font-medium'>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className='h-2' />
        </div>

        {/* Step Indicators */}
        <div className='relative flex items-center justify-between py-4'>
          {/* Connector Line */}
          <div className='absolute left-5 right-5 top-1/2 h-0.5 -translate-y-1/2 bg-muted' />
          <div
            className='absolute left-5 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500'
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* Step Circles */}
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            const isUpcoming = currentStep < step.id

            return (
              <div
                key={step.id}
                className='relative z-10 flex flex-1 items-center justify-center'
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                    isCompleted &&
                    'border-primary bg-primary text-primary-foreground scale-110',
                    isActive &&
                    'border-primary bg-primary/10 text-primary scale-110 shadow-md',
                    isUpcoming &&
                    'border-muted bg-background text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <IconCheck className='h-5 w-5' />
                  ) : (
                    <StepIcon className='h-5 w-5' />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Step Content */}
        <Card className='border-0 shadow-lg'>
          <CardContent>
            <div
              className={cn(
                'min-h-[300px] transition-all duration-300 ease-in-out',
                isAnimating && 'opacity-0 translate-y-2'
              )}
            >
              {renderStepContent()}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className='flex items-center justify-between gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={handlePrevious}
            disabled={currentStep === 1 || isLoading}
            className='gap-2'
          >
            <IconArrowLeft className='h-4 w-4' />
            Previous
          </Button>
          <div className='flex gap-2'>
            {currentStep < steps.length ? (
              <Button
                type='button'
                onClick={handleNext}
                className='gap-2'
                disabled={isLoading}
              >
                Next
                <IconArrowRight className='h-4 w-4' />
              </Button>
            ) : (
              <Button type='submit' disabled={isLoading} className='gap-2'>
                {isLoading ? 'Creating Account...' : 'Create Account'}
                <IconCheck className='h-4 w-4' />
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}
