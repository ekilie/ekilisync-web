const TrustedBy = () => {
  return (
    <section className='bg-muted/30 w-full border-y py-12'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <p className='text-muted-foreground text-sm font-medium'>
            Trusted by organizations worldwide
          </p>
          <div className='flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16'>
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`/placeholder.svg?height=60&width=120`}
                alt={`Company logo ${i}`}
                width={120}
                height={60}
                className='h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0'
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
