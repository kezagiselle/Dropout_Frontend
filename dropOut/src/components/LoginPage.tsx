import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import loginImage from "../../src/img/main.png";
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
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Section - Image */}
      <motion.div
        className="h-48 sm:h-64 md:h-80 lg:h-screen lg:w-1/2 flex items-center justify-center bg-gray-100 order-2 lg:order-1"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right Section - Form */}
      <motion.div
        className="lg:w-1/2 w-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 order-1 lg:order-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubmit} className="w-full max-w-sm sm:max-w-md">
          <label className="block mb-2 font-semibold">Email/Username</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-md px-10 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </div>
          <label className="block mb-2 font-semibold">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-600"
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

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 text-sm space-y-2 sm:space-y-0">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="accent-orange-400"
              />
              <span className="italic">Remember me</span>
            </label>
            <Link to="/reset-password" className="text-black font-bold hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* User Type Checkboxes */}
          <div className="mt-4 space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="isStudent"
                checked={formData.isStudent}
                onChange={handleChange}
                className="accent-orange-400"
              />
              <span>I am a student</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="isHod"
                checked={formData.isHod}
                onChange={handleChange}
                className="accent-orange-400"
              />
              <span>I am a HoD</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="isGovernment"
                checked={formData.isGovernment}
                onChange={handleChange}
                className="accent-orange-400"
              />
              <span>I am the government</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="isTeacher"
                checked={formData.isTeacher}
                onChange={handleChange}
                className="accent-orange-400"
              />
              <span>I am a teacher</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-full mt-6 flex items-center justify-center gap-2"
          >
            {/* Right-pointing arrow (→) on the left */}
            <svg
              className="h-4 w-4 text-white"
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
            <span>Login</span>
          </button>

          {/* OR divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              className="flex-1 border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              {/* Google Logo */}
              <img src={googleLogo} alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex-1 border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-5 h-5"
              />
              Facebook
            </button>
          </div>

          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-black font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
