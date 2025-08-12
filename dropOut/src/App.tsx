import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUp";
import ResetPasswordSimple from "./components/ResetPassword";
import NewPasswordReset from "./components/ResetInfo";
import PasswordChangedConfirmation from "./components/PasswordChange";

function App() {
  return (
    // <>
    // <PasswordChangedConfirmation />
    // </>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPasswordSimple />} />
        <Route path="/new-password-reset" element={<NewPasswordReset />} />
        <Route path="/password-changed" element={<PasswordChangedConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
