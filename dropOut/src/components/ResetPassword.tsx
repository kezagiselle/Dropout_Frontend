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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row md:items-center md:gap-10 max-w-4xl w-full">
        {/* Image on the left */}
        <div className="hidden md:block md:w-1/2">
          <img src={loginImage} alt="Login Illustration" className="w-full h-auto rounded-lg" />
        </div>

        {/* Form on the right */}
        <form onSubmit={handleSubmit} className="w-full max-w-md md:w-1/2">
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
              className="w-full rounded-full border border-gray-300 py-3 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white rounded-full py-3 flex justify-center items-center gap-2 font-semibold transition-colors"
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
              className="text-gray-800 font-semibold inline-flex items-center gap-1 hover:underline"
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
