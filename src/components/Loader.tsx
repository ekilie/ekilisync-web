const Loader = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='loader relative h-12 w-12 animate-spin'>
        <div className='circle absolute top-0 left-0 h-5 w-5 rounded-full bg-gray-800 dark:bg-gray-200'></div>
        <div className='circle absolute top-0 right-0 h-5 w-5 rounded-full bg-gray-800 dark:bg-gray-200'></div>
        <div className='circle absolute right-0 bottom-0 h-5 w-5 rounded-full bg-gray-800 dark:bg-gray-200'></div>
        <div className='circle absolute bottom-0 left-0 h-5 w-5 rounded-full bg-gray-800 dark:bg-gray-200'></div>
      </div>
    </div>
  )
}

export default Loader
