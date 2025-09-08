import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { AttendanceOverview } from './components/AttendanceOverview';
import { AttendanceEmployees } from './components/AttendanceEmployees';
import { AttendanceHistory } from './components/AttendanceHistory';
import { AttendanceReports } from './components/AttendanceReports';
import Api, { OfficeCountResponse } from '@/lib/api';
import { officeData } from '@/lib/api/authToken';
import { IconClockCheck, IconUsers, IconTrendingUp, IconCalendar } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function AttendanceFeature() {
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
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Attendance Management</h2>
            <p className="text-muted-foreground">
              Track employee attendance, manage check-ins, and view reports
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <IconUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData?.totalEmployees || 0}</div>
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

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <AttendanceOverview attendanceData={attendanceData} />
          </TabsContent>

          <TabsContent value="employees" className="space-y-4">
            <AttendanceEmployees />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <AttendanceHistory />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <AttendanceReports />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  );
}