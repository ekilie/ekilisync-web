import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  name: z.string().min(1, 'Office name is required'),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  adminName: z.string().min(1, 'Admin name is required'),
  adminEmail: z.string().email('Invalid email').optional(),
  adminPassword: z.string().min(7, 'Password must be at least 7 characters'),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateOfficePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [officeId, setOfficeId] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      latitude: '',
      longitude: '',
      adminName: '',
      adminEmail: '',
      adminPassword: '',
    },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch('/api/offices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          latitude: data.latitude ? parseFloat(data.latitude) : undefined,
          longitude: data.longitude ? parseFloat(data.longitude) : undefined,
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create office')
      }
      const result = await response.json()
      setSuccess('Office created successfully!')
      setOfficeId(result.id)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='max-w-lg mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Create Office</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office Name</FormLabel>
                <FormControl>
                  <Input placeholder='Office Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='latitude'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input placeholder='Latitude (optional)' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='longitude'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input placeholder='Longitude (optional)' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='adminName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Name</FormLabel>
                <FormControl>
                  <Input placeholder='Admin Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='adminEmail'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Email (optional)</FormLabel>
                <FormControl>
                  <Input placeholder='Admin Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='adminPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Admin Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? 'Creating...' : 'Create Office'}
          </Button>
          {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}
          {success && <div className='text-green-600 text-sm mt-2'>{success}</div>}
        </form>
      </Form>
      {officeId && (
        <div className='mt-6'>
          <Button asChild className='w-full'>
            <a href={`/offices/${officeId}/invite`}>Invite Employees</a>
          </Button>
        </div>
      )}
    </div>
  )
} 