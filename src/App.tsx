import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminTeachers } from "./pages/admin/Teachers";
import { StudentDashboard } from "./pages/student/Dashboard";
import { StudentSchedule } from "./pages/student/Schedule";
import { StudentGrades } from "./pages/student/Grades";
import { TeacherDashboard } from "./pages/teacher/Dashboard";
import { TeacherAttendance } from "./pages/teacher/Attendance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="students" element={<div>Admin Students - Coming Soon</div>} />
            <Route path="classes" element={<div>Admin Classes - Coming Soon</div>} />
          </Route>
          
          {/* Student Routes */}
          <Route path="/student" element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="attendance" element={<div>Student Attendance - Coming Soon</div>} />
            <Route path="assignments" element={<div>Student Assignments - Coming Soon</div>} />
          </Route>
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<DashboardLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="schedule" element={<div>Teacher Schedule - Coming Soon</div>} />
            <Route path="grades" element={<div>Teacher Grades - Coming Soon</div>} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="assignments" element={<div>Teacher Assignments - Coming Soon</div>} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
