import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { howItWorksSteps } from '../data'

export default function HowItWorksSection() {
  return (
    <section className='bg-muted/30 relative w-full overflow-hidden py-20 md:py-32'>
      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] bg-[size:4rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]'></div>
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent'></div>

      <div className='relative container px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-16 flex flex-col items-center justify-center space-y-4 text-center'
        >
          <Badge
            className='rounded-md px-4 py-1.5 text-sm font-medium shadow-sm'
            variant='secondary'
          >
            How It Works
          </Badge>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            Simple Setup, Automatic Tracking
          </h2>
          <p className='text-muted-foreground max-w-[800px] md:text-lg'>
            Get your team up and running with ekiliSync in minutes. Our
            location-based technology handles the rest.
          </p>
        </motion.div>

        <div className='relative grid gap-8 md:grid-cols-3 md:gap-12'>
          <div className='via-primary/20 absolute top-1/2 right-0 left-0 z-0 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block'></div>

          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='relative z-10 flex flex-col items-center space-y-4 text-center group'
            >
              <motion.div 
                className='from-primary to-primary/70 text-primary-foreground flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-br text-xl font-bold shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl'
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {step.step}
              </motion.div>
              <h3 className='text-xl font-bold group-hover:text-primary transition-colors duration-200'>{step.title}</h3>
              <p className='text-muted-foreground max-w-sm'>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

