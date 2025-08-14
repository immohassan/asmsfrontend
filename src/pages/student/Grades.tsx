import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { gradesApi } from '@/lib/api';

interface Grade {
  id: number;
  studentId: number;
  studentName: string;
  subject: string;
  assessment: string;
  grade: string;
  score: number;
  maxScore: number;
  date: string;
  teacher: string;
}

export const StudentGrades = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // Assuming student ID is 1 for demo
        const response = await gradesApi.getByStudentId(1);
        setGrades(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching grades:', error);
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-success';
    if (grade.startsWith('B')) return 'text-primary';
    if (grade.startsWith('C')) return 'text-warning';
    return 'text-destructive';
  };

  const getGradeBadgeVariant = (grade: string) => {
    if (grade.startsWith('A')) return 'default';
    if (grade.startsWith('B')) return 'secondary';
    if (grade.startsWith('C')) return 'outline';
    return 'destructive';
  };

  const calculateOverallAverage = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0);
    return (total / grades.length).toFixed(1);
  };

  const getSubjectAverage = (subject: string) => {
    const subjectGrades = grades.filter(g => g.subject === subject);
    if (subjectGrades.length === 0) return 0;
    const total = subjectGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0);
    return (total / subjectGrades.length).toFixed(1);
  };

  const subjects = [...new Set(grades.map(g => g.subject))];

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading grades...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Grades</h1>
        <p className="text-muted-foreground">Your academic performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Average
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateOverallAverage()}%</div>
            <div className="text-sm text-success flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              Grade A-
            </div>
          </CardContent>
        </Card>

        {subjects.slice(0, 3).map((subject) => (
          <Card key={subject} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {subject}
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getSubjectAverage(subject)}%</div>
              <div className="text-sm text-muted-foreground">
                {grades.filter(g => g.subject === subject).length} assessments
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Assessment</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Teacher</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell>
                    <Badge variant="secondary">{grade.subject}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{grade.assessment}</TableCell>
                  <TableCell>
                    <Badge variant={getGradeBadgeVariant(grade.grade)} className={getGradeColor(grade.grade)}>
                      {grade.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{grade.score}/{grade.maxScore}</span>
                      <span className="text-sm text-muted-foreground">
                        ({((grade.score / grade.maxScore) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(grade.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm">{grade.teacher}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects.map((subject) => {
              const subjectGrades = grades.filter(g => g.subject === subject);
              const average = parseFloat(getSubjectAverage(subject).toString());
              
              return (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject}</span>
                    <span className="text-sm text-muted-foreground">{average}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        average >= 90 ? 'bg-success' :
                        average >= 80 ? 'bg-primary' :
                        average >= 70 ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${Math.min(average, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};