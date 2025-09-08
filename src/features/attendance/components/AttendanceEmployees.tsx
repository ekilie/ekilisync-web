import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { IconSearch, IconUserCheck, IconUserX, IconClock, IconFilter, IconRefresh } from '@tabler/icons-react';
import Api, { Employee, Attendance, CreateAttendanceDto, UpdateAttendanceDto } from '@/lib/api';
import { officeData } from '@/lib/api/authToken';
import { toast } from 'sonner';
import { format } from 'date-fns';

export function AttendanceEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const office = officeData();

  const fetchData = async () => {
    if (!office?.id) return;
    
    try {
      setLoading(true);
      const [employeesData, attendancesData] = await Promise.all([
        Api.getEmployeesByOffice(office.id),
        Api.getAttendancesByOffice(office.id, {
          startDate: format(new Date(), 'yyyy-MM-dd'),
          endDate: format(new Date(), 'yyyy-MM-dd')
        })
      ]);
      
      setEmployees(employeesData);
      if (attendancesData.data?.data) {
        setAttendances(attendancesData.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load employee data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [office?.id]);

  useEffect(() => {
    let filtered = employees;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(employee =>
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by attendance status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(employee => {
        const attendance = attendances.find(a => a.employeeId === employee.id);
        if (statusFilter === 'present') return attendance;
        if (statusFilter === 'absent') return !attendance;
        if (statusFilter === 'checked-in') return attendance && !attendance.checkOutTime;
        if (statusFilter === 'checked-out') return attendance && attendance.checkOutTime;
        return true;
      });
    }

    setFilteredEmployees(filtered);
  }, [employees, attendances, searchTerm, statusFilter]);

  const getEmployeeAttendance = (employeeId: string) => {
    return attendances.find(a => a.employeeId === employeeId);
  };

  const handleCheckIn = async (employee: Employee) => {
    if (!office?.id) return;
    
    try {
      setActionLoading(employee.id);
      
      // Get current location
      const location = await Api.getCurrentLocation();
      
      // Validate location if office has coordinates
      if (office.latitude && office.longitude) {
        const isWithinRange = Api.isWithinRange(
          location.latitude,
          location.longitude,
          office.latitude,
          office.longitude,
          100 // 100 meters
        );
        
        if (!isWithinRange) {
          toast.error('You must be within 100 meters of the office to check in');
          return;
        }
      }

      const checkInData: CreateAttendanceDto = {
        employeeId: employee.id,
        officeId: office.id,
        checkInTime: new Date().toISOString(),
        checkInLocation: location
      };

      await Api.createAttendance(checkInData);
      toast.success(`${employee.firstName} checked in successfully`);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Check-in failed:', error);
      toast.error('Failed to check in. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCheckOut = async (employee: Employee, attendanceId: string) => {
    try {
      setActionLoading(employee.id);
      
      // Get current location
      const location = await Api.getCurrentLocation();

      const checkOutData: UpdateAttendanceDto = {
        checkOutTime: new Date().toISOString(),
        checkOutLocation: location
      };

      await Api.updateAttendance(attendanceId, checkOutData);
      toast.success(`${employee.firstName} checked out successfully`);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Check-out failed:', error);
      toast.error('Failed to check out. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const getEmployeeStatus = (employee: Employee) => {
    const attendance = getEmployeeAttendance(employee.id);
    if (!attendance) return { status: 'absent', color: 'destructive' as const };
    if (attendance.checkOutTime) return { status: 'checked-out', color: 'secondary' as const };
    return { status: 'present', color: 'default' as const };
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <IconUserCheck className="h-5 w-5" />
              Employee Attendance
            </CardTitle>
            <CardDescription>
              Manage employee check-ins and check-outs for today
            </CardDescription>
          </div>
          <Button onClick={fetchData} variant="outline" size="sm">
            <IconRefresh className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <IconFilter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="checked-in">Checked In</SelectItem>
              <SelectItem value="checked-out">Checked Out</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Employee Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead>Check-out Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => {
                const attendance = getEmployeeAttendance(employee.id);
                const status = getEmployeeStatus(employee);
                const isLoading = actionLoading === employee.id;

                return (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={office?.logoUrl} />
                          <AvatarFallback>
                            {employee.firstName[0]}{employee.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.position}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.color}>
                        {status.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {attendance?.checkInTime ? (
                        <div className="flex items-center gap-1 text-sm">
                          <IconClock className="h-3 w-3" />
                          {format(new Date(attendance.checkInTime), 'HH:mm')}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {attendance?.checkOutTime ? (
                        <div className="flex items-center gap-1 text-sm">
                          <IconClock className="h-3 w-3" />
                          {format(new Date(attendance.checkOutTime), 'HH:mm')}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!attendance ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                size="sm" 
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <IconUserCheck className="h-4 w-4 mr-1" />
                                Check In
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Check-in</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Check in {employee.firstName} {employee.lastName}? 
                                  This will record their arrival time and location.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleCheckIn(employee)}>
                                  Check In
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : !attendance.checkOutTime ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                disabled={isLoading}
                              >
                                <IconUserX className="h-4 w-4 mr-1" />
                                Check Out
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Check-out</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Check out {employee.firstName} {employee.lastName}? 
                                  This will record their departure time and location.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleCheckOut(employee, attendance.id)}>
                                  Check Out
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredEmployees.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <IconUserX className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No employees found matching your criteria.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}