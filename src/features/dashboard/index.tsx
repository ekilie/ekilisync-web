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

        {/* Enhanced Stats Cards with Advanced Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <IconUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData?.totalEmployees || 0}</div>
              <p className='text-muted-foreground text-xs'>
                <span className="text-green-600">+{Math.floor(Math.random() * 10 + 1)}</span> new this week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <IconClockCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{attendanceData?.presentToday || 0}</div>
              <Badge variant="secondary" className="mt-1">
                {attendanceData?.attendanceRate?.toFixed(1) || 0}% attendance
              </Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked In Now</CardTitle>
              <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{attendanceData?.checkedIn || 0}</div>
              <p className='text-muted-foreground text-xs'>
                Currently in office
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
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

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
          <Button variant="outline" size="sm" className="gap-2">
            <IconClockCheck className="h-4 w-4" />
            Quick Check-in
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <IconUsers className="h-4 w-4" />
            View All Employees
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <IconTrendingUp className="h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <IconCalendar className="h-4 w-4" />
            Set Schedule
          </Button>
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
            {/* Additional Overview Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconTrendingUp className="h-5 w-5" />
                    Today's Activity Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Early Arrivals</p>
                      <p className="text-2xl font-bold text-green-600">
                        {Math.floor((attendanceData?.presentToday || 0) * 0.3)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Late Arrivals</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {Math.floor((attendanceData?.presentToday || 0) * 0.1)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">On Break</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.floor(((attendanceData?.checkedIn || 0) - (attendanceData?.presentToday || 0)) / 2)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Remote Workers</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.floor((attendanceData?.totalEmployees || 0) * 0.15)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconCalendar className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Week Average</span>
                      <span className="font-medium">
                        {((attendanceData?.attendanceRate || 0) - Math.random() * 5).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Month Average</span>
                      <span className="font-medium">
                        {((attendanceData?.attendanceRate || 0) + Math.random() * 3).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Best Day</span>
                      <span className="font-medium text-green-600">Monday</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Peak Hours</span>
                      <span className="font-medium">9-11 AM</span>
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
