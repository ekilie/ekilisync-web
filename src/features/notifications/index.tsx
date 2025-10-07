import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import Api from '@/lib/api'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { IconMail, IconMessage } from '@tabler/icons-react'

const smsFormSchema = z.object({
  phoneNumber: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required').max(160, 'SMS message must be 160 characters or less'),
})

const emailFormSchema = z.object({
  to: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
})

type SmsFormValues = z.infer<typeof smsFormSchema>
type EmailFormValues = z.infer<typeof emailFormSchema>

export default function Notifications() {
  const [smsSending, setSmsSending] = useState(false)
  const [emailSending, setEmailSending] = useState(false)

  const smsForm = useForm<SmsFormValues>({
    resolver: zodResolver(smsFormSchema),
    defaultValues: {
      phoneNumber: '',
      message: '',
    },
  })

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      to: '',
      subject: '',
      message: '',
    },
  })

  async function onSmsSubmit(data: SmsFormValues) {
    setSmsSending(true)
    try {
      await Api.sendSms({
        phoneNumber: data.phoneNumber,
        message: data.message,
      })
      toast.success('SMS sent successfully')
      smsForm.reset()
    } catch (error: any) {
      toast.error(error.message || 'Failed to send SMS')
    } finally {
      setSmsSending(false)
    }
  }

  async function onEmailSubmit(data: EmailFormValues) {
    setEmailSending(true)
    try {
      await Api.sendEmail({
        to: data.to,
        subject: data.subject,
        message: data.message,
      })
      toast.success('Email sent successfully')
      emailForm.reset()
    } catch (error: any) {
      toast.error(error.message || 'Failed to send email')
    } finally {
      setEmailSending(false)
    }
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-4'>
          <h1 className='text-2xl font-bold tracking-tight'>Notifications</h1>
          <p className='text-muted-foreground'>
            Send SMS and email notifications to users
          </p>
        </div>

        <Tabs defaultValue='sms' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 max-w-md'>
            <TabsTrigger value='sms' className='gap-2'>
              <IconMessage className='h-4 w-4' />
              SMS
            </TabsTrigger>
            <TabsTrigger value='email' className='gap-2'>
              <IconMail className='h-4 w-4' />
              Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value='sms'>
            <Card>
              <CardHeader>
                <CardTitle>Send SMS</CardTitle>
                <CardDescription>
                  Send SMS notifications to users via their phone numbers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...smsForm}>
                  <form onSubmit={smsForm.handleSubmit(onSmsSubmit)} className='space-y-4'>
                    <FormField
                      control={smsForm.control}
                      name='phoneNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder='+250 XXX XXX XXX' {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the recipient's phone number with country code
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={smsForm.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Enter your message here...'
                              className='min-h-[120px]'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            SMS messages are limited to 160 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type='submit' disabled={smsSending}>
                      {smsSending ? 'Sending...' : 'Send SMS'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='email'>
            <Card>
              <CardHeader>
                <CardTitle>Send Email</CardTitle>
                <CardDescription>
                  Send email notifications to users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className='space-y-4'>
                    <FormField
                      control={emailForm.control}
                      name='to'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>To</FormLabel>
                          <FormControl>
                            <Input type='email' placeholder='user@example.com' {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the recipient's email address
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailForm.control}
                      name='subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder='Email subject' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailForm.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Enter your message here...'
                              className='min-h-[200px]'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type='submit' disabled={emailSending}>
                      {emailSending ? 'Sending...' : 'Send Email'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
