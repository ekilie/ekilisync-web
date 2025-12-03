import { useNavigate, useRouter } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Home, ArrowLeft, Lock, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function UnauthorisedError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  
  return (
    <div className='h-svh w-full overflow-hidden bg-gradient-to-br from-background via-background to-primary/5'>
      <div className='relative m-auto flex h-full w-full flex-col items-center justify-center gap-6 px-4'>
        {/* Animated background elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.div
            className='absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl'
            animate={{
              x: [0, 60, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='absolute right-1/3 bottom-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl'
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 22,
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
            className='rounded-full bg-primary/10 p-6 shadow-lg'
          >
            <Lock className='size-16 text-primary' />
          </motion.div>

          {/* Error number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='relative'
          >
            <h1 className='text-[8rem] md:text-[12rem] leading-none font-black bg-gradient-to-br from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent'>
              401
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
              Unauthorized Access
            </h2>
            <p className='text-muted-foreground max-w-md text-base md:text-lg'>
              You need to be authenticated to access this resource.
              <br />
              Please log in with your credentials to continue.
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
              onClick={() => navigate({ to: '/sign-in' })}
              className='group gap-2 shadow-sm hover:shadow-md transition-all'
            >
              <LogIn className='size-4 transition-transform group-hover:translate-x-1' />
              Sign In
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => navigate({ to: '/' })}
              className='group gap-2 shadow-sm hover:shadow-md transition-all'
            >
              <Home className='size-4 transition-transform group-hover:scale-110' />
              Home
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
