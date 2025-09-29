import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconMailPlus, IconSend } from '@tabler/icons-react'
import Api from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
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

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Email is invalid.' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required.' }),
})
type UserInviteForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersInviteDialog({ open, onOpenChange }: Props) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phoneNumber: '' },
  })

  const onSubmit = async (values: UserInviteForm) => {
    if (!user?.office?.id) {
      setErrorMessage('No office ID found for current user')
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const payload = {
        ...values,
        officeId: user.office.id.toString(),
      }

      await Api.inviteEmployee(payload)

      // Success - reset form and close dialog
      form.reset()
      onOpenChange(false)
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Failed to invite employee'
      setErrorMessage(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        setErrorMessage(null)
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-left'>
          <DialogTitle className='flex items-center gap-2'>
            <IconMailPlus /> Invite employee
          </DialogTitle>
          <DialogDescription>
            Invite new employee to join your team by sending them an email
            invitation with OTP for verification.
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div className='rounded bg-red-50 p-2 text-sm text-red-600'>
            {errorMessage}
          </div>
        )}
        <Form {...form}>
          <form
            id='employee-invite-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='eg: John Doe' {...field} />
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
                      placeholder='eg: john.doe@gmail.com'
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
                    <Input
                      type='tel'
                      placeholder='eg: +1234567890'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-y-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            type='submit'
            form='employee-invite-form'
            disabled={isLoading}
          >
            {isLoading ? 'Inviting...' : 'Invite'} <IconSend />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
