'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Role } from '../data/schema'

interface Props {
  currentRow: Role
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RolesViewDialog({ currentRow, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Badge variant='default' className='capitalize'>
              {currentRow.name}
            </Badge>
            Role Details
          </DialogTitle>
          <DialogDescription>View role information and permissions</DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-muted-foreground mb-2'>
              Role ID
            </h4>
            <p className='text-sm'>{currentRow.id}</p>
          </div>
          <div>
            <h4 className='text-sm font-medium text-muted-foreground mb-2'>
              Created At
            </h4>
            <p className='text-sm'>{currentRow.createdAt.toLocaleString()}</p>
          </div>
          <div>
            <h4 className='text-sm font-medium text-muted-foreground mb-2'>
              Last Updated
            </h4>
            <p className='text-sm'>{currentRow.updatedAt.toLocaleString()}</p>
          </div>
          <div>
            <h4 className='text-sm font-medium text-muted-foreground mb-2'>
              Permissions ({currentRow.permissions.length})
            </h4>
            <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
              <div className='space-y-2'>
                {currentRow.permissions.length > 0 ? (
                  currentRow.permissions.map((permission, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-2 rounded-sm bg-secondary/50'
                    >
                      <span className='text-sm'>{permission}</span>
                      <Badge variant='outline' className='ml-2'>
                        {permission.split('.')[0]}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className='text-sm text-muted-foreground text-center py-4'>
                    No permissions assigned
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
