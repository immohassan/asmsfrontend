import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  ClipboardList,
  TrendingUp,
  MessageSquare,
  FileText,
  ChevronDown,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const adminMenuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
    exact: true
  },
  {
    title: 'Teachers',
    icon: Users,
    href: '/admin/teachers'
  },
  {
    title: 'Students',
    icon: GraduationCap,
    href: '/admin/students'
  },
  {
    title: 'Classes',
    icon: BookOpen,
    href: '/admin/classes'
  }
];

const studentMenuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/student',
    exact: true
  },
  {
    title: 'Schedule',
    icon: Calendar,
    href: '/student/schedule'
  },
  {
    title: 'Grades',
    icon: TrendingUp,
    href: '/student/grades'
  },
  {
    title: 'Attendance',
    icon: ClipboardList,
    href: '/student/attendance'
  },
  {
    title: 'Assignments',
    icon: FileText,
    href: '/student/assignments'
  }
];

const teacherMenuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/teacher',
    exact: true
  },
  {
    title: 'Schedule',
    icon: Calendar,
    href: '/teacher/schedule'
  },
  {
    title: 'Grades',
    icon: TrendingUp,
    href: '/teacher/grades'
  },
  {
    title: 'Attendance',
    icon: ClipboardList,
    href: '/teacher/attendance'
  },
  {
    title: 'Assignments',
    icon: FileText,
    href: '/teacher/assignments'
  }
];

export const Sidebar = () => {
  const location = useLocation();
  const [roleExpanded, setRoleExpanded] = useState(true);
  
  const getCurrentRole = () => {
    if (location.pathname.startsWith('/admin')) return 'admin';
    if (location.pathname.startsWith('/student')) return 'student';
    if (location.pathname.startsWith('/teacher')) return 'teacher';
    return 'admin';
  };
  
  const currentRole = getCurrentRole();
  const menuItems = currentRole === 'admin' ? adminMenuItems : 
                   currentRole === 'student' ? studentMenuItems : teacherMenuItems;

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">Akademi</h1>
        <p className="text-sm text-muted-foreground">School Management</p>
      </div>
      
      <div className="flex-1 p-4">
        <Collapsible open={roleExpanded} onOpenChange={setRoleExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-2 h-auto text-left font-medium mb-2"
            >
              <span className="capitalize">{currentRole} Panel</span>
              {roleExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        <div className="mt-6 space-y-1">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Switch Panel
          </h3>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive || currentRole === 'admin'
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )
            }
          >
            <Users className="h-4 w-4" />
            <span>Admin</span>
          </NavLink>
          
          <NavLink
            to="/teacher"
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive || currentRole === 'teacher'
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )
            }
          >
            <GraduationCap className="h-4 w-4" />
            <span>Teacher</span>
          </NavLink>
          
          <NavLink
            to="/student"
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive || currentRole === 'student'
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )
            }
          >
            <BookOpen className="h-4 w-4" />
            <span>Student</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};