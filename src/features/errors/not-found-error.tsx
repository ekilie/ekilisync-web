import { useNavigate, useRouter } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Home, ArrowLeft, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  
  return (
    <div className='h-svh w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted/20'>
      <div className='relative m-auto flex h-full w-full flex-col items-center justify-center gap-6 px-4'>
        {/* Animated background elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.div
            className='absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl'
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl'
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Main content */}
        <div className='relative z-10 flex flex-col items-center gap-6 text-center'>
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className='rounded-full bg-muted p-6 shadow-lg'
          >
            <SearchX className='size-16 text-primary' />
          </motion.div>

          {/* Error number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='relative'
          >
            <h1 className='text-[8rem] md:text-[12rem] leading-none font-black bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent'>
              404
            </h1>
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-2xl'
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='space-y-2'
          >
            <h2 className='text-2xl md:text-3xl font-bold text-foreground'>
              Page Not Found
            </h2>
            <p className='text-muted-foreground max-w-md text-base md:text-lg'>
              Oops! The page you're looking for doesn't exist or might have been moved.
              <br />
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className='mt-4 flex flex-col sm:flex-row gap-3'
          >
            <Button
              variant='outline'
              size='lg'
              onClick={() => history.go(-1)}
              className='group gap-2 shadow-sm hover:shadow-md transition-all'
            >
              <ArrowLeft className='size-4 transition-transform group-hover:-translate-x-1' />
              Go Back
            </Button>
            <Button
              size='lg'
              onClick={() => navigate({ to: '/' })}
              className='group gap-2 shadow-sm hover:shadow-md transition-all'
            >
              <Home className='size-4 transition-transform group-hover:scale-110' />
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
