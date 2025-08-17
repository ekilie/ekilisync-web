import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { IconClock } from '@tabler/icons-react'

interface ComingSoonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message?: string
}

export function ComingSoonDialog({ open, onOpenChange, message }: ComingSoonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconClock /> Coming Soon
          </DialogTitle>
          <DialogDescription>
            {message || "This feature is coming soon. Stay tuned for updates!"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}