import React, { useState } from 'react';
import { ChevronDown, Calendar, Users, BookOpen, BarChart3, UserCircle, MessageSquare, Settings, Bell, Search } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaCalendarCheck } from 'react-icons/fa';
import { TbReport } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa6";
import { IoMdTv } from "react-icons/io";
import { TbAlertTriangle } from "react-icons/tb";
import userr from "../../../src/img/userr.png";
import { useNavigate, useLocation } from 'react-router-dom'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MyClasses from './MyClasses';
import Attendance from '../TeacherPages/Attendance';
import DailyAttendance from '../TeacherPages/DailyAttendance'
import Behavior from '../TeacherPages/Behavior'; 
import StudentProfiles from './StudentProfiles';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
  };

  const renderMainContent = () => {
    switch (location.pathname) {
      case '/attendance': 
        return <Attendance />;
      case '/my-classes':
        return <MyClasses />;
      case '/daily-attendance': 
        return <DailyAttendance />;
      case '/behavior-reports':
        return <Behavior />;
          case '/student-profiles':
        return <StudentProfiles />;
      default:
        return <DashboardContent />;
    }
  };

  const statCards = [
    { title: 'My Students', value: '128', subtitle: '+1 from last term', icon: IoIosPeople, color: 'bg-white', iconColor: 'text-blue-500' },
    { title: 'My Courses', value: '6', subtitle: 'Active courses', icon: IoMdTv, color: 'bg-white', iconColor: 'text-green-500' },
    { title: 'At-Risk Students', value: '12', subtitle: 'Needs attention', icon: TbAlertTriangle, color: 'bg-white', iconColor: 'text-red-500', valueColor: 'text-red-600' },
    { title: "Today's Attendance", value: '92%', subtitle: '114 present, 10 absent', icon: FaClipboardCheck, color: 'bg-white', iconColor: 'text-green-500', valueColor: 'text-green-600' }
  ];

  // Updated attendance data for the BarChart with increased absent AND late values
  const attendanceData = [
    { name: 'Mon', present: 115, absent: 8, late: 5 },
    { name: 'Tue', present: 110, absent: 13, late: 5 },
    { name: 'Wed', present: 105, absent: 18, late: 5 },
    { name: 'Thu', present: 113, absent: 10, late: 5 },
    { name: 'Fri', present: 107, absent: 16, late: 5 },
    { name: 'Sat', present: 95, absent: 28, late: 5 },
    { name: 'Sun', present: 90, absent: 33, late: 5 }
  ];

  const flaggedStudents = [
    { name: 'Sarah Johnson', grade: 'Grade 10A', risk: 'High Risk', color: 'bg-red-100 text-red-700' },
    { name: 'Michael Chen', grade: 'Grade 10B', risk: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Emma Davis', grade: 'Grade 10A', risk: 'Low Risk', color: 'bg-green-100 text-green-700' }
  ];

  const recentBehavior = [
    { name: 'Alex Thompson', behavior: 'Excellent participation', time: 'Today, 10:30 AM', type: 'positive' },
    { name: 'James Wilson', behavior: 'Disruptive behavior', time: 'Yesterday, 2:15 PM', type: 'negative' }
  ];

  const schedule = [
    { period: 'Period 1', class: 'Mathematics - Grade 10A', time: '8:00 - 8:45 AM', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
    { period: 'Period 2', class: 'Mathematics - Grade 10B', time: '8:50 - 9:35 AM', color: 'bg-green-500', bgColor: 'bg-green-50' },
    { period: 'Free', class: 'Free Period', time: '9:40 - 10:25 AM', color: 'bg-emerald-600', bgColor: 'bg-green-50' }
  ];

  const alerts = [
    { title: 'Parent meeting scheduled', time: 'Tomorrow, 3:00 PM', type: 'urgent', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { title: 'Grade submission deadline', time: 'Due in 2 days', type: 'medium', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { title: 'New curriculum update', time: 'Review required', type: 'info', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
  ];

  const menuItems = [
    { icon: LiaChalkboardTeacherSolid, label: 'My Classes', path: '/my-classes' },
    { icon: FaClipboardCheck, label: 'Attendance', path: '/attendance' },
    { icon: TbReport, label: 'Behavior Reports', path: '/behavior' },
    { icon: IoIosPeople, label: 'Student Profiles', path: '/student-profiles' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' }
  ];

  // Extract dashboard content to separate component to avoid recursion
  const DashboardContent = () => (
    <main className="flex-1 p-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {statCards.map((card, idx) => (
          <div key={idx} className={`${card.color} rounded-lg p-5 relative shadow-sm border border-gray-200`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">{card.title}</p>
                <h3 className={`text-3xl font-bold ${card.valueColor || 'text-gray-900'}`}>{card.value}</h3>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-xs text-gray-500">{card.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Larger */}
        <div className="col-span-2 space-y-6">
          {/* Attendance Overview with BarChart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Attendance Overview</h2>
              <button className="text-sm text-orange-500 font-medium">View Details</button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#8884d8" name="Present" />
                  <Bar dataKey="absent" stackId="a" fill="#82ca9d" name="Absent" />
                  <Bar dataKey="late" fill="#ffc658" name="Late" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded flex items-center gap-2">
              <span className="text-yellow-700 text-sm">⚠️ 3 students with chronic absences this week</span>
            </div>
          </div>

          {/* Assignments & Quizzes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Assignments & Quizzes</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Pending to Grade</h3>
                <div className="text-3xl font-bold text-red-600 mb-1">24</div>
                <p className="text-xs text-gray-500">assignments</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Upcoming to Publish</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">3</div>
                <p className="text-xs text-gray-500">assignments</p>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div key={idx} className={`${item.bgColor} rounded-lg p-4 border border-gray-200`}>
                  <div className="flex items-center gap-4">
                    <div className={`${item.color} text-white px-3 py-1 rounded text-sm font-medium`}>
                      {item.period}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.class}</p>
                    </div>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-1 text-sm">
                + Add Marks
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-1 text-sm">
                + Log Behavior
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Flagged Students */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Flagged Students</h2>
              <button className="text-sm text-orange-500 font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {flaggedStudents.map((student, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.grade}</p>
                  </div>
                  <span className={`${student.color} px-2 py-1 rounded text-xs font-medium`}>
                    {student.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Behavior */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Behavior</h2>
              <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">+ Log Report</button>
            </div>
            <div className="space-y-3">
              {recentBehavior.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${item.type === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{item.name} - {item.behavior}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Tasks</h2>
            <div className="space-y-3">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg border ${alert.bgColor} ${alert.borderColor}`}>
                  <div className={`${alert.type === 'urgent' ? 'bg-red-500' : alert.type === 'medium' ? 'bg-orange-500' : 'bg-blue-500'} text-white px-2 py-1 rounded text-xs font-medium`}>
                    {alert.type === 'urgent' ? 'Urgent' : alert.type === 'medium' ? 'Medium' : 'Info'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">Westfield High School</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, teachers, courses..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={userr} alt="User profile" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm font-medium">Sarah Wilson</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Filters</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2">
            All Grades <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2">
            All Classes <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2">
            Current Term <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-4 py-1 bg-orange-500 text-white rounded text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date Filter
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <button 
              className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 mb-2 ${
                activeTab === 'Dashboard' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
              onClick={() => handleNavigation('/', 'Dashboard')}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            {menuItems.map((item, idx) => (
              <button 
                key={idx} 
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 ${
                  activeTab === item.label 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => handleNavigation(item.path, item.label)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {renderMainContent()}
      </div>
    </div>
  );
}