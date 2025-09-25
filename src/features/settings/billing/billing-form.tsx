import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const billingFormSchema = z.object({
  plan: z.enum(['free', 'pro', 'enterprise'], {
    required_error: 'Please select a plan.',
  }),
  billingEmail: z.string().email('Please enter a valid email address.'),
  cardNumber: z.string().min(16, 'Card number must be at least 16 digits.'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter a valid expiry date (MM/YY).'),
  cvv: z.string().min(3, 'CVV must be at least 3 digits.'),
})

type BillingFormValues = z.infer<typeof billingFormSchema>

export function BillingForm() {
  // Mock current subscription data
  const currentPlan = {
    name: 'Free',
    price: '$0',
    period: 'month',
    features: ['Up to 10 employees', 'Basic attendance tracking', 'Email support'],
    nextBilling: null,
  }

  const defaultValues: Partial<BillingFormValues> = {
    plan: 'free',
    billingEmail: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  }

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingFormSchema),
    defaultValues,
  })

  function onSubmit(data: BillingFormValues) {
    showSubmittedData(data)
  }

  return (
    <div className='space-y-6'>
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>
            Manage your current plan and billing information.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-semibold'>{currentPlan.name} Plan</h3>
              <p className='text-sm text-muted-foreground'>
                {currentPlan.price}/{currentPlan.period}
              </p>
            </div>
            <Badge variant='secondary'>Active</Badge>
          </div>
          <div className='space-y-2'>
            <h4 className='font-medium'>Features included:</h4>
            <ul className='space-y-1'>
              {currentPlan.features.map((feature, index) => (
                <li key={index} className='text-sm text-muted-foreground'>
                  • {feature}
                </li>
              ))}
            </ul>
          </div>
          {currentPlan.nextBilling && (
            <p className='text-sm text-muted-foreground'>
              Next billing date: {currentPlan.nextBilling}
            </p>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Upgrade Plan */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Upgrade Plan</CardTitle>
              <CardDescription>
                Choose a plan that fits your needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name='plan'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='grid gap-4'
                      >
                        <div className='flex items-center space-x-2 border rounded-lg p-4'>
                          <RadioGroupItem value='free' id='free' />
                          <div className='flex-1'>
                            <label htmlFor='free' className='font-medium cursor-pointer'>
                              Free Plan - $0/month
                            </label>
                            <p className='text-sm text-muted-foreground'>
                              Perfect for small teams getting started
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center space-x-2 border rounded-lg p-4'>
                          <RadioGroupItem value='pro' id='pro' />
                          <div className='flex-1'>
                            <label htmlFor='pro' className='font-medium cursor-pointer'>
                              Pro Plan - $29/month
                            </label>
                            <p className='text-sm text-muted-foreground'>
                              Advanced features for growing businesses
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center space-x-2 border rounded-lg p-4'>
                          <RadioGroupItem value='enterprise' id='enterprise' />
                          <div className='flex-1'>
                            <label htmlFor='enterprise' className='font-medium cursor-pointer'>
                              Enterprise Plan - $99/month
                            </label>
                            <p className='text-sm text-muted-foreground'>
                              Full-featured solution for large organizations
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Update your billing details and payment method.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='billingEmail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Email</FormLabel>
                    <FormControl>
                      <Input placeholder='billing@company.com' {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll send invoices and billing updates to this email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='cardNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder='1234 5678 9012 3456' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-2 gap-2'>
                  <FormField
                    control={form.control}
                    name='expiryDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry</FormLabel>
                        <FormControl>
                          <Input placeholder='MM/YY' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='cvv'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder='123' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='flex gap-2'>
            <Button type='submit'>Update Billing</Button>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}