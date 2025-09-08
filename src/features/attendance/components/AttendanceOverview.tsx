import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';

import { format } from 'date-fns';

import { IconCalendar, IconMapPin, IconClock, IconTrendingUp, IconUserCheck, IconUserX } from '@tabler/icons-react';
import Api, { OfficeCountResponse, Attendance } from '@/lib/api';
import { officeData } from '@/lib/api/authToken';
import { toast } from 'sonner';

interface AttendanceOverviewProps {
  attendanceData: OfficeCountResponse | null;
}

export function AttendanceOverview({ attendanceData }: AttendanceOverviewProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [recentAttendances, setRecentAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const office = officeData();

  useEffect(() => {
    const fetchRecentAttendances = async () => {
      if (!office?.id) return;
      
      try {
        setLoading(true);
        const startDate = format(selectedDate, 'yyyy-MM-dd');
        const endDate = format(selectedDate, 'yyyy-MM-dd');
        
        const response = await Api.getAttendancesByOffice(office.id, {
          startDate,
          endDate,
          limit: 10
        });
        
        if (response.data?.data) {
          setRecentAttendances(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch recent attendances:', error);
        toast.error('Failed to load recent attendances');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentAttendances();
  }, [office?.id, selectedDate]);

  const attendanceRate = attendanceData?.attendanceRate || 0;
  const totalEmployees = attendanceData?.totalEmployees || 0;
  const presentToday = attendanceData?.presentToday || 0;
  const absentToday = totalEmployees - presentToday;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Today's Summary */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconTrendingUp className="h-5 w-5" />
            Today's Attendance Summary
          </CardTitle>
          <CardDescription>
            Overview of attendance for {format(new Date(), 'EEEE, MMMM do, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Present</span>
                <span className="text-2xl font-bold text-green-600">{presentToday}</span>
              </div>
              <Progress value={(presentToday / totalEmployees) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Absent</span>
                <span className="text-2xl font-bold text-red-600">{absentToday}</span>
              </div>
              <Progress 
                value={(absentToday / totalEmployees) * 100} 
                className="h-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Attendance Rate</span>
              <span className="text-xl font-bold">{attendanceRate.toFixed(1)}%</span>
            </div>
            <Progress value={attendanceRate} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Picker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconCalendar className="h-5 w-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
            disabled={(date) => date > new Date()}
          />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconClock className="h-5 w-5" />
            Recent Activity - {format(selectedDate, 'MMM dd, yyyy')}
          </CardTitle>
          <CardDescription>
            Latest check-ins and check-outs for the selected date
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-1 flex-1">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentAttendances.length > 0 ? (
            <div className="space-y-4">
              {recentAttendances.map((attendance) => (
                <div key={attendance.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    {attendance.status === 'present' ? (
                      <IconUserCheck className="h-8 w-8 text-green-600" />
                    ) : (
                      <IconUserX className="h-8 w-8 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {attendance.employee?.firstName} {attendance.employee?.lastName}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <IconClock className="h-3 w-3" />
                        Check-in: {format(new Date(attendance.checkInTime), 'HH:mm')}
                      </span>
                      {attendance.checkOutTime && (
                        <span className="flex items-center gap-1">
                          <IconClock className="h-3 w-3" />
                          Check-out: {format(new Date(attendance.checkOutTime), 'HH:mm')}
                        </span>
                      )}
                    </div>
                    {attendance.checkInLocation && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <IconMapPin className="h-3 w-3" />
                        Location verified
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={
                        attendance.status === 'present' ? 'default' :
                        attendance.status === 'late' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {attendance.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <IconUserX className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No attendance records found for this date.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}