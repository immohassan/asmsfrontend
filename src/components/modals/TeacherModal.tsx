import { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from "@/components/ui/use-toast";

interface Role {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
  role_id?: number;        
  department_id?: number;  
  user_id?: number;
  address?: string;
}


interface TeacherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
  roles: Role[];
  departments: Department[];
  onSuccess: () => void; // refresh table after update
}

export const TeacherModal = ({ open, onOpenChange, teacher, roles, departments, onSuccess }: TeacherModalProps) => {
  const [formData, setFormData] = useState({
    id: 0,
    user_id: 0,
    name: '',
    email: '',
    phone: '',
    designation: '',
    role_id: 0,
    department_id: 0,
    address: '',
    password: '',
  });

  useEffect(() => {
    if (teacher) {
  setFormData({
    id: teacher.id,
    user_id: teacher.user_id || 0,
    name: teacher.name,
    email: teacher.email,
    phone: teacher.phone,
    designation: teacher.designation,
    role_id: teacher.role_id,            
    department_id: teacher.department_id,
    address: teacher.address || '',
    password: '',
  });
} else {
      setFormData({
        id: 0,
        user_id: 0,
        name: '',
        email: '',
        phone: '',
        designation: '',
        role_id: 0,
        department_id: 0,
        address: '',
        password: '',
      });
    }
  }, [teacher]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (teacher) {
        // ✅ UPDATE (use id in URL for clarity)
        response = await axios.put(
          `http://127.0.0.1:8000/api/teachers/update`,
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        // ✅ ADD
        response = await axios.post(
          "http://127.0.0.1:8000/api/teachers/add",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
      }

      // ✅ success toast only if backend actually returned 200
      if (response.status === 200 || response.status === 201) {
  toast({
    title: "Success",
    description: response.data?.message || (teacher ? "Teacher updated successfully" : "Teacher added successfully"),
  });
  onOpenChange(false);
  onSuccess();
}

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{teacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
          <DialogDescription>
            {teacher ? 'Update teacher information' : 'Fill in the details to add a new teacher'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Designation</Label>
            <Input value={formData.designation} onChange={(e) => handleInputChange('designation', e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <Select
                value={formData.department_id ? String(formData.department_id) : ''}
                onValueChange={(value) => handleInputChange('department_id', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dep => (
                    <SelectItem key={dep.id} value={String(dep.id)}>{dep.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={formData.role_id ? String(formData.role_id) : ''}
                onValueChange={(value) => handleInputChange('role_id', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{teacher ? 'Update' : 'Add'} Teacher</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
