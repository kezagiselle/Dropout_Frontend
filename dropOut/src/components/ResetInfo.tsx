import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import loginImage from "../../src/img/Login1.png";

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

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section - Image */}
      <div className="h-screen flex items-center justify-center bg-gray-100 md:w-1/2">
        <img
          src={loginImage}
          alt="New Password Illustration"
          className="w-full h-300 object-cover"
        />
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <p className="text-gray-600 mb-20 text-center md:text-left font-semibold">
            Please enter your new password below
          </p>

          <label htmlFor="newPassword" className="block mb-2 font-semibold text-gray-700">
            New Password
          </label>
          <div className="relative mb-6">
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
              className="w-full rounded-md border border-gray-300 py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <label
            htmlFor="confirmNewPassword"
            className="block mb-2 font-semibold text-gray-700"
          >
            Confirm New Password
          </label>
          <div className="relative mb-4">
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
              className="w-full rounded-md border border-gray-300 py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

      
<div className="mb-6 text-sm text-gray-600">
  <p className="font-semibold mb-1">Password must contain:</p>
  <ul className="list-none space-y-2">
    {[
      "At least 8 characters",
      "One uppercase letter",
      "One lowercase letter",
      "One number",
      "One special character (e.g., !@#$%)",
    ].map((item) => (
      <li key={item} className="flex items-center gap-2">
        {/* Green check icon */}
        <svg
          className="w-5 h-5 text-green-500 flex-shrink-0"
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

         <button
  type="submit"
  className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full flex justify-center items-center gap-2 font-semibold transition-colors"
>
  Reset Password
  {/* Right arrow icon */}
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
<Link to="/">
  <p className="mt-4 text-center font-bold text-gray-800 cursor-pointer hover:underline">
    Return to Login
  </p>
</Link>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordReset;
