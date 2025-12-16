export default function LandingFooter() {
  return (
    <footer className='bg-background/95 w-full border-t border-border/40 backdrop-blur-sm'>
      <div className='container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16'>
        <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2 font-bold'>
              <div className='from-primary to-primary/70 text-primary-foreground flex size-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm'>
                E
              </div>
              <span className='bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>ekiliSync</span>
            </div>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              Smart attendance tracking that works automatically. Streamline
              your workforce management with location-based technology.
            </p>
            <div className='flex gap-4'>
              
              <a
                href='https://linkedin.com/company/ekilie'
                className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110'
                aria-label='LinkedIn'
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
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#pricing'
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href='/mobile-app'
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
                >
                  Mobile App
                </a>
              </li>
              <li>
                <a
                  href='/api'
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
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
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href='/help-center'
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href='/blog'
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='/support'
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
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
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='/careers'
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href='/policies'
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='/terms'
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block'
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
  )
}

