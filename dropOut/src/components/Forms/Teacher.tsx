import React, { useState } from 'react'
import { FaArrowLeft, FaChevronDown, FaUser, FaCalendarAlt } from 'react-icons/fa'
import EditProfile from './EditProfile';

interface TeacherProps {
  onBack: () => void;
}

function Teacher({ onBack }: TeacherProps) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    // Teacher Information
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: '',
    specialization: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showEditProfile) {
    console.log('Showing EditProfile component');
    return <EditProfile onBack={() => setShowEditProfile(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-12 sm:pt-16 md:pt-20">
      {/* Main Content Card */}
      <div className="w-full max-w-6xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12 min-h-[600px] sm:min-h-[700px] flex flex-col">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Add New Teacher
            </h1>
            <p className="text-sm text-gray-600">
              Enter teacher information
            </p>
          </div>
          
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 space-y-8">
          {/* Teacher Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUser className="text-blue-600 text-lg" />
              <h2 className="text-lg font-bold text-gray-900">Teacher Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 pr-10"
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Specialization
                </label>
                <div className="relative">
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                  >
                    <option value="">Select Specialization</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="history">History</option>
                    <option value="art">Art</option>
                    <option value="music">Music</option>
                    <option value="physical-education">Physical Education</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="foreign-languages">Foreign Languages</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8">
          <button className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium w-full sm:w-auto">
            Cancel
          </button>
          <button 
            onClick={() => {
              console.log('Edit Profile button clicked');
              setShowEditProfile(true);
            }}
            className="px-4 sm:px-6 py-2 sm:py-3 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-sm font-medium w-full sm:w-auto"
          >
            Edit Profile
          </button>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium w-full sm:w-auto">
            Save Teacher
          </button>
        </div>
      </div>
    </div>
  )
}

export default Teacher