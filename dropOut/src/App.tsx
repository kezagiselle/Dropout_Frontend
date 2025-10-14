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