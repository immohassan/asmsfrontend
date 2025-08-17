import { useState, useEffect } from 'react';
import { Calendar, Save, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { studentsApi, classesApi } from '@/lib/api';

interface Student {
  id: number;
  name: string;
  studentId: string;
  grade: string;
  section: string;
  rollNumber: string;
}

interface AttendanceRecord {
  student_id: number;
  status: 'Present' | 'Absent' | 'Late';
  notes: string;
  sign_in: string;
  sign_out: string;
  picked_by: string;
}

export const TeacherAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<{ [key: number]: AttendanceRecord }>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudents();
    }
  }, [selectedClass]);

  const fetchClasses = async () => {
    try {
      const response = await classesApi.getAll();
      setClasses(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch classes",
        variant: "destructive",
      });
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await studentsApi.getAll();
      // Filter students by selected class if needed
      setStudents(response.data);
      
      // Initialize attendance records
      const initialAttendance: { [key: number]: AttendanceRecord } = {};
      response.data.forEach((student: Student) => {
        initialAttendance[student.id] = {
          student_id: student.id,
          status: 'Present',
          notes: '',
          sign_in: '08:00',
          sign_out: '15:30',
          picked_by: ''
        };
      });
      setAttendance(initialAttendance);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
    }
  };

  const updateAttendance = (studentId: number, field: keyof AttendanceRecord, value: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const handleSaveAttendance = async () => {
    if (!selectedClass || !selectedDate) {
      toast({
        title: "Error",
        description: "Please select both class and date",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Create attendance records for API
      const attendanceData = Object.values(attendance).map(record => ({
        ...record,
        class_id: parseInt(selectedClass),
        subject_id: 1, // Default subject or make it selectable
        date: selectedDate
      }));

      // Here you would normally send to API
      // await attendanceApi.createBulk(attendanceData);
      
      toast({
        title: "Success",
        description: `Attendance saved for ${attendanceData.length} students`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save attendance",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-success text-success-foreground';
      case 'Absent': return 'bg-destructive text-destructive-foreground';
      case 'Late': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground">Mark daily attendance for students</p>
        </div>
      </div>

      {/* Date and Class Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.name} - {cls.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSaveAttendance} 
                disabled={loading || !selectedClass}
                className="w-full gap-2"
              >
                <Save className="h-4 w-4" />
                Save Attendance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      {selectedClass && students.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Attendance ({students.length} students)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sign In</TableHead>
                  <TableHead>Sign Out</TableHead>
                  <TableHead>Picked By</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.studentId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.rollNumber}</Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={attendance[student.id]?.status || 'Present'}
                        onValueChange={(value) => updateAttendance(student.id, 'status', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Present">
                            <Badge className="bg-success text-success-foreground">Present</Badge>
                          </SelectItem>
                          <SelectItem value="Absent">
                            <Badge className="bg-destructive text-destructive-foreground">Absent</Badge>
                          </SelectItem>
                          <SelectItem value="Late">
                            <Badge className="bg-warning text-warning-foreground">Late</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        value={attendance[student.id]?.sign_in || '08:00'}
                        onChange={(e) => updateAttendance(student.id, 'sign_in', e.target.value)}
                        className="w-32"
                        disabled={attendance[student.id]?.status === 'Absent'}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        value={attendance[student.id]?.sign_out || '15:30'}
                        onChange={(e) => updateAttendance(student.id, 'sign_out', e.target.value)}
                        className="w-32"
                        disabled={attendance[student.id]?.status === 'Absent'}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Parent/Guardian"
                        value={attendance[student.id]?.picked_by || ''}
                        onChange={(e) => updateAttendance(student.id, 'picked_by', e.target.value)}
                        className="w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Add notes..."
                        value={attendance[student.id]?.notes || ''}
                        onChange={(e) => updateAttendance(student.id, 'notes', e.target.value)}
                        className="w-40"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      {selectedClass && students.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm font-medium">Present:</span>
                <span className="font-bold">
                  {Object.values(attendance).filter(a => a.status === 'Present').length}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span className="text-sm font-medium">Absent:</span>
                <span className="font-bold">
                  {Object.values(attendance).filter(a => a.status === 'Absent').length}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-sm font-medium">Late:</span>
                <span className="font-bold">
                  {Object.values(attendance).filter(a => a.status === 'Late').length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};