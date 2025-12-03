import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ChevronRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AppLogo from '@/components/app-logo'

export default function LandingHeader() {
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
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-500 ${isScrolled ? 'bg-background/90 shadow-md border-b border-border/40' : 'bg-transparent'}`}
    >
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2 font-bold transition-transform hover:scale-105'>
          <AppLogo />
          <span className='bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>ekiliSync</span>
        </div>
        <nav className='hidden gap-8 md:flex'>
          <a
            href='#features'
            className='text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-200 hover:scale-105 relative group'
          >
            Features
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full'></span>
          </a>
          <a
            href='#pricing'
            className='text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-200 hover:scale-105 relative group'
          >
            Pricing
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full'></span>
          </a>
          <a
            href='#faq'
            className='text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-200 hover:scale-105 relative group'
          >
            FAQ
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full'></span>
          </a>
        </nav>
        <div className='hidden items-center gap-4 md:flex'>
          <a
            href='sign-in'
            className='py-2 text-sm font-medium'
            onClick={() => setMobileMenuOpen(false)}
          >
            Log in
          </a>
          <Button
            className='rounded-md shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105'
            onClick={() => {
              navigate({
                to: '/sign-up',
              })
            }}
          >
            Get Started
            <ChevronRight className='ml-1 size-4 transition-transform group-hover:translate-x-1' />
          </Button>
        </div>
        <div className='flex items-center gap-4 md:hidden'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='transition-all duration-200 hover:scale-105'
          >
            {mobileMenuOpen ? (
              <X className='size-5 transition-transform duration-200' />
            ) : (
              <Menu className='size-5 transition-transform duration-200' />
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
                className='rounded-md shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105'
                onClick={() => {
                  navigate({
                    to: '/sign-up',
                  })
                }}
              >
                Get Started
                <ChevronRight className='ml-1 size-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

