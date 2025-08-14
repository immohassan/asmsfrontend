import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import { teachersApi, studentsApi, classesApi } from '@/lib/api';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    teachers: 0,
    students: 0,
    classes: 0,
    activeUsers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [teachersRes, studentsRes, classesRes] = await Promise.all([
          teachersApi.getAll(),
          studentsApi.getAll(),
          classesApi.getAll()
        ]);
        
        setStats({
          teachers: teachersRes.data.length,
          students: studentsRes.data.length,
          classes: classesRes.data.length,
          activeUsers: teachersRes.data.length + studentsRes.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Teachers',
      value: stats.teachers,
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Total Students',
      value: stats.students,
      icon: GraduationCap,
      color: 'text-secondary'
    },
    {
      title: 'Active Classes',
      value: stats.classes,
      icon: BookOpen,
      color: 'text-success'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: TrendingUp,
      color: 'text-warning'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your school's operations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New teacher registration</p>
                  <p className="text-xs text-muted-foreground">Ms. Emily Rodriguez joined</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Class schedule updated</p>
                  <p className="text-xs text-muted-foreground">Grade 10 Mathematics</p>
                </div>
                <span className="text-xs text-muted-foreground">5 hours ago</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Student enrollment</p>
                  <p className="text-xs text-muted-foreground">25 new students this month</p>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              <button className="p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium">Add New Teacher</div>
                <div className="text-sm text-muted-foreground">Register a new teacher</div>
              </button>
              
              <button className="p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium">Enroll Student</div>
                <div className="text-sm text-muted-foreground">Add a new student</div>
              </button>
              
              <button className="p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium">Create Class</div>
                <div className="text-sm text-muted-foreground">Setup a new class</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};