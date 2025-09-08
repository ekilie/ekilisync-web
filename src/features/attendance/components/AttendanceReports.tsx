import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

import { IconCalendar, IconTrendingUp, IconTrendingDown, IconDownload, IconChartBar, IconChartPie } from '@tabler/icons-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Api, { AttendanceReport } from '@/lib/api';
import { officeData } from '@/lib/api/authToken';
import { toast } from 'sonner';

type DateRange = {
  from: Date;
  to: Date;
};

type ReportType = 'daily' | 'weekly' | 'monthly';

interface ChartData {
  date: string;
  present: number;
  absent: number;
  late: number;
  total: number;
  rate: number;
}

interface DepartmentStats {
  department: string;
  present: number;
  absent: number;
  rate: number;
}

export function AttendanceReports() {
  const [reportData, setReportData] = useState<AttendanceReport[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [reportType, setReportType] = useState<ReportType>('weekly');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date())
  });
  const [loading, setLoading] = useState(true);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const office = officeData();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const fetchReportData = async () => {
    if (!office?.id) return;
    
    try {
      setLoading(true);
      
      // Generate date intervals based on report type
      const dates = generateDateIntervals(dateRange.from, dateRange.to, reportType);
      
      const reports = await Promise.all(
        dates.map(async (dateInterval) => {
          try {
            const response = await Api.getAttendanceReport(
              office.id,
              format(dateInterval.start, 'yyyy-MM-dd'),
              format(dateInterval.end, 'yyyy-MM-dd')
            );
            return response.data;
          } catch (error) {
            console.error('Failed to fetch report for date:', dateInterval, error);
            return null;
          }
        })
      );

      const validReports = reports.filter(Boolean) as AttendanceReport[];
      setReportData(validReports);
      
      // Process data for charts
      processChartData(validReports);
      processDepartmentStats(validReports);
      
    } catch (error) {
      console.error('Failed to fetch report data:', error);
      toast.error('Failed to load attendance reports');
    } finally {
      setLoading(false);
    }
  };

  const generateDateIntervals = (from: Date, to: Date, type: ReportType) => {
    const intervals: { start: Date; end: Date }[] = [];
    
    if (type === 'daily') {
      const days = eachDayOfInterval({ start: from, end: to });
      days.forEach(day => {
        intervals.push({ start: day, end: day });
      });
    } else if (type === 'weekly') {
      let current = startOfWeek(from);
      const end = endOfWeek(to);
      
      while (current <= end) {
        intervals.push({ 
          start: current, 
          end: endOfWeek(current) 
        });
        current = new Date(current.getTime() + 7 * 24 * 60 * 60 * 1000);
      }
    } else if (type === 'monthly') {
      let current = startOfMonth(from);
      const end = endOfMonth(to);
      
      while (current <= end) {
        intervals.push({ 
          start: current, 
          end: endOfMonth(current) 
        });
        current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
      }
    }
    
    return intervals;
  };

  const processChartData = (reports: AttendanceReport[]) => {
    const chartData: ChartData[] = reports.map(report => ({
      date: format(new Date(report.date), reportType === 'daily' ? 'MMM dd' : reportType === 'weekly' ? 'MMM dd' : 'MMM yyyy'),
      present: report.presentEmployees,
      absent: report.absentEmployees,
      late: report.lateEmployees,
      total: report.totalEmployees,
      rate: report.attendanceRate
    }));
    
    setChartData(chartData);
  };

  const processDepartmentStats = (reports: AttendanceReport[]) => {
    const departmentMap = new Map<string, { present: number; total: number }>();
    
    reports.forEach(report => {
      report.attendances.forEach(attendance => {
        if (attendance.employee) {
          const dept = attendance.employee.department;
          const current = departmentMap.get(dept) || { present: 0, total: 0 };
          
          current.total++;
          if (attendance.status === 'present') {
            current.present++;
          }
          
          departmentMap.set(dept, current);
        }
      });
    });
    
    const stats: DepartmentStats[] = Array.from(departmentMap.entries()).map(([dept, data]) => ({
      department: dept,
      present: data.present,
      absent: data.total - data.present,
      rate: (data.present / data.total) * 100
    }));
    
    setDepartmentStats(stats);
  };

  useEffect(() => {
    fetchReportData();
  }, [office?.id, dateRange, reportType]);

  const setQuickDateRange = (range: string) => {
    const now = new Date();
    switch (range) {
      case 'week':
        setDateRange({ from: startOfWeek(now), to: endOfWeek(now) });
        break;
      case 'month':
        setDateRange({ from: startOfMonth(now), to: endOfMonth(now) });
        break;
      case 'lastWeek':
        const lastWeekStart = startOfWeek(subDays(now, 7));
        const lastWeekEnd = endOfWeek(subDays(now, 7));
        setDateRange({ from: lastWeekStart, to: lastWeekEnd });
        break;
      case 'lastMonth':
        const lastMonthStart = startOfMonth(subDays(now, 30));
        const lastMonthEnd = endOfMonth(subDays(now, 30));
        setDateRange({ from: lastMonthStart, to: lastMonthEnd });
        break;
      case 'quarter':
        const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        const quarterEnd = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 + 3, 0);
        setDateRange({ from: quarterStart, to: quarterEnd });
        break;
      case 'year':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const yearEnd = new Date(now.getFullYear(), 11, 31);
        setDateRange({ from: yearStart, to: yearEnd });
        break;
    }
  };

  const exportReport = async () => {
    try {
      const csvContent = [
        ['Date', 'Total Employees', 'Present', 'Absent', 'Late', 'Attendance Rate (%)'].join(','),
        ...reportData.map(report => [
          format(new Date(report.date), 'yyyy-MM-dd'),
          report.totalEmployees,
          report.presentEmployees,
          report.absentEmployees,
          report.lateEmployees,
          report.attendanceRate.toFixed(2)
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `attendance_report_${format(dateRange.from, 'yyyy-MM-dd')}_to_${format(dateRange.to, 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Report exported successfully');
    } catch (error) {
      console.error('Failed to export report:', error);
      toast.error('Failed to export report');
    }
  };

  // Calculate summary statistics
  const totalWorkingDays = reportData.length;
  const averageAttendanceRate = reportData.length > 0 
    ? reportData.reduce((sum, report) => sum + report.attendanceRate, 0) / reportData.length 
    : 0;
  const bestDay = reportData.reduce((best, current) => 
    current.attendanceRate > (best?.attendanceRate || 0) ? current : best, reportData[0]);
  const worstDay = reportData.reduce((worst, current) => 
    current.attendanceRate < (worst?.attendanceRate || 100) ? current : worst, reportData[0]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="h-64 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <IconChartBar className="h-5 w-5" />
                Attendance Reports & Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive attendance analysis and insights
              </CardDescription>
            </div>
            <Button onClick={exportReport} variant="outline" size="sm">
              <IconDownload className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Report Type */}
            <Select value={reportType} onValueChange={(value: ReportType) => setReportType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Report</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
              </SelectContent>
            </Select>

            {/* Quick Date Ranges */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => setQuickDateRange('week')}>
                This Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickDateRange('month')}>
                This Month
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickDateRange('lastWeek')}>
                Last Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickDateRange('quarter')}>
                Quarter
              </Button>
            </div>

            {/* Custom Date Range */}
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <IconCalendar className="mr-2 h-4 w-4" />
                  {dateRange.from && dateRange.to ? (
                    `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`
                  ) : (
                    'Custom range'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to });
                      setCalendarOpen(false);
                    }
                  }}
                  numberOfMonths={2}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reporting Period</CardTitle>
            <IconCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkingDays}</div>
            <p className="text-xs text-muted-foreground">
              {reportType} periods analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAttendanceRate.toFixed(1)}%</div>
            <Progress value={averageAttendanceRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Day</CardTitle>
            <IconTrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {bestDay?.attendanceRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {bestDay && format(new Date(bestDay.date), 'MMM dd, yyyy')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest Day</CardTitle>
            <IconTrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {worstDay?.attendanceRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {worstDay && format(new Date(worstDay.date), 'MMM dd, yyyy')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Attendance Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Daily attendance patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="#22c55e" name="Present" />
                <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
                <Bar dataKey="late" stackId="a" fill="#f59e0b" name="Late" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Rate Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate Trend</CardTitle>
            <CardDescription>Attendance percentage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Attendance Rate']} />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Statistics */}
      {departmentStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconChartPie className="h-5 w-5" />
              Department-wise Attendance
            </CardTitle>
            <CardDescription>
              Attendance performance by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ department, rate }) => `${department}: ${rate.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="present"
                  >
                    {departmentStats.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-4">
                {departmentStats.map((dept) => (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{dept.department}</span>
                      <span className="text-sm text-muted-foreground">
                        {dept.rate.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={dept.rate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Present: {dept.present}</span>
                      <span>Absent: {dept.absent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}