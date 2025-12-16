import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className='from-primary to-primary/80 text-primary-foreground relative w-full overflow-hidden bg-gradient-to-br py-20 md:py-32'>
      <div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]'></div>
      <div className='absolute -top-24 -left-24 h-64 w-64 rounded-md bg-white/10 blur-3xl animate-pulse'></div>
      <div className='absolute -right-24 -bottom-24 h-64 w-64 rounded-md bg-white/10 blur-3xl animate-pulse' style={{ animationDelay: '1s' }}></div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl'></div>

      <div className='relative container px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center justify-center space-y-6 text-center'
        >
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl drop-shadow-sm'>
            Ready to Modernize Your Attendance?
          </h2>
          <p className='text-primary-foreground/90 mx-auto max-w-[700px] md:text-xl'>
            Join thousands of organizations who have streamlined their
            attendance management with ekiliSync's smart location-based
            tracking system.
          </p>
          <div className='mt-4 flex flex-col gap-4 sm:flex-row'>
            <Button
              size='lg'
              variant='secondary'
              className='h-12 rounded-md px-8 text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group'
              onClick={() => {
                navigate({
                  to: '/sign-up',
                })
              }}
            >
              Get Early Access
              <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
            </Button>
          </div>
          <p className='text-primary-foreground/80 mt-4 text-sm flex items-center justify-center gap-2'>
            <Check className='size-4' />
            No setup fees. Free plan available. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

