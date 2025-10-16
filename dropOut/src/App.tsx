import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from "./components/LoginPage";
import { UserAuthProvider } from "./context/UserAuthContext";
import SignUpPage from "./components/SignUp";
import ResetPasswordSimple from "./components/ResetPassword";
import NewPasswordReset from "./components/ResetInfo";
import PasswordChangedConfirmation from "./components/PasswordChange";
import LandingPage from "./components/LandingPage";
import Hod from "./components/Hod";
import Dashboard from "./components/TeacherPages/Dashboard";
import MyClasses from './components/TeacherPages/MyClasses';
import Attendance from "./components/TeacherPages/Attendance";
import DailyAttendance from "./components/TeacherPages/DailyAttendance";
import Behavior from "./components/TeacherPages/Behavior.tsx";
import LogBehaviorReport from "./components/TeacherPages/LogBehaviorReport.tsx";
import StudentProfiles from "./components/TeacherPages/StudentProfiles.tsx";
import Settings from "./components/TeacherPages/Settings.tsx";
import Marks from "./components/TeacherPages/Marks.tsx";

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
           <Route path="/attendance" element={<Attendance />} />
            <Route path="/daily-attendance" element={<DailyAttendance/>} />
             <Route path="/behavior-reports" element={<Behavior/>} />
             <Route path="/log-behavior-report" element={<LogBehaviorReport />} />
              <Route path="/student-profiles" element={<StudentProfiles />} />
                 <Route path="/marks" element={<Marks />} />
               <Route path="/settings" element={<Settings />} />
          <Route path="/hod-dashboard" element={<Hod />} />
           <Route path="/teacher-dashboard" element={<Dashboard />} />
           <Route path="/my-classes" element={<MyClasses />} />
           
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