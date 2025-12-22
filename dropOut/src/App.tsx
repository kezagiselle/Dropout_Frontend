import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from "./components/LoginPage";
import LogBehaviorReport from "./components/TeacherPages/LogBehaviorReport";
import DailyAttendance from "./components/TeacherPages/DailyAttendance";
import { UserAuthProvider } from "./context/UserAuthContext";
import SignUpPage from "./components/SignUp";
import ResetPasswordSimple from "./components/ResetPassword";
import NewPasswordReset from "./components/ResetInfo";
import PasswordChangedConfirmation from "./components/PasswordChange";
import LandingPage from "./components/LandingPage";
import Hod from "./components/Hod";
import Dashboard from "./components/TeacherPages/Dashboard";
import ViewMarks from "./components/TeacherPages/ViewMarks";
import StudentDashboard from "./components/StudentPages/StudentDashboard";
import StudentClasses from "./components/StudentPages/StudentClasses";
import Timetable from "./components/StudentPages/Timetable";
import Assignments from "./components/StudentPages/Assignments";
import StudentBehavior from "./components/StudentPages/StudentBehavior";
import StudentAttendance from "./components/StudentPages/StudentAttendance";
import StudentSettings from "./components/StudentPages/StudentSettings";
import StudentMarks from "./components/StudentPages/StudentMarks";
import ParentDashboard from "./components/ParentPages/ParentDashboard";
import MyChildren from "./components/ParentPages/MyChildren";
import ParentAttendance from "./components/ParentPages/ParentAttendance";
import Academic from "./components/ParentPages/Academic";
import ParentSettings from "./components/ParentPages/ParentSettings";
import OrganDashboard from "./components/OrganisationPages/OrganDashboard";
import SchoolsPage from "./components/OrganisationPages/SchoolsPages";


function App() {
  return (
    <UserAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<ResetPasswordSimple />} />
          <Route path="/new-password-reset" element={<NewPasswordReset />} />
          <Route path="/password-changed" element={<PasswordChangedConfirmation />} />
           <Route path="/hod-dashboard" element={<Hod />} />
          {/* All teacher routes go through Dashboard component */}
          <Route path="/teacher-dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Dashboard />} />
          <Route path="/my-classes" element={<Dashboard />} />
          <Route path="/daily-attendance" element={<DailyAttendance />} />
          <Route path="/behavior-reports" element={<Dashboard />} />
          <Route path="/view-marks" element={<ViewMarks />} />
            <Route path="/log-behavior-report" element={<LogBehaviorReport />} />
          <Route path="/student-profiles" element={<Dashboard />} />
          <Route path="/marks" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/student-dash" element={<StudentDashboard />} />
          <Route path="/student-class" element={<StudentClasses />} />
          <Route path="/student-marks" element={<StudentMarks />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/my-assignments" element={<Assignments />} />
          <Route path="/student-behavior" element={<StudentBehavior />} />
          <Route path="/student-attendance" element={<StudentAttendance />} />
          <Route path="/student-settings" element={<StudentSettings />} />
          <Route path="/parent-dash" element={<ParentDashboard />} />
          <Route path="/children" element={<MyChildren/>} />
          <Route path="/parent-attendance" element={<ParentAttendance/>} />
           <Route path="/parent-academics" element={<Academic/>} />
           <Route path="/parent-settings" element={<ParentSettings/>} />
           <Route path="/org-dash" element={<OrganDashboard/>} />
          <Route path="/org-schools" element={<SchoolsPage/>} />


           

           
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </UserAuthProvider>
  );
}

export default App;