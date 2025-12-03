import { useNavigate, useRouter } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Home, ArrowLeft, ShieldX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ForbiddenError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  
  return (
    <div className='h-svh w-full overflow-hidden bg-gradient-to-br from-background via-background to-destructive/5'>
      <div className='relative m-auto flex h-full w-full flex-col items-center justify-center gap-6 px-4'>
        {/* Animated background elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.div
            className='absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-destructive/10 blur-3xl'
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-destructive/10 blur-3xl'
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 20,
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
            className='rounded-full bg-destructive/10 p-6 shadow-lg'
          >
            <ShieldX className='size-16 text-destructive' />
          </motion.div>

          {/* Error number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='relative'
          >
            <h1 className='text-[8rem] md:text-[12rem] leading-none font-black bg-gradient-to-br from-destructive via-destructive/90 to-destructive/70 bg-clip-text text-transparent'>
              403
            </h1>
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-destructive/20 via-transparent to-destructive/20 blur-2xl'
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
              Access Forbidden
            </h2>
            <p className='text-muted-foreground max-w-md text-base md:text-lg'>
              You don't have the necessary permissions to access this resource.
              <br />
              If you believe this is an error, please contact support.
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
