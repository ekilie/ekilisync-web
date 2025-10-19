import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Api from '@/lib/api'
import type { CurrentUser } from '@/lib/api/types'
import { userData, saveUser } from '@/lib/api/authToken'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  bio: 'I love ekiliSync.',
  urls: [{ value: 'https://ekilie.com' }, { value: 'http://sync.ekilie.com' }],
}

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    try {
      const u = userData()
      setUser(u)
      // Prefill form fields when user exists
      if (u) {
        form.reset({
          username: u.name || '',
          email: u.email || '',
          bio: (u as any).bio || defaultValues.bio,
          urls: defaultValues.urls,
        })
      }
    } catch (err) {
      // ignore
    }
  }, [form])

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return
    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)
    try {
      // Call API to update user
      const payload = {
        name: data.username,
        email: data.email,
        bio: data.bio,
      }

      await Api.updateUser(user.id, payload)

      // Update local cached user
      const updatedUser: CurrentUser = {
        id: user.id,
        name: data.username,
        email: data.email,
        role: user.role,
        office: user.office,
      }
      await saveUser(updatedUser)
      setUser(updatedUser)
      setSuccessMessage('Profile updated successfully')
    } catch (err: any) {
      // set user-visible error
      setErrorMessage(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to update profile'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder={user?.name ?? 'ekilie'} {...field} />
              </FormControl>
              <FormDescription>
                This is your public user profile name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={user?.email ?? 'you@ekilie.com'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about yourself'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            Add URL
          </Button>
        </div>
        <div className='space-y-2'>
          {errorMessage && <div className='text-red-600'>{errorMessage}</div>}
          {successMessage && (
            <div className='text-green-600'>{successMessage}</div>
          )}
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update profile'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
