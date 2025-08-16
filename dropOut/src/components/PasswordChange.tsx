import React from "react";

interface Props {
  onProceed?: () => void;
}

const PasswordChanged: React.FC<Props> = ({ onProceed }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      {/* Centered Confirmation Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon and Title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
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
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Password Changed!</h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Your password has been successfully updated. You can now sign in with your new password.
        </p>
        
        {/* Action Button */}
        <button
          onClick={onProceed}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg mb-6"
        >
          Proceed to Login
        </button>
        
        {/* Help Link */}
        <p
          className="text-sm text-gray-500 cursor-pointer hover:text-orange-500 transition-colors"
          onClick={() => {
            /* you can handle help click here */
          }}
        >
          Need Help?
        </p>
      </div>
    </div>
  );
};

export default PasswordChanged;
