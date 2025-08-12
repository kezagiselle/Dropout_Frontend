import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import loginImage from "../../src/img/Login1.png";
import googleLogo from '../../src/img/light/googleIcon.png';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section - Image */}
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-300 object-cover"
        />
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
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

          <div className="flex justify-between items-center mt-2 text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="accent-orange-400"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-black font-bold">
              Forgot Password?
            </a>
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
          <div className="flex gap-4">
            <button
  type="button"
  className="flex-1 border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
>
  {/* Google Logo */}
  <img
    src={googleLogo}
    alt="Google"
    className="w-5 h-5"
  />
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
            <a href="#" className="text-black font-bold">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
