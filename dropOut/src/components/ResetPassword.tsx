import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import loginImage from "../../src/img/Login1.png";

const ResetPasswordSimple: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    // Add reset logic here
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section - Image */}
      <div className="h-screen flex items-center justify-center bg-gray-100 md:w-1/2">
        <img
          src={loginImage}
          alt="Reset Password Illustration"
          className="w-full h-300 object-cover"
        />
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Enter your email to receive a password reset link
          </p>

          <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
            Email Address
          </label>
          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {/* Envelope icon */}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v16H4z" stroke="none" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </span>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full flex justify-center items-center gap-2 font-semibold transition-colors"
          >
            {/* Paper plane icon */}
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send Reset Link
          </button>

          <div className="mt-6 text-center md:text-left">
            <a
              href="#"
              className="text-gray-800 font-semibold inline-flex items-center gap-1 hover:underline ml-40"
            >
              {/* Left arrow */}
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordSimple;
