import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
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

type SignUpFormProps = HTMLAttributes<HTMLFormElement>

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Please enter your email' })
      .email({ message: 'Invalid email address' }),
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

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [registeredUser, setRegisteredUser] = useState<{ email: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
      }
      setSuccess('Registration successful! Please create your office to continue.')
      setRegisteredUser({ email: data.email })
      setShowOnboarding(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Onboarding form state
  const [officeLoading, setOfficeLoading] = useState(false)
  const [officeError, setOfficeError] = useState<string | null>(null)
  const [officeSuccess, setOfficeSuccess] = useState<string | null>(null)
  const [officeName, setOfficeName] = useState('')
  const [officeDetails, setOfficeDetails] = useState('')

  async function handleOnboardingSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOfficeLoading(true)
    setOfficeError(null)
    setOfficeSuccess(null)
    try {
      // Replace with your actual API endpoint for creating an office
      const response = await fetch('/api/offices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: officeName,
          details: officeDetails,
          userEmail: registeredUser?.email,
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create office')
      }
      setOfficeSuccess('Office created successfully! You can now access your dashboard.')
      // Optionally redirect to dashboard or login
    } catch (err: any) {
      setOfficeError(err.message)
    } finally {
      setOfficeLoading(false)
    }
  }

  if (showOnboarding) {
    return (
      <form onSubmit={handleOnboardingSubmit} className={cn('grid gap-3', className)}>
        <h2 className="text-xl font-semibold mb-2">Create Your Office</h2>
        <div>
          <label className="block mb-1 font-medium">Office Name</label>
          <Input
            placeholder="e.g. Main Office"
            value={officeName}
            onChange={e => setOfficeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Office Details</label>
          <Input
            placeholder="Optional details (address, description, etc.)"
            value={officeDetails}
            onChange={e => setOfficeDetails(e.target.value)}
          />
        </div>
        <Button className="mt-2" disabled={officeLoading || !officeName}>
          Create Office
        </Button>
        {officeError && <div className="text-red-500 text-sm mt-2">{officeError}</div>}
        {officeSuccess && <div className="text-green-600 text-sm mt-2">{officeSuccess}</div>}
      </form>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
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
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          Create Account
        </Button>
        {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}
        {success && <div className='text-green-600 text-sm mt-2'>{success}</div>}

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button
            variant='outline'
            className='w-full'
            type='button'
            disabled={isLoading}
          >
            <IconBrandGithub className='h-4 w-4' /> GitHub
          </Button>
          <Button
            variant='outline'
            className='w-full'
            type='button'
            disabled={isLoading}
          >
            <IconBrandFacebook className='h-4 w-4' /> Facebook
          </Button>
        </div>
      </form>
    </Form>
  )
}
