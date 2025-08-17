import { useState, useEffect } from 'react';
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TeacherModal } from '@/components/modals/TeacherModal';
import { teachersApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department_id: number;   
  department: string;      
  role_id: number;        
  role: string; 
  designation: string;
  employeeId: string;
  joinDate: string;
  status: string;
  address: string;
  avatar?: string;
}

export const AdminTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<any[]>([]);
const [departments, setDepartments] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    const filtered = teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [teachers, searchTerm]);

const fetchTeachers = async () => {
  setLoading(true);
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/teachers");
        setRoles(response.data.roles);
    setDepartments(response.data.departments);
    console.log(response.data);
    const mappedTeachers: Teacher[] = response.data.teachers.map((item: any) => ({
      id: item.id,
      name: item.user?.name || '',
      email: item.user?.email || '',
      phone: item.user?.phone || '',
      designation: item.designation || '', // You can change if subject is different
      department_id: item.department?.id || 0,        
      department: item.department?.name || '',        
      role_id: item.user?.role?.id || 0,              
      role: item.user?.role?.name || '', 
      employeeId: item.user_id?.toString() || '',
      joinDate: item.created_at,
      avatar: '', // If you have avatar URL in API, map it here
      address: item.user.address, // If you have avatar URL in API, map it here
    }));

    setTeachers(mappedTeachers);
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch teachers",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

const handleDeleteTeacher = async (teacherId: number) => {
  if (confirm("Are you sure you want to delete this teacher?")) {
    try {
      await axios.post("http://127.0.0.1:8000/api/teachers/delete", { id: teacherId }); // ✅ sending id in body

      setTeachers(teachers.filter((t) => t.id !== teacherId));

      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete teacher",
        variant: "destructive",
      });
    }
  }
};

  const handleSaveTeacher = async (teacherData: Omit<Teacher, 'id'>) => {
    try {
      if (editingTeacher) {
        const response = await teachersApi.update(editingTeacher.id, teacherData);
        setTeachers(teachers.map(t => t.id === editingTeacher.id ? response.data : t));
        toast({
          title: "Success",
          description: "Teacher updated successfully",
        });
      } else {
        const response = await teachersApi.create(teacherData);
        setTeachers([...teachers, response.data]);
        toast({
          title: "Success",
          description: "Teacher added successfully",
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save teacher",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ></Circles></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teachers</h1>
          <p className="text-muted-foreground">Manage teaching staff</p>
        </div>
        <Button onClick={handleAddTeacher} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Teachers List</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Contact</TableHead>
                {/* <TableHead>Subject</TableHead> */}
                <TableHead>Department</TableHead>
                {/* <TableHead>Employee ID</TableHead> */}
                <TableHead>Designation</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback>
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <div className="text-sm text-muted-foreground">{teacher.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{teacher.phone}</div>
                  </TableCell>
                  <TableCell><Badge variant='outline'>{teacher.department}</Badge></TableCell>
                  <TableCell>
                      {teacher.designation}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {teacher.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTeacher(teacher)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TeacherModal
  open={isModalOpen}
  onOpenChange={setIsModalOpen}
  teacher={editingTeacher}
  roles={roles}
  departments={departments}
  onSuccess={fetchTeachers}   // ✅ refresh list after success
/>

    </div>
  );
};