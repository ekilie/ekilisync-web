'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import Api from '@/lib/api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Office } from '../data/schema'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Office name is required.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Email is invalid.' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required.' }),
  address: z.string().min(1, { message: 'Address is required.' }),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  logoUrl: z.string().optional(),
})

type OfficeForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Office
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function OfficesActionDialog({
  currentRow,
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const isEdit = !!currentRow
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<OfficeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          name: currentRow.name,
          email: currentRow.email,
          phoneNumber: currentRow.phoneNumber,
          address: currentRow.address,
          latitude: currentRow.latitude?.toString() ?? '',
          longitude: currentRow.longitude?.toString() ?? '',
          logoUrl: currentRow.logoUrl,
        }
      : {
          name: '',
          email: '',
          phoneNumber: '',
          address: '',
          latitude: '',
          longitude: '',
          logoUrl: '',
        },
  })

  useEffect(() => {
    if (open && isEdit && currentRow) {
      form.reset({
        name: currentRow.name,
        email: currentRow.email,
        phoneNumber: currentRow.phoneNumber,
        address: currentRow.address,
        latitude: currentRow.latitude?.toString() ?? '',
        longitude: currentRow.longitude?.toString() ?? '',
        logoUrl: currentRow.logoUrl,
      })
    } else if (open && !isEdit) {
      form.reset({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        latitude: '',
        longitude: '',
        logoUrl: '',
      })
    }
  }, [open, isEdit, currentRow, form])

  async function onSubmit(data: OfficeForm) {
    setIsLoading(true)
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        latitude: data.latitude ? parseFloat(data.latitude) : undefined,
        longitude: data.longitude ? parseFloat(data.longitude) : undefined,
        logoUrl: data.logoUrl || undefined,
      }

      if (isEdit && currentRow) {
        await Api.updateOffice(currentRow.id, payload)
        toast.success('Office updated successfully')
      } else {
        await Api.createOffice(payload)
        toast.success('Office created successfully')
      }

      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (error: any) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isLoading) {
          onOpenChange(value)
          if (!value) {
            form.reset()
          }
        }
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Create'} Office</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update office information' : 'Add a new office to your system'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Main Office' {...field} />
                  </FormControl>
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
                      type='email'
                      placeholder='office@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder='+250 XXX XXX XXX' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter office address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='latitude'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='any'
                        placeholder='-1.9441'
                        {...field}
                      />
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
                    <FormLabel>Longitude (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='any'
                        placeholder='30.0619'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Office'
                  : 'Create Office'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
