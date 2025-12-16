import { motion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { pricingPlans } from '../data'
import { useNavigate } from '@tanstack/react-router'

export default function PricingSection() {
  const navigate = useNavigate()
  return (
    <section
      id='pricing'
      className='bg-muted/30 relative w-full overflow-hidden py-20 md:py-32'
    >
      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] bg-[size:4rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]'></div>
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent'></div>

      <div className='relative container px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'
        >
          <Badge
            className='rounded-md px-4 py-1.5 text-sm font-medium shadow-sm'
            variant='secondary'
          >
            Pricing
          </Badge>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            Simple, Transparent Pricing
          </h2>
          <p className='text-muted-foreground max-w-[800px] md:text-lg'>
            Choose the plan that fits your team size. Start with our free plan or upgrade when you're ready.
          </p>
        </motion.div>

        <div className='mx-auto max-w-5xl'>
          <Tabs defaultValue='monthly' className='w-full'>
            <div className='mb-8 flex justify-center'>
              <TabsList className='rounded-md p-1'>
                <TabsTrigger value='monthly' className='rounded-md px-6'>
                  Monthly
                </TabsTrigger>
                <TabsTrigger value='annually' className='rounded-md px-6'>
                  Annually (Save 20%)
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='monthly'>
              <div className='grid gap-6 lg:grid-cols-3 lg:gap-8'>
                {pricingPlans.monthly.map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className='h-full'
                  >
                    <Card
                      className={`relative h-full overflow-hidden transition-all duration-300 group ${plan.popular ? 'border-primary shadow-xl ring-2 ring-primary/20' : 'border-border/40 shadow-md hover:shadow-lg'} from-background to-muted/10 bg-gradient-to-b backdrop-blur hover:border-primary/50`}
                    >
                      {plan.popular && (
                        <div className='bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium shadow-md'>
                          Most Popular
                        </div>
                      )}
                      <CardContent className='flex h-full flex-col p-6'>
                        <h3 className='text-2xl font-bold group-hover:text-primary transition-colors duration-200'>{plan.name}</h3>
                        <div className='mt-4 flex items-baseline'>
                          <span className='text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>
                            {plan.price}
                          </span>
                          {plan.price !== 'Custom' && (
                            <span className='text-muted-foreground ml-1'>
                              /month
                            </span>
                          )}
                        </div>
                        <p className='text-muted-foreground mt-1 text-sm'>
                          {plan.priceNote}
                        </p>
                        <p className='text-muted-foreground mt-2'>
                          {plan.description}
                        </p>
                        <ul className='my-6 flex-grow space-y-3'>
                          {plan.features.map((feature, j) => (
                            <li key={j} className='flex items-center group/item'>
                              <Check className='text-primary mr-2 size-4 transition-transform group-hover/item:scale-110' />
                              <span className='group-hover/item:text-foreground transition-colors'>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`mt-auto w-full rounded-md transition-all duration-200 ${plan.popular ? 'bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-105' : 'bg-muted hover:bg-muted/80 hover:border-primary'}`}
                          variant={plan.popular ? 'default' : 'outline'}
                          onClick={() => {
                            if (plan.cta === 'Contact Sales') {
                              // TODO: Handle contact sales
                              return
                            }
                            navigate({
                              to: '/sign-up',
                            })
                          }}
                        >
                          {plan.cta}
                          <ChevronRight className='ml-1 size-4 transition-transform group-hover:translate-x-1' />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value='annually'>
              <div className='grid gap-6 lg:grid-cols-3 lg:gap-8'>
                {pricingPlans.annually.map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className='h-full'
                  >
                    <Card
                      className={`relative h-full overflow-hidden transition-all duration-300 group ${plan.popular ? 'border-primary shadow-xl ring-2 ring-primary/20' : 'border-border/40 shadow-md hover:shadow-lg'} from-background to-muted/10 bg-gradient-to-b backdrop-blur hover:border-primary/50`}
                    >
                      {plan.popular && (
                        <div className='bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium shadow-md'>
                          Most Popular
                        </div>
                      )}
                      <CardContent className='flex h-full flex-col p-6'>
                        <h3 className='text-2xl font-bold group-hover:text-primary transition-colors duration-200'>{plan.name}</h3>
                        <div className='mt-4 flex items-baseline'>
                          <span className='text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>
                            {plan.price}
                          </span>
                          {plan.price !== 'Custom' && (
                            <span className='text-muted-foreground ml-1'>
                              /month
                            </span>
                          )}
                        </div>
                        <p className='text-muted-foreground mt-1 text-sm'>
                          {plan.priceNote}
                        </p>
                        <p className='text-muted-foreground mt-2'>
                          {plan.description}
                        </p>
                        <ul className='my-6 flex-grow space-y-3'>
                          {plan.features.map((feature, j) => (
                            <li key={j} className='flex items-center group/item'>
                              <Check className='text-primary mr-2 size-4 transition-transform group-hover/item:scale-110' />
                              <span className='group-hover/item:text-foreground transition-colors'>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`mt-auto w-full rounded-md transition-all duration-200 ${plan.popular ? 'bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-105' : 'bg-muted hover:bg-muted/80 hover:border-primary'}`}
                          variant={plan.popular ? 'default' : 'outline'}
                          onClick={() => {
                            if (plan.cta === 'Contact Sales') {
                              // TODO: Handle contact sales
                              return
                            }
                            navigate({
                              to: '/sign-up',
                            })
                          }}
                        >
                          {plan.cta}
                          <ChevronRight className='ml-1 size-4 transition-transform group-hover:translate-x-1' />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

