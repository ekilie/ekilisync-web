import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Api from '@/lib/api'
import { officeData, userData, saveUser } from '@/lib/api/authToken'
import type { Office, UpdateOfficeDto } from '@/lib/api/types'
import { toast } from 'sonner'
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
import { IconMapPin, IconLoader2 } from '@tabler/icons-react'
import UpdateLocationDialog from '@/components/update-location'

const officeFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Office name must be at least 2 characters.',
    })
    .max(100, {
      message: 'Office name must not be longer than 100 characters.',
    }),
  phoneNumber: z
    .string()
    .min(1, {
      message: 'Phone number is required.',
    }),
  address: z
    .string()
    .min(1, {
      message: 'Address is required.',
    })
    .max(200, {
      message: 'Address must not be longer than 200 characters.',
    }),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address.',
    })
    .optional()
    .or(z.literal('')),
  logoUrl: z
    .string()
    .url({
      message: 'Please enter a valid URL.',
    })
    .optional()
    .or(z.literal('')),
})

type OfficeFormValues = z.infer<typeof officeFormSchema>

export default function OfficeForm() {
  const [office, setOffice] = useState<Office | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<OfficeFormValues>({
    resolver: zodResolver(officeFormSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    const loadOffice = async () => {
      try {
        const currentOffice = officeData()
        if (currentOffice?.id) {
          // Fetch latest office data from backend
          const response = await Api.getOffice(currentOffice.id)
          const officeData = response.data
          setOffice(officeData)
          
          // Prefill form fields
          form.reset({
            name: officeData.name || '',
            phoneNumber: officeData.phoneNumber || '',
            address: (officeData as any).address || '',
            email: (officeData as any).email || '',
            logoUrl: (officeData as any).logoUrl || '',
          })
        } else {
          setOffice(currentOffice)
          if (currentOffice) {
            form.reset({
              name: currentOffice.name || '',
              phoneNumber: currentOffice.phoneNumber || '',
              address: (currentOffice as any).address || '',
              email: (currentOffice as any).email || '',
              logoUrl: (currentOffice as any).logoUrl || '',
            })
          }
        }
      } catch (error) {
        console.error('Failed to load office:', error)
        toast.error('Failed to load office details')
      } finally {
        setIsLoading(false)
      }
    }

    loadOffice()
  }, [form])

  async function onSubmit(data: OfficeFormValues) {
    if (!office?.id) {
      toast.error('Office ID not found')
      return
    }

    setIsSubmitting(true)
    try {
      const payload: UpdateOfficeDto = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address || undefined,
        email: data.email || undefined,
        logoUrl: data.logoUrl || undefined,
      }

      const response = await Api.updateOffice(office.id, payload)
      const updatedOffice = response.data

      // Update local cached office data
      const user = userData()
      if (user) {
        await saveUser({
          ...user,
          office: updatedOffice,
        })
      }

      setOffice(updatedOffice)
      toast.success('Office details updated successfully')
    } catch (error: any) {
      console.error('Failed to update office:', error)
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to update office details'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <IconLoader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Name</FormLabel>
              <FormControl>
                <Input placeholder="Headquarters" {...field} />
              </FormControl>
              <FormDescription>
                The name of your office or business location
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormDescription>
                Contact phone number for this office
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, City, State, ZIP" {...field} />
              </FormControl>
              <FormDescription>
                Physical address of the office location
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="office@example.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Contact email address for this office
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                URL to your office logo image
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <IconMapPin className="h-4 w-4" />
                <h4 className="text-sm font-medium">Office Location</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Update the GPS coordinates of your office location
              </p>
              {office?.latitude && office?.longitude && (
                <p className="text-xs text-muted-foreground mt-1">
                  Current: {office.latitude.toFixed(6)}, {office.longitude.toFixed(6)}
                </p>
              )}
            </div>
            <UpdateLocationDialog />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Office Details'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

