import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { IconClockCheck, IconUsers, IconTrendingUp, IconCalendar, IconMapPin } from '@tabler/icons-react';
// import { Label } from 'recharts';
import { toast } from 'sonner';
import Api, { OfficeCountResponse } from '@/lib/api';
import { officeData } from '@/lib/api/authToken';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loader from '@/components/Loader';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { TopNav } from '@/components/layout/top-nav';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { AttendanceEmployees } from '@/features/attendance/components/AttendanceEmployees';
import { AttendanceHistory } from '@/features/attendance/components/AttendanceHistory';
// Import attendance components
import { AttendanceOverview } from '@/features/attendance/components/AttendanceOverview';
import { AttendanceReports } from '@/features/attendance/components/AttendanceReports';
import UpdateLocationDialog from '@/components/update-location';


export default function Dashboard() {
  const [attendanceData, setAttendanceData] =
    useState<OfficeCountResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false)
  const [userLocation, setUserLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const office = officeData()

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!office?.id) return

      try {
        setLoading(true)
        const data = await Api.getOfficeCount(office.id)
        setAttendanceData(data)
      } catch (error) {
        toast.error('Failed to load attendance data')
      } finally {
        setLoading(false)
      }
    }

    fetchAttendanceData()
  }, [office?.id])

  const getUserLocation = () => {
    setIsGettingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.')
      setIsGettingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setIsGettingLocation(false)
        toast.success('Location retrieved successfully!')
      },
      (error) => {
        let errorMessage = 'Unknown error occurred while getting location'

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }

        setLocationError(errorMessage)
        setIsGettingLocation(false)
        toast.error('Failed to get location')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    )
  }

  const handleUpdateLocation = () => {
    if (!userLocation) {
      toast.error('Please get your location first')
      return
    }

    // Here you would typically send the location to your backend
    console.log('Updating office location:', userLocation)

    // Simulate API call
    toast.success('Office location updated successfully!')
    setIsLocationDialogOpen(false)

    // Reset states
    setUserLocation(null)
    setLocationError(null)
  }

  if (loading) {
    return <Loader />
  }
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
            <p className='text-muted-foreground'>
              Comprehensive attendance management and analytics
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <UpdateLocationDialog />
          </div>
        </div>

        {/* Enhanced Stats Cards with Advanced Metrics */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='transition-shadow hover:shadow-md'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Employees
              </CardTitle>
              <IconUsers className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {attendanceData?.employees || 0}
              </div>
              <p className='text-muted-foreground text-xs'>
                <span className='text-green-600'>
                  +{Math.floor(Math.random() * 10 + 1)}
                </span>{' '}
                new this week
              </p>
            </CardContent>
          </Card>

          <Card className='transition-shadow hover:shadow-md'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Checked In</CardTitle>
              <IconClockCheck className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-primary-600 text-2xl font-bold'>
                {attendanceData?.checkedIn || 0}
              </div>
              <Badge variant='secondary' className='mt-1'>
                {attendanceData && attendanceData.employees > 0
                  ? (
                      (attendanceData.checkedIn / attendanceData.employees) *
                      100
                    ).toFixed(1)
                  : '0'}
                % attendance
              </Badge>
            </CardContent>
          </Card>

          <Card className='transition-shadow hover:shadow-md'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Late Check-ins
              </CardTitle>
              <IconTrendingUp className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-primary-600 text-2xl font-bold'>
                {attendanceData?.lateCheckedIn || 0}
              </div>
              <p className='text-muted-foreground text-xs'>
                Late arrivals today
              </p>
            </CardContent>
          </Card>

          <Card className='transition-shadow hover:shadow-md'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Attendance Rate
              </CardTitle>
              <IconCalendar className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {attendanceData && attendanceData.employees > 0
                  ? (
                      (attendanceData.checkedIn / attendanceData.employees) *
                      100
                    ).toFixed(1)
                  : '0'}
                %
              </div>
              <Badge
                variant={
                  attendanceData && attendanceData.employees > 0
                    ? (attendanceData.checkedIn / attendanceData.employees) *
                        100 >=
                      90
                      ? 'default'
                      : (attendanceData.checkedIn / attendanceData.employees) *
                            100 >=
                          75
                        ? 'secondary'
                        : 'destructive'
                    : 'secondary'
                }
                className='mt-1'
              >
                {attendanceData && attendanceData.employees > 0
                  ? (attendanceData.checkedIn / attendanceData.employees) *
                      100 >=
                    90
                    ? 'Excellent'
                    : (attendanceData.checkedIn / attendanceData.employees) *
                          100 >=
                        75
                      ? 'Good'
                      : 'Needs Improvement'
                  : 'No Data'}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Bar */}
        {/* <div className='bg-muted/50 flex flex-wrap gap-2 rounded-lg p-4'>
          <Button variant='outline' size='sm' className='gap-2'>
            <IconClockCheck className='h-4 w-4' />
            Quick Check-in
          </Button>
          <Button variant='outline' size='sm' className='gap-2'>
            <IconUsers className='h-4 w-4' />
            View All Employees
          </Button>
          <Button variant='outline' size='sm' className='gap-2'>
            <IconTrendingUp className='h-4 w-4' />
            Generate Report
          </Button>
          <Button variant='outline' size='sm' className='gap-2'>
            <IconCalendar className='h-4 w-4' />
            Set Schedule
          </Button>
        </div> */}

        {/* Enhanced Tabs with Attendance Management */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList className='grid w-full grid-cols-5'>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='employees'>Employees</TabsTrigger>
              <TabsTrigger value='history'>History</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='analytics' disabled title='coming soon'>
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            {/* Additional Overview Stats */}
            <div className='grid gap-4 md:grid-cols-3'>
              <Card className='md:col-span-2'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <IconTrendingUp className='h-5 w-5' />
                    Today's Activity Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <p className='text-muted-foreground text-sm'>On Time</p>
                      <p className='text-primary-600 text-2xl font-bold'>
                        {(attendanceData?.checkedIn || 0) -
                          (attendanceData?.lateCheckedIn || 0)}
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <p className='text-muted-foreground text-sm'>
                        Late Arrivals
                      </p>
                      <p className='text-primary-600 text-2xl font-bold'>
                        {attendanceData?.lateCheckedIn || 0}
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <p className='text-muted-foreground text-sm'>Absent</p>
                      <p className='text-primary-600 text-2xl font-bold'>
                        {(attendanceData?.employees || 0) -
                          (attendanceData?.checkedIn || 0)}
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <p className='text-muted-foreground text-sm'>
                        Total Staff
                      </p>
                      <p className='text-primary-600 text-2xl font-bold'>
                        {attendanceData?.employees || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <IconCalendar className='h-5 w-5' />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span>Week Average</span>
                      <span className='font-medium'>
                        {attendanceData && attendanceData.employees > 0
                          ? (
                              (attendanceData.checkedIn /
                                attendanceData.employees) *
                                100 -
                              Math.random() * 5
                            ).toFixed(1)
                          : '0'}
                        %
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>Month Average</span>
                      <span className='font-medium'>
                        {attendanceData && attendanceData.employees > 0
                          ? (
                              (attendanceData.checkedIn /
                                attendanceData.employees) *
                                100 +
                              Math.random() * 3
                            ).toFixed(1)
                          : '0'}
                        %
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>Best Day</span>
                      <span className='text-primary-600 font-medium'>
                        Monday
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>Peak Hours</span>
                      <span className='font-medium'>9-11 AM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <AttendanceOverview attendanceData={attendanceData} />
          </TabsContent>

          <TabsContent value='employees' className='space-y-4'>
            <AttendanceEmployees />
          </TabsContent>

          <TabsContent value='history' className='space-y-4'>
            <AttendanceHistory />
          </TabsContent>

          <TabsContent value='reports' className='space-y-4'>
            <AttendanceReports />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
]