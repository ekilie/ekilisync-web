import { useState, useEffect } from 'react'
import {
  format,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns'
import {
  IconCalendar,
  IconSearch,
  IconClock,
  IconMapPin,
  IconDownload,
  IconFilter,
  IconHistory,
} from '@tabler/icons-react'
import { toast } from 'sonner'
import Api, { Attendance, AttendanceFilters } from '@/lib/api'
import { officeData } from '@/lib/api/authToken'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type DateRange = {
  from: Date
  to: Date
}

export function AttendanceHistory() {
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [filteredAttendances, setFilteredAttendances] = useState<Attendance[]>(
    []
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const [loading, setLoading] = useState(true)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const office = officeData()

  const fetchAttendanceHistory = async () => {
    if (!office?.id) return

    try {
      setLoading(true)
      const filters: AttendanceFilters = {
        startDate: format(dateRange.from, 'yyyy-MM-dd'),
        endDate: format(dateRange.to, 'yyyy-MM-dd'),
        status: statusFilter !== 'all' ? (statusFilter as any) : undefined,
        limit: 100,
      }

      const response = await Api.getAttendancesByOffice(office.id, filters)
      if (response.data?.data) {
        setAttendances(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load attendance history')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAttendanceHistory()
  }, [office?.id, dateRange, statusFilter])

  useEffect(() => {
    let filtered = attendances

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (attendance) =>
          attendance.employee &&
          (`${attendance.employee.firstName} ${attendance.employee.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            attendance.employee.email
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            attendance.employee.position
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            attendance.employee.department
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredAttendances(filtered)
  }, [attendances, searchTerm])

  const setQuickDateRange = (range: string) => {
    const now = new Date()
    switch (range) {
      case 'today':
        setDateRange({ from: now, to: now })
        break
      case 'yesterday': {
        const yesterday = subDays(now, 1)
        setDateRange({ from: yesterday, to: yesterday })
        break
      }
      case 'week': {
        setDateRange({ from: startOfWeek(now), to: endOfWeek(now) })
        break
      }
      case 'month': {
        setDateRange({ from: startOfMonth(now), to: endOfMonth(now) })
        break
      }
      case 'last7': {
        setDateRange({ from: subDays(now, 7), to: now })
        break
      }
      case 'last30': {
        setDateRange({ from: subDays(now, 30), to: now })
        break
      }
    }
  }

  const exportAttendanceHistory = async () => {
    try {
      const csvContent = [
        [
          'Employee Name',
          'Email',
          'Position',
          'Department',
          'Date',
          'Check-in Time',
          'Check-out Time',
          'Status',
          'Hours Worked',
        ].join(','),
        ...filteredAttendances.map((attendance) => {
          const employee = attendance.employee
          const checkInTime = attendance.checkInTime
            ? format(new Date(attendance.checkInTime), 'HH:mm')
            : ''
          const checkOutTime = attendance.checkOutTime
            ? format(new Date(attendance.checkOutTime), 'HH:mm')
            : ''
          const date = format(new Date(attendance.checkInTime), 'yyyy-MM-dd')

          // Calculate hours worked
          let hoursWorked = ''
          if (attendance.checkInTime && attendance.checkOutTime) {
            const start = new Date(attendance.checkInTime)
            const end = new Date(attendance.checkOutTime)
            const diff = end.getTime() - start.getTime()
            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            hoursWorked = `${hours}h ${minutes}m`
          }

          return [
            employee ? `${employee.firstName} ${employee.lastName}` : '',
            employee?.email || '',
            employee?.position || '',
            employee?.department || '',
            date,
            checkInTime,
            checkOutTime,
            attendance.status,
            hoursWorked,
          ].join(',')
        }),
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('hidden', '')
      a.setAttribute('href', url)
      a.setAttribute(
        'download',
        `attendance_history_${format(dateRange.from, 'yyyy-MM-dd')}_to_${format(dateRange.to, 'yyyy-MM-dd')}.csv`
      )
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      toast.success('Attendance history exported successfully')
    } catch (error) {
      toast.error('Failed to export attendance history')
    }
  }

  const calculateHoursWorked = (checkInTime: string, checkOutTime?: string) => {
    if (!checkOutTime) return 'In progress'

    const start = new Date(checkInTime)
    const end = new Date(checkOutTime)
    const diff = end.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  if (loading) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <div className='space-y-4'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='flex items-center space-x-4'>
                <div className='bg-muted h-10 w-10 animate-pulse rounded-full' />
                <div className='flex-1 space-y-2'>
                  <div className='bg-muted h-4 animate-pulse rounded' />
                  <div className='bg-muted h-3 w-3/4 animate-pulse rounded' />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <IconHistory className='h-5 w-5' />
              Attendance History
            </CardTitle>
            <CardDescription>
              View and search through historical attendance records
            </CardDescription>
          </div>
          <Button onClick={exportAttendanceHistory} variant='outline' size='sm'>
            <IconDownload className='mr-2 h-4 w-4' />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
          {/* Search */}
          <div className='relative'>
            <IconSearch className='text-muted-foreground absolute left-3 top-3 h-4 w-4' />
            <Input
              placeholder='Search employees...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-9'
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <IconFilter className='mr-2 h-4 w-4' />
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='present'>Present</SelectItem>
              <SelectItem value='absent'>Absent</SelectItem>
              <SelectItem value='late'>Late</SelectItem>
              <SelectItem value='early_departure'>Early Departure</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range Picker */}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='justify-start text-left font-normal'
              >
                <IconCalendar className='mr-2 h-4 w-4' />
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`
                  : 'Select date range'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <div className='border-b p-3'>
                <div className='grid grid-cols-2 gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuickDateRange('today')}
                  >
                    Today
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuickDateRange('yesterday')}
                  >
                    Yesterday
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuickDateRange('week')}
                  >
                    This Week
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuickDateRange('month')}
                  >
                    This Month
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuickDateRange('last7')}
                  >
                    Last 7 Days
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuickDateRange('last30')}
                  >
                    Last 30 Days
                  </Button>
                </div>
              </div>
              <Calendar
                mode='range'
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to })
                    setCalendarOpen(false)
                  }
                }}
                numberOfMonths={2}
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Attendance Table */}
        <div className='rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Hours Worked</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendances.map((attendance) => (
                <TableRow key={attendance.id}>
                  <TableCell>
                    <div className='flex items-center space-x-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={office?.logoUrl} />
                        <AvatarFallback>
                          {attendance.employee?.firstName[0]}
                          {attendance.employee?.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-medium'>
                          {attendance.employee?.firstName}{' '}
                          {attendance.employee?.lastName}
                        </div>
                        <div className='text-muted-foreground text-sm'>
                          {attendance.employee?.position} •{' '}
                          {attendance.employee?.department}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='text-sm'>
                      {format(new Date(attendance.checkInTime), 'MMM dd, yyyy')}
                    </div>
                    <div className='text-muted-foreground text-xs'>
                      {format(new Date(attendance.checkInTime), 'EEEE')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1 text-sm'>
                      <IconClock className='h-3 w-3' />
                      {format(new Date(attendance.checkInTime), 'HH:mm')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {attendance.checkOutTime ? (
                      <div className='flex items-center gap-1 text-sm'>
                        <IconClock className='h-3 w-3' />
                        {format(new Date(attendance.checkOutTime), 'HH:mm')}
                      </div>
                    ) : (
                      <span className='text-muted-foreground text-sm'>—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>
                      {calculateHoursWorked(
                        attendance.checkInTime,
                        attendance.checkOutTime
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        attendance.status === 'present'
                          ? 'default'
                          : attendance.status === 'late'
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {attendance.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {attendance.checkInLocation ? (
                      <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                        <IconMapPin className='h-3 w-3' />
                        Verified
                      </div>
                    ) : (
                      <span className='text-muted-foreground text-sm'>—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAttendances.length === 0 && (
            <div className='text-muted-foreground py-8 text-center'>
              <IconHistory className='mx-auto mb-2 h-12 w-12 opacity-50' />
              <p>No attendance records found for the selected criteria.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
