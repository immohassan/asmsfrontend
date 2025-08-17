import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, FileText, Calendar, CheckCircle } from 'lucide-react';

type ReportType = 'weekly' | 'end-of-term' | null;

interface WeeklyReportData {
  [subject: string]: {
    attendance: string;
    punctuality: string;
    engagement: string;
    cw: string;
    hw: string;
    totalScore: string;
  };
}

interface EndOfTermReportData {
  [subject: string]: {
    totalMarks: string;
    obtainedMarks: string;
    overallObtained: string;
    percentage: string;
    grade: string;
    attitudeToLearning: string;
    classworkEffort: string;
    assessmentResults: string;
    progress: string;
    predictedGrade: string;
    comments: string;
  };
}

const subjects = ['Maths', 'Physics', 'Chemistry', 'Biology'];
const endOfTermSubjects = [
  'English I', 'English II', 'Maths I', 'Maths II', 
  'Physics I', 'Physics II', 'Chemistry I', 'Chemistry II',
  'Biology I', 'Biology II'
];

export const ReportGeneration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [reportType, setReportType] = useState<ReportType>(null);
  const [weeklyData, setWeeklyData] = useState<WeeklyReportData>({});
  const [endOfTermData, setEndOfTermData] = useState<EndOfTermReportData>({});
  const [overallRemarks, setOverallRemarks] = useState('');
  const [targetsImprovements, setTargetsImprovements] = useState('');
  const [generalComments, setGeneralComments] = useState('');
  const [examTargets, setExamTargets] = useState('');

  const steps = [
    { title: 'Report Type', icon: FileText },
    { title: 'Subject Details', icon: Calendar },
    { title: 'Additional Info', icon: CheckCircle }
  ];

  const handleReportTypeSelect = (type: ReportType) => {
    setReportType(type);
    setCurrentStep(1);
  };

  const updateWeeklyData = (subject: string, field: string, value: string) => {
    setWeeklyData(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [field]: value
      }
    }));
  };

  const updateEndOfTermData = (subject: string, field: string, value: string) => {
    setEndOfTermData(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [field]: value
      }
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            index <= currentStep 
              ? 'bg-primary border-primary text-primary-foreground' 
              : 'border-border text-muted-foreground'
          }`}>
            <step.icon size={16} />
          </div>
          <span className={`ml-2 text-sm font-medium ${
            index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <ChevronRight className="mx-4 text-muted-foreground" size={16} />
          )}
        </div>
      ))}
    </div>
  );

  const renderReportTypeStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Select Report Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center space-y-2 hover:bg-accent"
            onClick={() => handleReportTypeSelect('weekly')}
          >
            <Calendar size={32} />
            <span className="font-semibold">Weekly Report</span>
            <span className="text-sm text-muted-foreground text-center">
              Track weekly progress, attendance, and engagement
            </span>
          </Button>
          
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center space-y-2 hover:bg-accent"
            onClick={() => handleReportTypeSelect('end-of-term')}
          >
            <FileText size={32} />
            <span className="font-semibold">End of Term Report</span>
            <span className="text-sm text-muted-foreground text-center">
              Comprehensive assessment and grade report
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderWeeklySubjectDetails = () => (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Report - Subject Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {subjects.map((subject) => (
          <div key={subject} className="border rounded-lg p-4 space-y-4">
            <h4 className="font-semibold text-lg flex items-center">
              <Badge variant="secondary" className="mr-2">{subject}</Badge>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Attendance</Label>
                <Select onValueChange={(value) => updateWeeklyData(subject, 'attendance', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select attendance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Punctuality</Label>
                <Select onValueChange={(value) => updateWeeklyData(subject, 'punctuality', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select punctuality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-time">On Time</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Total Score</Label>
                <Input
                  placeholder="Enter total score"
                  onChange={(e) => updateWeeklyData(subject, 'totalScore', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Engagement</Label>
                <Input
                  placeholder="Describe engagement"
                  onChange={(e) => updateWeeklyData(subject, 'engagement', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>CW (Classwork)</Label>
                <Input
                  placeholder="Classwork notes"
                  onChange={(e) => updateWeeklyData(subject, 'cw', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>HW (Homework)</Label>
                <Input
                  placeholder="Homework notes"
                  onChange={(e) => updateWeeklyData(subject, 'hw', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderEndOfTermSubjectDetails = () => (
    <Card>
      <CardHeader>
        <CardTitle>End of Term Report - Subject Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {endOfTermSubjects.map((subject) => (
          <div key={subject} className="border rounded-lg p-4 space-y-4">
            <h4 className="font-semibold text-lg flex items-center">
              <Badge variant="secondary" className="mr-2">{subject}</Badge>
            </h4>
            
            {/* Marks Section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Total Marks</Label>
                <Input
                  placeholder="Total marks"
                  onChange={(e) => updateEndOfTermData(subject, 'totalMarks', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Obtained Marks</Label>
                <Input
                  placeholder="Obtained marks"
                  onChange={(e) => updateEndOfTermData(subject, 'obtainedMarks', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Overall Obtained</Label>
                <Input
                  placeholder="Overall obtained"
                  onChange={(e) => updateEndOfTermData(subject, 'overallObtained', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Percentage</Label>
                <Input
                  placeholder="Percentage"
                  onChange={(e) => updateEndOfTermData(subject, 'percentage', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Grade</Label>
                <Input
                  placeholder="Grade"
                  onChange={(e) => updateEndOfTermData(subject, 'grade', e.target.value)}
                />
              </div>
            </div>
            
            {/* Assessment Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Attitude to Learning</Label>
                <Input
                  placeholder="Attitude assessment"
                  onChange={(e) => updateEndOfTermData(subject, 'attitudeToLearning', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Classwork Effort</Label>
                <Input
                  placeholder="Classwork effort"
                  onChange={(e) => updateEndOfTermData(subject, 'classworkEffort', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Assessment Results</Label>
                <Input
                  placeholder="Assessment results"
                  onChange={(e) => updateEndOfTermData(subject, 'assessmentResults', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Progress</Label>
                <Input
                  placeholder="Progress notes"
                  onChange={(e) => updateEndOfTermData(subject, 'progress', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Predicted Grade</Label>
                <Input
                  placeholder="Predicted grade"
                  onChange={(e) => updateEndOfTermData(subject, 'predictedGrade', e.target.value)}
                />
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="space-y-2">
              <Label>Comments on Assessment and Classwork</Label>
              <Textarea
                placeholder="Enter detailed comments for this subject..."
                className="min-h-[100px]"
                onChange={(e) => updateEndOfTermData(subject, 'comments', e.target.value)}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderAdditionalInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle>
          {reportType === 'weekly' ? 'Weekly Report - Additional Information' : 'End of Term Report - General Information'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reportType === 'weekly' ? (
          <>
            <div className="space-y-2">
              <Label>Overall Remarks</Label>
              <Textarea
                placeholder="Enter overall remarks for the week..."
                className="min-h-[120px]"
                value={overallRemarks}
                onChange={(e) => setOverallRemarks(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Targets and Improvements for Next Week</Label>
              <Textarea
                placeholder="Enter targets and improvements for next week..."
                className="min-h-[120px]"
                value={targetsImprovements}
                onChange={(e) => setTargetsImprovements(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label>General Comments</Label>
              <Textarea
                placeholder="Enter general comments for the term..."
                className="min-h-[120px]"
                value={generalComments}
                onChange={(e) => setGeneralComments(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Targets for Exams</Label>
              <Textarea
                placeholder="Enter targets and preparation advice for upcoming exams..."
                className="min-h-[120px]"
                value={examTargets}
                onChange={(e) => setExamTargets(e.target.value)}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically submit the report data
    console.log('Report data:', {
      reportType,
      weeklyData,
      endOfTermData,
      overallRemarks,
      targetsImprovements,
      generalComments,
      examTargets
    });
    
    // Reset form or show success message
    alert('Report generated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Report Generation</h1>
      </div>

      {renderStepIndicator()}

      <div className="min-h-[600px]">
        {currentStep === 0 && renderReportTypeStep()}
        {currentStep === 1 && reportType === 'weekly' && renderWeeklySubjectDetails()}
        {currentStep === 1 && reportType === 'end-of-term' && renderEndOfTermSubjectDetails()}
        {currentStep === 2 && renderAdditionalInfo()}
      </div>

      {/* Navigation Buttons */}
      {reportType && (
        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>
              Generate Report
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ChevronRight size={16} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};