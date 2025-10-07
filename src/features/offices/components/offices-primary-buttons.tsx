import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { useOffices } from '../context/offices-context'

export function OfficesPrimaryButtons() {
  const { setOpen } = useOffices()

  return (
    <div className='flex gap-2'>
      <Button onClick={() => setOpen('add')} className='gap-2'>
        <IconPlus size={18} />
        <span className='hidden sm:inline-block'>Add Office</span>
      </Button>
    </div>
  )
}
