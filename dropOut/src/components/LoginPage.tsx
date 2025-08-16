import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import googleLogo from '../../src/img/light/googleIcon.png';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
  isStudent: boolean;
  isHod: boolean;
  isGovernment: boolean;
  isTeacher: boolean;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    remember: false,
    isStudent: false,
    isHod: false,
    isGovernment: false,
    isTeacher: false,
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      // For user type checkboxes, ensure only one can be selected
      if (["isStudent", "isHod", "isGovernment", "isTeacher"].includes(name)) {
        setFormData((prev) => ({
          ...prev,
          isStudent: name === "isStudent" ? checked : false,
          isHod: name === "isHod" ? checked : false,
          isGovernment: name === "isGovernment" ? checked : false,
          isTeacher: name === "isTeacher" ? checked : false,
        }));
      } else {
        // For other checkboxes like "remember me"
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      // For text inputs
    setFormData((prev) => ({
      ...prev,
        [name]: value,
    }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Temporary login functionality
    if (formData.isHod) {
      // For temporary testing - allow any email/password when HoD is selected
      if (formData.email && formData.password) {
        console.log("Temporary HoD login successful - navigating to dashboard");
        navigate("/hod-dashboard");
      } else {
        alert("Please enter both email and password for temporary HoD login");
      }
    } else {
      // For other user types, show normal login message
      alert("Please select a user type and enter credentials");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      {/* Centered Form Container */}
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Email/Username</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm space-y-2 sm:space-y-0">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="accent-orange-400 rounded"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link to="/reset-password" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
              Forgot Password?
            </Link>
          </div>

          {/* User Type Checkboxes */}
          <div className="space-y-3">
            {/* Temporary Login Message */}
            {formData.isHod && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Temporary Login:</strong> As a HoD, you can use any email and password to access the dashboard for testing purposes.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="isStudent"
                  checked={formData.isStudent}
                  onChange={handleChange}
                  className="accent-orange-400 rounded"
                />
                <span className="text-gray-700">Student</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="isHod"
                  checked={formData.isHod}
                  onChange={handleChange}
                  className="accent-orange-400 rounded"
                />
                <span className="text-gray-700">HoD</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="isGovernment"
                  checked={formData.isGovernment}
                  onChange={handleChange}
                  className="accent-orange-400 rounded"
                />
                <span className="text-gray-700">Government</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="isTeacher"
                  checked={formData.isTeacher}
                  onChange={handleChange}
                  className="accent-orange-400 rounded"
                />
                <span className="text-gray-700">Teacher</span>
              </label>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg mt-6 flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:shadow-lg"
          >
            <svg
              className="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>Sign In</span>
          </button>

          {/* OR divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-medium"
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-medium"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
