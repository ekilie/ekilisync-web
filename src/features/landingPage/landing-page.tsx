import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Check, ChevronRight, Menu, X, ArrowRight, Star } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HeroSection from '@/features/landingPage/HeroSection'
import FeaturesSection from './FeaturesSection'
import { howItWorksSteps, testimonials, pricingPlans, faqs } from './data'

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='flex min-h-[100dvh] flex-col'>
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'bg-background/80 shadow-sm' : 'bg-transparent'}`}
      >
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2 font-bold'>
            <div className='from-primary to-primary/70 text-primary-foreground flex size-8 items-center justify-center rounded-lg bg-gradient-to-br'>
              E
            </div>
            <span>ekiliSync</span>
          </div>
          <nav className='hidden gap-8 md:flex'>
            <a
              href='#features'
              className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
            >
              Features
            </a>
            <a
              href='#testimonials'
              className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
            >
              Testimonials
            </a>
            <a
              href='#pricing'
              className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
            >
              Pricing
            </a>
            <a
              href='#faq'
              className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
            >
              FAQ
            </a>
          </nav>
          <div className='hidden items-center gap-4 md:flex'>
            {/* <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-md">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button> */}
            <a
              href='sign-in'
              className='py-2 text-sm font-medium'
              onClick={() => setMobileMenuOpen(false)}
            >
              Log in
            </a>
            <Button
              className='rounded-md'
              onClick={() => {
                navigate({
                  to: '/sign-up',
                })
              }}
            >
              Get Started
              <ChevronRight className='ml-1 size-4' />
            </Button>
          </div>
          <div className='flex items-center gap-4 md:hidden'>
            {/* <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-md">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button> */}
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className='size-5' />
              ) : (
                <Menu className='size-5' />
              )}
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='bg-background/95 absolute inset-x-0 top-16 border-b backdrop-blur-lg md:hidden'
          >
            <div className='container flex flex-col gap-4 py-4'>
              <a
                href='#features'
                className='py-2 text-sm font-medium'
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href='#testimonials'
                className='py-2 text-sm font-medium'
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href='#pricing'
                className='py-2 text-sm font-medium'
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href='#faq'
                className='py-2 text-sm font-medium'
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <div className='flex flex-col gap-2 border-t pt-2'>
                <a
                  href='sign-in'
                  className='py-2 text-sm font-medium'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </a>
                <Button
                  className='rounded-md'
                  onClick={() => {
                    navigate({
                      to: '/sign-up',
                    })
                  }}
                >
                  Get Started
                  <ChevronRight className='ml-1 size-4' />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>
      <main className='flex-1'>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        {/* How It Works Section */}
        <section className='bg-muted/30 relative w-full overflow-hidden py-20 md:py-32'>
          <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] bg-[size:4rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]'></div>

          <div className='relative container px-4 md:px-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='mb-16 flex flex-col items-center justify-center space-y-4 text-center'
            >
              <Badge
                className='rounded-md px-4 py-1.5 text-sm font-medium'
                variant='secondary'
              >
                How It Works
              </Badge>
              <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
                Simple Setup, Automatic Tracking
              </h2>
              <p className='text-muted-foreground max-w-[800px] md:text-lg'>
                Get your team up and running with ekiliSync in minutes. Our
                location-based technology handles the rest.
              </p>
            </motion.div>

            <div className='relative grid gap-8 md:grid-cols-3 md:gap-12'>
              <div className='via-border absolute top-1/2 right-0 left-0 z-0 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent to-transparent md:block'></div>

              {howItWorksSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className='relative z-10 flex flex-col items-center space-y-4 text-center'
                >
                  <div className='from-primary to-primary/70 text-primary-foreground flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-br text-xl font-bold shadow-lg'>
                    {step.step}
                  </div>
                  <h3 className='text-xl font-bold'>{step.title}</h3>
                  <p className='text-muted-foreground'>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id='testimonials' className='w-full py-20 md:py-32'>
          <div className='container px-4 md:px-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'
            >
              <Badge
                className='rounded-md px-4 py-1.5 text-sm font-medium'
                variant='secondary'
              >
                Testimonials
              </Badge>
              <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
                Loved by HR Teams Everywhere
              </h2>
              <p className='text-muted-foreground max-w-[800px] md:text-lg'>
                See how ekiliSync has transformed attendance management for
                organizations of all sizes.
              </p>
            </motion.div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className='border-border/40 from-background to-muted/10 h-full overflow-hidden bg-gradient-to-b backdrop-blur transition-all hover:shadow-md'>
                    <CardContent className='flex h-full flex-col p-6'>
                      <div className='mb-4 flex'>
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star
                              key={j}
                              className='size-4 fill-yellow-500 text-yellow-500'
                            />
                          ))}
                      </div>
                      <p className='mb-6 flex-grow text-lg'>
                        {testimonial.quote}
                      </p>
                      <div className='border-border/40 mt-auto flex items-center gap-4 border-t pt-4'>
                        <div className='bg-muted text-foreground flex size-10 items-center justify-center rounded-md font-medium'>
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className='font-medium'>{testimonial.author}</p>
                          <p className='text-muted-foreground text-sm'>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id='pricing'
          className='bg-muted/30 relative w-full overflow-hidden py-20 md:py-32'
        >
          <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] bg-[size:4rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]'></div>

          <div className='relative container px-4 md:px-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'
            >
              <Badge
                className='rounded-md px-4 py-1.5 text-sm font-medium'
                variant='secondary'
              >
                Pricing
              </Badge>
              <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
                Simple, Transparent Pricing
              </h2>
              <p className='text-muted-foreground max-w-[800px] md:text-lg'>
                Choose the plan that fits your team size. All plans include a
                30-day free trial.
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
                      >
                        <Card
                          className={`relative h-full overflow-hidden ${plan.popular ? 'border-primary shadow-lg' : 'border-border/40 shadow-md'} from-background to-muted/10 bg-gradient-to-b backdrop-blur`}
                        >
                          {plan.popular && (
                            <div className='bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium'>
                              Most Popular
                            </div>
                          )}
                          <CardContent className='flex h-full flex-col p-6'>
                            <h3 className='text-2xl font-bold'>{plan.name}</h3>
                            <div className='mt-4 flex items-baseline'>
                              <span className='text-4xl font-bold'>
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
                                <li key={j} className='flex items-center'>
                                  <Check className='text-primary mr-2 size-4' />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              className={`mt-auto w-full rounded-md ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-muted hover:bg-muted/80'}`}
                              variant={plan.popular ? 'default' : 'outline'}
                            >
                              {plan.cta}
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
                      >
                        <Card
                          className={`relative h-full overflow-hidden ${plan.popular ? 'border-primary shadow-lg' : 'border-border/40 shadow-md'} from-background to-muted/10 bg-gradient-to-b backdrop-blur`}
                        >
                          {plan.popular && (
                            <div className='bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium'>
                              Most Popular
                            </div>
                          )}
                          <CardContent className='flex h-full flex-col p-6'>
                            <h3 className='text-2xl font-bold'>{plan.name}</h3>
                            <div className='mt-4 flex items-baseline'>
                              <span className='text-4xl font-bold'>
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
                                <li key={j} className='flex items-center'>
                                  <Check className='text-primary mr-2 size-4' />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              className={`mt-auto w-full rounded-md ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-muted hover:bg-muted/80'}`}
                              variant={plan.popular ? 'default' : 'outline'}
                            >
                              {plan.cta}
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

        {/* FAQ Section */}
        <section id='faq' className='w-full py-20 md:py-32'>
          <div className='container px-4 md:px-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'
            >
              <Badge
                className='rounded-md px-4 py-1.5 text-sm font-medium'
                variant='secondary'
              >
                FAQ
              </Badge>
              <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
                Frequently Asked Questions
              </h2>
              <p className='text-muted-foreground max-w-[800px] md:text-lg'>
                Find answers to common questions about ekiliSync and how it
                works.
              </p>
            </motion.div>

            <div className='mx-auto max-w-3xl'>
              <Accordion type='single' collapsible className='w-full'>
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className='border-border/40 border-b py-2'
                    >
                      <AccordionTrigger className='text-left font-medium hover:no-underline'>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className='text-muted-foreground'>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='from-primary to-primary/80 text-primary-foreground relative w-full overflow-hidden bg-gradient-to-br py-20 md:py-32'>
          <div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]'></div>
          <div className='absolute -top-24 -left-24 h-64 w-64 rounded-md bg-white/10 blur-3xl'></div>
          <div className='absolute -right-24 -bottom-24 h-64 w-64 rounded-md bg-white/10 blur-3xl'></div>

          <div className='relative container px-4 md:px-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='flex flex-col items-center justify-center space-y-6 text-center'
            >
              <h2 className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'>
                Ready to Modernize Your Attendance?
              </h2>
              <p className='text-primary-foreground/80 mx-auto max-w-[700px] md:text-xl'>
                Join thousands of organizations who have streamlined their
                attendance management with ekiliSync's smart location-based
                tracking system.
              </p>
              <div className='mt-4 flex flex-col gap-4 sm:flex-row'>
                <Button
                  size='lg'
                  variant='secondary'
                  className='h-12 rounded-md px-8 text-base'
                >
                  Start Free Trial
                  <ArrowRight className='ml-2 size-4' />
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='h-12 rounded-md border-white bg-transparent px-8 text-base text-white hover:bg-white/10'
                >
                  Schedule a Demo
                </Button>
              </div>
              <p className='text-primary-foreground/80 mt-4 text-sm'>
                No setup fees. 30-day free trial. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className='bg-background/95 w-full border-t backdrop-blur-sm'>
        <div className='container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16'>
          <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 font-bold'>
                <div className='from-primary to-primary/70 text-primary-foreground flex size-8 items-center justify-center rounded-lg bg-gradient-to-br'>
                  E
                </div>
                <span>ekiliSync</span>
              </div>
              <p className='text-muted-foreground text-sm'>
                Smart attendance tracking that works automatically. Streamline
                your workforce management with location-based technology.
              </p>
              <div className='flex gap-4'>
                <a
                  href='https://facebook.com/ekilisync'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='size-5'
                  >
                    <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
                  </svg>
                  <span className='sr-only'>Facebook</span>
                </a>
                <a
                  href='https://twitter.com/ekilisync'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='size-5'
                  >
                    <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'></path>
                  </svg>
                  <span className='sr-only'>Twitter</span>
                </a>
                <a
                  href='https://linkedin.com/company/ekilisync'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='size-5'
                  >
                    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
                    <rect width='4' height='12' x='2' y='9'></rect>
                    <circle cx='4' cy='4' r='2'></circle>
                  </svg>
                  <span className='sr-only'>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className='space-y-4'>
              <h4 className='text-sm font-bold'>Product</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a
                    href='#features'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#pricing'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='/mobile-app'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Mobile App
                  </a>
                </li>
                <li>
                  <a
                    href='/api'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div className='space-y-4'>
              <h4 className='text-sm font-bold'>Resources</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a
                    href='/documentation'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href='/help-center'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href='/blog'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='/support'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className='space-y-4'>
              <h4 className='text-sm font-bold'>Company</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a
                    href='/about'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='/careers'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href='/policies'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href='/terms'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-border/40 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row'>
            <p className='text-muted-foreground text-xs'>
              &copy; {new Date().getFullYear()} ekilie. All rights reserved.
            </p>
            <div className='flex gap-4'>
              <a
                href='/policies'
                className='text-muted-foreground hover:text-foreground text-xs transition-colors'
              >
                Privacy Policy
              </a>
              <a
                href='/terms'
                className='text-muted-foreground hover:text-foreground text-xs transition-colors'
              >
                Terms of Service
              </a>
              <a
                href='/policies#cookies'
                className='text-muted-foreground hover:text-foreground text-xs transition-colors'
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
