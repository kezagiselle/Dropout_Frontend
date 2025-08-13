import React from "react";
import loginImage from "../../src/img/main.png";

interface Props {
  onProceed?: () => void;
}

const PasswordChanged: React.FC<Props> = ({ onProceed }) => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Section - Image */}
      <div className="h-48 sm:h-64 md:h-80 lg:h-screen lg:w-1/2 flex items-center justify-center bg-gray-100 order-2 lg:order-1">
        <img
          src={loginImage}
          alt="Password Changed Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Confirmation */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 order-1 lg:order-2">
        <div className="max-w-sm sm:max-w-md w-full text-center">
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
