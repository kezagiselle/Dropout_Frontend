import { useState } from 'react'
import { FaArrowLeft, FaCalendarAlt, FaUserPlus, FaPrint, FaPlus, FaTrash } from 'react-icons/fa'
import { IoIosPeople, IoIosCheckmarkCircle, IoIosWarning } from 'react-icons/io'
import { FaUser } from "react-icons/fa";
import TeacherProfile from './TeacherProfile';

interface EditProfileProps {
  onBack: () => void;
}

function EditProfile({ onBack }: EditProfileProps) {
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [interventionLog] = useState([
    {
      id: 1,
      title: "Parent Conference Scheduled",
      description: "Meeting with parents scheduled for next week to discuss attendance issues and academic performance.",
      author: "Ms. Willson (HoD)",
      timeAgo: "2 days ago",
      type: "conference"
    },
    {
      id: 2,
      title: "Math Tutoring Assigned",
      description: "Student enrolled in after-school math tutoring program. Sessions scheduled for Tuesdays and Thursdays.",
      author: "Mr. Willson (HoD)",
      timeAgo: "1 week ago",
      type: "tutoring"
    }
  ]);

  const getInterventionColor = (type: string) => {
    switch (type) {
      case 'conference':
        return 'border-l-blue-500 bg-blue-50';
      case 'tutoring':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  if (showTeacherProfile) {
    return <TeacherProfile onBack={() => setShowTeacherProfile(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-12 sm:pt-16 md:pt-20">
      {/* Main Content Card */}
      <div className="w-full max-w-7xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12 min-h-[600px] sm:min-h-[700px] flex flex-col">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Teacher Profile
            </h1>
            <p className="text-sm text-gray-600">
              Manage Teachers Activities
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

        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Dashboard</span>
            <span className="mx-2">&gt;</span>
            <span className="hover:text-gray-900 cursor-pointer">Teachers</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 font-medium">Robert Smith</span>
          </nav>
        </div>

        {/* Teacher Information Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              {/* Teacher Avatar */}
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUser className="w-10 h-10 text-blue-600" />
              </div>
              
              {/* Teacher Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Robert Smith</h2>
                <p className="text-gray-600 mb-1">Mathematical • Teacher ID: #TC-2024-0847</p>
                <p className="text-gray-600">Westfield High School</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaCalendarAlt className="text-sm" />
                Schedule Meeting
              </button>
              <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaUserPlus className="text-sm" />
                Assign as Mentor
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaPrint className="text-sm" />
                Print Report
              </button>
            </div>
          </div>
        </div>

        {/* Student Risk Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Students */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">60</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <IoIosPeople className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Low Risk */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Low Risk</p>
                <p className="text-3xl font-bold text-green-600">40</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <IoIosCheckmarkCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Medium Risk */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Medium Risk</p>
                <p className="text-3xl font-bold text-orange-600">12</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <IoIosWarning className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          {/* High Risk */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">High Risk</p>
                <p className="text-3xl font-bold text-red-600">8</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <IoIosWarning className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Intervention Log Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Intervention Log</h3>
            <button 
              onClick={() => setShowTeacherProfile(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm"
            >
              <FaPlus className="text-sm" />
              Add Note
            </button>
          </div>

          {/* Intervention Entries */}
          <div className="space-y-4">
            {interventionLog.map((entry) => (
              <div key={entry.id} className={`border-l-4 ${getInterventionColor(entry.type)} p-4 rounded-r-lg`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{entry.title}</h4>
                    <p className="text-gray-600 mb-2">{entry.description}</p>
                    <p className="text-sm text-gray-500">By: {entry.author}</p>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    {entry.timeAgo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delete Profile Button */}
        <div className="flex justify-end mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
            <FaTrash className="text-sm" />
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile