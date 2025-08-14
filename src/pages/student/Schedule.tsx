import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';
import { scheduleApi } from '@/lib/api';

interface ScheduleItem {
  id: number;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export const StudentSchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await scheduleApi.getAll();
        setSchedule(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const getScheduleForDay = (day: string) => {
    return schedule.filter(item => item.day === day);
  };

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      'Mathematics': 'bg-primary',
      'Physics': 'bg-secondary',
      'English Literature': 'bg-success',
      'Chemistry': 'bg-warning',
      'Biology': 'bg-accent'
    };
    return colors[subject] || 'bg-muted';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading schedule...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Class Schedule</h1>
        <p className="text-muted-foreground">Your weekly class timetable</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {days.map((day) => {
          const daySchedule = getScheduleForDay(day);
          const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
          const isToday = day === today;
          
          return (
            <Card key={day} className={`${isToday ? 'ring-2 ring-primary shadow-lg' : 'shadow-sm'}`}>
              <CardHeader className="pb-3">
                <CardTitle className={`text-lg ${isToday ? 'text-primary' : ''}`}>
                  {day}
                  {isToday && <Badge className="ml-2">Today</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {daySchedule.length > 0 ? (
                  daySchedule.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg border border-border hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getSubjectColor(item.subject)}`}></div>
                        <h4 className="font-medium text-sm">{item.subject}</h4>
                      </div>
                      
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{item.time}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{item.teacher}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{item.room}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground text-sm py-4">
                    No classes scheduled
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Schedule Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{schedule.length}</div>
              <div className="text-sm text-muted-foreground">Total Classes</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-secondary">
                {new Set(schedule.map(s => s.subject)).size}
              </div>
              <div className="text-sm text-muted-foreground">Subjects</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-success">
                {new Set(schedule.map(s => s.teacher)).size}
              </div>
              <div className="text-sm text-muted-foreground">Teachers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};