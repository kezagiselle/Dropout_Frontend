import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface NewPasswordForm {
  newPassword: string;
  confirmNewPassword: string;
}

const NewPasswordReset: React.FC = () => {
  const [formData, setFormData] = useState<NewPasswordForm>({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("New password set:", formData.newPassword);
    // Add reset password logic here
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
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Reset Password</h1>
          <p className="text-gray-600">Please enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div>
            <label htmlFor="newPassword" className="block mb-2 font-semibold text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
              className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block mb-2 font-semibold text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
              className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Password Requirements */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-semibold mb-3 text-gray-700">Password must contain:</p>
            <ul className="space-y-2">
              {[
                "At least 8 characters",
                "One uppercase letter",
                "One lowercase letter",
                "One number",
                "One special character (e.g., !@#$%)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-green-500 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 font-semibold transition-all duration-200 hover:shadow-lg"
          >
            Reset Password
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Return to Login Link */}
          <div className="text-center">
            <Link to="/" className="text-black font-bold hover:text-gray-800 transition-colors">
              Return to Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NewPasswordReset;
