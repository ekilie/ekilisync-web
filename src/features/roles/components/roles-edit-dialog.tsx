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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Role } from '../data/schema'

// Common permissions for roles
const AVAILABLE_PERMISSIONS = [
  'users.view',
  'users.create',
  'users.update',
  'users.delete',
  'employees.view',
  'employees.create',
  'employees.update',
  'employees.delete',
  'offices.view',
  'offices.create',
  'offices.update',
  'offices.delete',
  'attendance.view',
  'attendance.create',
  'attendance.update',
  'attendance.delete',
  'roles.view',
  'roles.update',
  'notifications.send',
]

const formSchema = z.object({
  permissions: z.array(z.string()).min(1, 'At least one permission is required'),
})

type RoleForm = z.infer<typeof formSchema>

interface Props {
  currentRow: Role
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function RolesEditDialog({
  currentRow,
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RoleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permissions: currentRow.permissions,
    },
  })

  useEffect(() => {
    if (open && currentRow) {
      form.reset({
        permissions: currentRow.permissions,
      })
    }
  }, [open, currentRow, form])

  async function onSubmit(data: RoleForm) {
    setIsLoading(true)
    try {
      await Api.updateRole(currentRow.id, {
        permissions: data.permissions,
      })
      toast.success('Role permissions updated successfully')
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update role permissions')
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
        }
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Edit {currentRow.name} Permissions</DialogTitle>
          <DialogDescription>
            Manage the permissions for the {currentRow.name} role
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='permissions'
              render={() => (
                <FormItem>
                  <FormLabel>Permissions</FormLabel>
                  <FormDescription>
                    Select the permissions this role should have
                  </FormDescription>
                  <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
                    <div className='space-y-4'>
                      {AVAILABLE_PERMISSIONS.map((permission) => (
                        <FormField
                          key={permission}
                          control={form.control}
                          name='permissions'
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={permission}
                                className='flex flex-row items-start space-x-3 space-y-0'
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(permission)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            permission,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== permission
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className='font-normal cursor-pointer'>
                                  {permission}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </FormItem>
              )}
            />
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
                {isLoading ? 'Saving...' : 'Update Permissions'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
