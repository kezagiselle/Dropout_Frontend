import React from "react";
import loginImage from "../../src/img/Login1.png";

interface Props {
  onProceed?: () => void;
}

const PasswordChanged: React.FC<Props> = ({ onProceed }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section - Image */}
      <div className="h-screen flex items-center justify-center bg-gray-100 md:w-1/2">
        <img
          src={loginImage}
          alt="Password Changed Illustration"
          className="w-full h-300 object-cover"
        />
      </div>

      {/* Right Section - Confirmation */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-10">
        <div className="max-w-md w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Green tick icon */}
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900">Passwords Changed</h1>
          </div>
          <p className="mb-8 text-gray-700">
            Your password has successfully changed
          </p>
          <button
            onClick={onProceed}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full font-semibold transition-colors"
          >
            Proceed to Login
          </button>
          <p
  className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:underline"
  onClick={() => {
    /* you can handle help click here */
  }}
>
  Need Help?
</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordChanged;
