'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import Api, { OfficeCountResponse } from '@/lib/api'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconUsers, IconUserCheck, IconAlertCircle } from '@tabler/icons-react'
import { Office } from '../data/schema'

interface Props {
  currentRow: Office
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OfficesViewDialog({ currentRow, open, onOpenChange }: Props) {
  const [stats, setStats] = useState<OfficeCountResponse | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && currentRow) {
      fetchStats()
    }
  }, [open, currentRow])

  async function fetchStats() {
    setLoading(true)
    try {
      const data = await Api.getOfficeCount(currentRow.id)
      setStats(data)
    } catch (error: any) {
      toast.error('Failed to load office statistics')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{currentRow.name}</DialogTitle>
          <DialogDescription>Office details and statistics</DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground mb-1'>
                Email
              </h4>
              <p className='text-sm'>{currentRow.email}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground mb-1'>
                Phone
              </h4>
              <p className='text-sm'>{currentRow.phoneNumber}</p>
            </div>
          </div>
          <div>
            <h4 className='text-sm font-medium text-muted-foreground mb-1'>
              Address
            </h4>
            <p className='text-sm'>{currentRow.address}</p>
          </div>
          {(currentRow.latitude && currentRow.longitude) && (
            <div>
              <h4 className='text-sm font-medium text-muted-foreground mb-1'>
                Location
              </h4>
              <Badge variant='secondary'>
                {currentRow.latitude.toFixed(4)}, {currentRow.longitude.toFixed(4)}
              </Badge>
            </div>
          )}
          
          {stats && (
            <div className='pt-4 border-t'>
              <h4 className='text-sm font-semibold mb-3'>Office Statistics</h4>
              <div className='grid gap-4 md:grid-cols-3'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Employees
                    </CardTitle>
                    <IconUsers className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{stats.employees}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Checked In
                    </CardTitle>
                    <IconUserCheck className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{stats.checkedIn}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Late Check-ins
                    </CardTitle>
                    <IconAlertCircle className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{stats.lateCheckedIn}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {loading && (
            <div className='text-center text-sm text-muted-foreground'>
              Loading statistics...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
