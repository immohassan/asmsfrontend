import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, BookOpen, TrendingUp, Clock } from 'lucide-react';

export const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Alex Thompson</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Classes
            </CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Next: Mathematics at 9:00 AM</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Assignments Due
            </CardTitle>
            <BookOpen className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Grade
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">89.7% average</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Attendance
            </CardTitle>
            <Clock className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">9:00</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Mathematics</h4>
                  <p className="text-sm text-muted-foreground">Dr. Sarah Johnson • Room 101</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-semibold text-sm">10:00</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Physics</h4>
                  <p className="text-sm text-muted-foreground">Prof. Michael Chen • Lab 201</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                  <span className="text-success-foreground font-semibold text-sm">11:00</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">English Literature</h4>
                  <p className="text-sm text-muted-foreground">Ms. Emily Rodriguez • Room 102</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">Mathematics</h4>
                  <p className="text-sm text-muted-foreground">Mid-term Exam</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-success">A</div>
                  <div className="text-sm text-muted-foreground">92/100</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">Physics</h4>
                  <p className="text-sm text-muted-foreground">Lab Report</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">B+</div>
                  <div className="text-sm text-muted-foreground">87/100</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">English Literature</h4>
                  <p className="text-sm text-muted-foreground">Essay Assignment</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-success">A-</div>
                  <div className="text-sm text-muted-foreground">90/100</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};