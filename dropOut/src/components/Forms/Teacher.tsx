import React, { useState } from 'react'
import { FaHouseChimney } from "react-icons/fa6";
import { FaStickyNote } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaArrowLeft, FaChevronDown, FaUser, FaCalendarAlt } from 'react-icons/fa';
import EditProfile from './EditProfile';

interface TeacherProps {
  onBack: () => void;
}

function Teacher({ onBack }: TeacherProps) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    teacherId: 'STU001',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '+1 (555) 123-4567',
    
    // Academic Information
    studiesLevel: '',
    diploma: '',
    enrollmentDate: '',
    department: '',
    
    // Family & Social Information
    socialStatus: 'Jane Doe',
    partnerNumber: '+1 (555) 987-6543',
    partnerName: '',
    familyStructure: '',
    homeAddress: '',
    
    // Additional Notes
    additionalNotes: ''
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
              Manage Teachers Activities
            </p>
            {/* Debug info */}
            <p className="text-xs text-red-500">Debug: showEditProfile = {showEditProfile.toString()}</p>
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
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUser className="text-blue-600 text-lg" />
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Teacher ID
                </label>
                <input
                  type="text"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    placeholder="mm/dd/yyyy"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 pr-10"
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FaBook className="text-blue-600 text-lg" />
              <h2 className="text-lg font-semibold text-gray-900">Academic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Studies Level
                </label>
                <div className="relative">
                  <select
                    name="studiesLevel"
                    value={formData.studiesLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                  >
                    <option value="">Select Grade</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="diploma">Diploma</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Diploma
                </label>
                <div className="relative">
                  <select
                    name="diploma"
                    value={formData.diploma}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                  >
                    <option value="">Select School</option>
                    <option value="harvard">Harvard University</option>
                    <option value="mit">MIT</option>
                    <option value="stanford">Stanford University</option>
                    <option value="berkeley">UC Berkeley</option>
                    <option value="other">Other</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Enrollment Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="enrollmentDate"
                    value={formData.enrollmentDate}
                    onChange={handleInputChange}
                    placeholder="mm/dd/yyyy"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 pr-10"
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Department
                </label>
                <div className="relative">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                  >
                    <option value="">Select Status</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="history">History</option>
                    <option value="art">Art</option>
                    <option value="music">Music</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Family & Social Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FaHouseChimney className="text-blue-600 text-lg" />
              <h2 className="text-lg font-semibold text-gray-900">Family & Social Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Social Status
                </label>
                <input
                  type="text"
                  name="socialStatus"
                  value={formData.socialStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Partner's Number
                </label>
                <input
                  type="tel"
                  name="partnerNumber"
                  value={formData.partnerNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Partner's Name
                </label>
                <input
                  type="text"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Family Structure
                </label>
                <div className="relative">
                  <select
                    name="familyStructure"
                    value={formData.familyStructure}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                  >
                    <option value="">Select Structure</option>
                    <option value="nuclear">Nuclear Family</option>
                    <option value="extended">Extended Family</option>
                    <option value="single-parent">Single Parent</option>
                    <option value="blended">Blended Family</option>
                    <option value="other">Other</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="md:col-span-2 lg:col-span-3 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Home Address
                </label>
                <textarea
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, City, State, ZIP Code"
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FaStickyNote className="text-blue-600 text-lg" />
              <h2 className="text-lg font-semibold text-gray-900">Additional Notes</h2>
            </div>
            
            <div className="space-y-2">
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Enter any additional information about the teacher's situation, special circumstances, or intervention recommendations..."
                rows={4}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 resize-none"
              />
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
