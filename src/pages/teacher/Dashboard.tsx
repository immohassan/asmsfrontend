import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, TrendingUp, Clock } from 'lucide-react';

export const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Sarah Johnson</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              My Classes
            </CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
            <Users className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Grades
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Schedule
            </CardTitle>
            <Clock className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Classes today</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">9:00</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Grade 10 - Section A</h4>
                  <p className="text-sm text-muted-foreground">Mathematics • Room 101</p>
                  <p className="text-xs text-muted-foreground">25 students</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-semibold text-sm">11:00</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Grade 11 - Section B</h4>
                  <p className="text-sm text-muted-foreground">Mathematics • Room 101</p>
                  <p className="text-xs text-muted-foreground">28 students</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                  <span className="text-success-foreground font-semibold text-sm">2:00</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Grade 12 - Section A</h4>
                  <p className="text-sm text-muted-foreground">Advanced Mathematics • Room 101</p>
                  <p className="text-xs text-muted-foreground">22 students</p>
                </div>
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
                <div className="font-medium">Take Attendance</div>
                <div className="text-sm text-muted-foreground">Mark today's attendance</div>
              </button>
              
              <button className="p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium">Grade Assignments</div>
                <div className="text-sm text-muted-foreground">12 pending assignments</div>
              </button>
              
              <button className="p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium">Create Assignment</div>
                <div className="text-sm text-muted-foreground">Add new assignment</div>
              </button>
              
              <button className="p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium">View Reports</div>
                <div className="text-sm text-muted-foreground">Class performance analytics</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};