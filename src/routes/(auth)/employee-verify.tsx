import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/(auth)/employee-verify')({
  component: EmployeeVerifyPage,
})

const formSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
  password: z.string().min(7, 'Password must be at least 7 characters'),
})

type FormValues = z.infer<typeof formSchema>

export default function EmployeeVerifyPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: '',
      password: '',
    },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch('/api/employees/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Verification failed')
      }
      setSuccess('Account verified! You can now log in.')
      form.reset()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='max-w-lg mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Employee Account Verification</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='token'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Token</FormLabel>
                <FormControl>
                  <Input placeholder='Paste your verification token' {...field} />
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
                <FormLabel>Set Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Set your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? 'Verifying...' : 'Verify Account'}
          </Button>
          {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}
          {success && <div className='text-green-600 text-sm mt-2'>{success}</div>}
        </form>
      </Form>
    </div>
  )
} 