import React, { useState } from 'react';
import { Users, Calendar, TrendingUp, AlertTriangle, MessageSquare, Video, FileText, ChevronDown, Bell, Menu, X } from 'lucide-react';
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import pe1 from "../../img/pe1.png";
import pe2 from "../../img/pe2.png";
import { useUserAuth } from '../../context/useUserAuth';
import ParentSidebar from './ParentSidebar'; 

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
          {/* Left Section - Mobile Menu Button and School Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.schoolName || 'School Name'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <button 
                onClick={() => handleNavigation('/parent-dashboard', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/parent-children', 'My Children')}
                className="hover:text-orange-600 transition-colors"
              >
                My Children
              </button>
              <button 
                onClick={() => handleNavigation('/parent-messages', 'Messages')}
                className="hover:text-orange-600 transition-colors"
              >
                Messages
              </button>
              <button 
                onClick={() => handleNavigation('/parent-settings', 'Settings')}
                className="hover:text-orange-600 transition-colors"
              >
                Settings
              </button>
            </div>
          </div>

          {/* Right Section - Calendar, Notifications, Profile */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            {/* Calendar - Hidden on mobile, visible on tablet and up */}
            <div className="hidden sm:flex items-center gap-1 lg:gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden lg:block" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>

            {/* Profile - Compact on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              <img src={userr} alt="User profile" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" />
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Parent'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Use the ParentSidebar component */}
        <ParentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your children's performance.</p>
          </div>

          {/* Top Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {/* My Children */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">My Children</h3>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-xs text-gray-500 mt-1">Total children linked</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Attendance Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">Attendance Overview</h3>
                  <p className="text-3xl font-bold">92%</p>
                  <p className="text-xs text-green-600 mt-1">Monthly trend</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Academic Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">Academic Status</h3>
                  <p className="text-3xl font-bold">3.4</p>
                  <p className="text-xs text-purple-600 mt-1">GPA / 4.0 - Improving</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Behavior Alerts */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">Behavior Alerts</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div>
                      <p className="text-3xl font-bold text-red-600">2</p>
                      <p className="text-xs text-gray-500">Incidents</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-600">1</p>
                      <p className="text-xs text-gray-500">Commendations</p>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* My Children Section with Attendance & Behavior cards below */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">My Children</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* John Doe */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={pe1} alt="John Doe" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h3 className="font-semibold">John Doe</h3>
                        <p className="text-sm text-gray-600">Grade 10</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                      Medium Risk
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Attendance:</span>
                      <span className="font-semibold">88%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GPA:</span>
                      <span className="font-semibold">3.1</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-200 text-blue-800 py-2 rounded-lg hover:bg-blue-300 transition">
                    View Full Profile
                  </button>
                </div>

                {/* Jane Doe */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={pe2} alt="Jane Doe" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h3 className="font-semibold">Jane Doe</h3>
                        <p className="text-sm text-gray-600">Grade 7</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Low Risk
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Attendance:</span>
                      <span className="font-semibold">95%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GPA:</span>
                      <span className="font-semibold">3.8</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-200 text-blue-800 py-2 rounded-lg hover:bg-blue-300 transition">
                    View Full Profile
                  </button>
                </div>
              </div>

              {/* Attendance & Behavior cards moved here under My Children */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Attendance Trend - Minimized */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Attendance Trend</h3>
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="relative h-40">
                    <svg className="w-full h-full" viewBox="0 0 300 120">
                      <line x1="30" y1="100" x2="270" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                      <line x1="30" y1="60" x2="270" y2="60" stroke="#e5e7eb" strokeWidth="1" />
                      <line x1="30" y1="20" x2="270" y2="20" stroke="#e5e7eb" strokeWidth="1" />
                      
                      <polyline
                        points="50,75 90,65 130,70 170,62 210,58 250,55"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      
                      {[50, 90, 130, 170, 210, 250].map((x, i) => {
                        const y = [75, 65, 70, 62, 58, 55][i];
                        return (
                          <circle key={i} cx={x} cy={y} r="3" fill="#10b981" />
                        );
                      })}
                      
                      <text x="35" y="105" fontSize="8" fill="#6b7280">0</text>
                      <text x="30" y="65" fontSize="8" fill="#6b7280">50</text>
                      <text x="25" y="25" fontSize="8" fill="#6b7280">100</text>
                      
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                        <text key={day} x={70 + i * 40} y="115" fontSize="8" fill="#6b7280" textAnchor="middle">
                          {day}
                        </text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Behavior Log - Minimized */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Behavior Log</h3>
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                      <span className="text-xs">Late submission</span>
                      <span className="px-2 py-0.5 bg-red-200 text-red-800 text-xs rounded-full">
                        Incident
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                      <span className="text-xs">Absent without excuse</span>
                      <span className="px-2 py-0.5 bg-red-200 text-red-800 text-xs rounded-full">
                        Incident
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                      <span className="text-xs">Class participation</span>
                      <span className="px-2 py-0.5 bg-green-200 text-green-800 text-xs rounded-full">
                        Commendation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Communication</h2>
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-semibold mb-4">Messages</h3>
                <div className="space-y-3">
                  <div className="border-b pb-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium">Teacher Smith</p>
                      <p className="text-xs text-gray-500">Sept 20</p>
                    </div>
                    <p className="text-sm text-gray-600">Math Assignment Feedback</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-300 text-blue-900 py-3 rounded-lg hover:bg-blue-400 transition flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message Teacher
                  </button>
                  <button className="w-full bg-green-300 text-green-900 py-3 rounded-lg hover:bg-green-400 transition flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" />
                    Request Meeting
                  </button>
                </div>
              </div>

              {/* Announcements with colored rectangles */}
              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <h3 className="font-semibold mb-4">Announcements</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Parent-Teacher</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Meeting</span> on Oct 2
                  </p>
                  <p className="text-gray-700">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Midterm</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">exams</span> start Oct 15
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="bg-blue-300 text-blue-900 py-3 rounded-lg hover:bg-blue-400 transition font-medium">
                Message Teacher
              </button>
              <button className="bg-orange-400 text-white py-3 rounded-lg hover:bg-orange-500 transition font-medium">
                Check Attendance
              </button>
              <button className="bg-green-300 text-green-900 py-3 rounded-lg hover:bg-green-400 transition font-medium">
                View Report Card
              </button>
              <button className="bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-medium">
                Update Profile
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}