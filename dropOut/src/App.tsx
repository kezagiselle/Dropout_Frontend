import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUp";
import NewPasswordReset from "./components/ResetInfo";
import PasswordChangedConfirmation from "./components/PasswordChange";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/new-password-reset" element={<NewPasswordReset />} />
        <Route path="/password-changed" element={<PasswordChangedConfirmation />} />
        {/* Add other routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
