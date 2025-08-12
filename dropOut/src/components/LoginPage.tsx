import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import loginImage from "../../src/img/imageLo.png";

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
      <div className="md:w-1/2 w-full">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <label className="block mb-2 font-semibold">Email/Username</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

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
            <a href="#" className="text-orange-500">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-full mt-6 flex items-center justify-center space-x-2"
          >
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
              className="flex-1 border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
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
            <a href="#" className="text-orange-500 font-semibold">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
