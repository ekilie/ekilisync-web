import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useEffect, useState } from 'react'
import Api, { OfficeCountResponse } from '@/lib/api'
import { CurrentUser, officeData } from '@/lib/api/authToken'
import { IconClockCheck, IconUsers, IconTrendingUp, IconCalendar } from '@tabler/icons-react'
import { toast } from 'sonner'

// Import attendance components
import { AttendanceOverview } from '@/features/attendance/components/AttendanceOverview'
import { AttendanceEmployees } from '@/features/attendance/components/AttendanceEmployees'
import { AttendanceHistory } from '@/features/attendance/components/AttendanceHistory'
import { AttendanceReports } from '@/features/attendance/components/AttendanceReports'

export default function Dashboard() {
  const [attendanceData, setAttendanceData] = useState<OfficeCountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const office = officeData();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!office?.id) return;
      
      try {
        setLoading(true);
        const data = await Api.getOfficeCount(office.id);
        setAttendanceData(data);
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
        toast.error('Failed to load attendance data');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [office?.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
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
      <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive attendance management and analytics
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button>Export Report</Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <IconUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData?.totalEmployees || 0}</div>
              <p className='text-muted-foreground text-xs'>
                +5 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <IconClockCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData?.presentToday || 0}</div>
              <Badge variant="secondary" className="mt-1">
                {attendanceData?.attendanceRate?.toFixed(1) || 0}% rate
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked In</CardTitle>
              <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData?.checkedIn || 0}</div>
              <p className='text-muted-foreground text-xs'>
                74% attendance rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <IconCalendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attendanceData?.attendanceRate?.toFixed(1) || 0}%
              </div>
              <Badge 
                variant={
                  (attendanceData?.attendanceRate || 0) >= 90 
                    ? "default" 
                    : (attendanceData?.attendanceRate || 0) >= 75 
                    ? "secondary" 
                    : "destructive"
                }
                className="mt-1"
              >
                {(attendanceData?.attendanceRate || 0) >= 90 
                  ? "Excellent" 
                  : (attendanceData?.attendanceRate || 0) >= 75 
                  ? "Good" 
                  : "Needs Improvement"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs with Attendance Management */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList className="grid w-full grid-cols-5">
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
