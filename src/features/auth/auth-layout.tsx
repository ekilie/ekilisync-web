import AppLogo from "@/components/app-logo"

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <>
    {/* <FloatingPaths position={1} />
    <FloatingPaths position={-1} /> */}
    <div className='bg-primary-foreground container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex gap-2 items-center justify-center'>
          <AppLogo/>
          <h1 className='text-xl font-medium'>ekiliSync</h1>
        </div>
        {children}
      </div>
    </div>
    </>
  )
}
