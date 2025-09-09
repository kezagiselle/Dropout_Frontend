import React, { useState } from 'react'
import { FaArrowLeft, FaChevronDown, FaUser, FaCalendarAlt, FaGraduationCap, FaExclamationTriangle, FaStickyNote, FaPlus } from 'react-icons/fa'
import { FaHouseChimney } from "react-icons/fa6";

interface StudentProps {
  onBack: () => void;
}

function Student({ onBack }: StudentProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    studentId: 'STU001',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '+1 (555) 123-4567',
    
    // Academic Information
    gradeLevel: '',
    school: '',
    enrollmentDate: '',
    currentGPA: '3.5',
    attendanceRate: '95',
    department: '',
    
    // Family & Social Information
    guardianName: 'Jane Doe',
    guardianPhone: '+1 (555) 987-6543',
    guardianId: '',
    familyStructure: '',
    homeAddress: '123 Main Street, City, State, ZIP Code',
    
    // Risk Factors
    riskFactors: {
      frequentAbsences: false,
      belowGradeLevel: false,
      behavioralIssues: false,
      economicHardship: false,
      limitedFamilySupport: false,
      peerPressureIssues: false,
      mentalHealthConcerns: false,
      previousSchoolTransfers: false
    },
    
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      riskFactors: {
        ...prev.riskFactors,
        [name]: checked
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-12 sm:pt-16 md:pt-20">
      {/* Main Content Card */}
      <div className="w-full max-w-6xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12 min-h-[600px] sm:min-h-[700px] flex flex-col">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Add New Student
            </h1>
            <p className="text-sm text-gray-600">
              Enter student information to monitor dropout risk and academic progress
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
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUser className="text-blue-600 text-lg" />
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
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
              <FaGraduationCap className="text-blue-600 text-lg" />
              <h2 className="text-lg font-semibold text-gray-900">Academic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Grade Level
                </label>
                <div className="relative">
                  <select
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                  >
                    <option value="">Select Grade</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  School
                </label>
                <div className="relative">
                  <select
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                  >
                    <option value="">Select School</option>
                    <option value="westfield">Westfield High School</option>
                    <option value="central">Central High School</option>
                    <option value="north">North High School</option>
                    <option value="south">South High School</option>
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
                  Current GPA
                </label>
                <input
                  type="text"
                  name="currentGPA"
                  value={formData.currentGPA}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Attendance Rate (%)
                </label>
                <input
                  type="text"
                  name="attendanceRate"
                  value={formData.attendanceRate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
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
                    <option value="science">Science</option>
                    <option value="arts">Arts</option>
                    <option value="commerce">Commerce</option>
                    <option value="technology">Technology</option>
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
                  Guardian Name
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Guardian Phone
                </label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Guardian ID
                </label>
                <input
                  type="text"
                  name="guardianId"
                  value={formData.guardianId}
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
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Risk Factors Assessment Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-blue-600 text-lg" />
                <h2 className="text-lg font-semibold text-gray-900">Risk Factors Assessment</h2>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaPlus className="text-sm" />
                Add Historic
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="frequentAbsences"
                    checked={formData.riskFactors.frequentAbsences}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Frequent absences (&gt;10 days/semester)</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="belowGradeLevel"
                    checked={formData.riskFactors.belowGradeLevel}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Below grade level performance</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="behavioralIssues"
                    checked={formData.riskFactors.behavioralIssues}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Behavioral issues</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="economicHardship"
                    checked={formData.riskFactors.economicHardship}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Economic hardship</span>
                </label>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="limitedFamilySupport"
                    checked={formData.riskFactors.limitedFamilySupport}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Limited family support</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="peerPressureIssues"
                    checked={formData.riskFactors.peerPressureIssues}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Peer pressure issues</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="mentalHealthConcerns"
                    checked={formData.riskFactors.mentalHealthConcerns}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Mental health concerns</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="previousSchoolTransfers"
                    checked={formData.riskFactors.previousSchoolTransfers}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Previous school transfers</span>
                </label>
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
                placeholder="Enter any additional information about the student's situation, special circumstances, or intervention recommendations..."
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
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium w-full sm:w-auto">
            Approve
          </button>
        </div>
      </div>
    </div>
  )
}

export default Student
