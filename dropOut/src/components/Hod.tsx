import { useState, createContext, useContext } from 'react'
import Student from './HodPages/Student';
import Teachers from './HodPages/Teachers';
import Courses from './HodPages/Courses';
import Reports from './HodPages/Reports';
import Attendance from './HodPages/Attendance';
import Exams from './HodPages/Exams';
import Settings from './HodPages/Settings';
import TeacherForm from './Forms/Teacher';
import StudentForm from './Forms/Student';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import userr from "../../src/img/userr.png";
import pe1 from "../../src/img/pe1.png";
import pe2 from "../../src/img/pe2.png";
import pe3 from "../../src/img/pe3.png";
import { IoIosNotifications } from "react-icons/io"
import { FaSave } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";

import { IoMdSettings } from "react-icons/io";
import { TbReport } from "react-icons/tb";







// Create theme context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const Hod = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'students' | 'teachers' | 'courses' | 'attendance' | 'exams' | 'reports' | 'settings'>('dashboard')
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);

  // Chart data for risk level trends
  const riskTrendData = [
    {
      name: 'Week 1',
      highRisk: 12,
      mediumRisk: 25,
      lowRisk: 45,
    },
    {
      name: 'Week 2',
      highRisk: 15,
      mediumRisk: 28,
      lowRisk: 42,
    },
    {
      name: 'Week 3',
      highRisk: 18,
      mediumRisk: 32,
      lowRisk: 38,
    },
    {
      name: 'Week 4',
      highRisk: 22,
      mediumRisk: 35,
      lowRisk: 35,
    },
    {
      name: 'Week 5',
      highRisk: 19,
      mediumRisk: 30,
      lowRisk: 40,
    },
    {
      name: 'Week 6',
      highRisk: 16,
      mediumRisk: 28,
      lowRisk: 43,
    },
    {
      name: 'Week 7',
      highRisk: 14,
      mediumRisk: 26,
      lowRisk: 45,
    },
  ];

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  const themeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`min-h-screen transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {/* Header */}
        <header className={`shadow-sm border-b transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        } px-3 sm:px-4 lg:px-6 py-3 sm:py-4`}>
          {/* Top Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-3 lg:mb-4 space-y-3 lg:space-y-0">
            {/* Left Side - School Selector and Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 w-full lg:w-auto">
              {/* School Selector */}
              <div className={`flex items-center space-x-2 cursor-pointer px-3 sm:px-4 py-2 rounded-lg border transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}>
                <h1 className={`text-sm sm:text-base lg:text-lg font-semibold transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Westfield High School</h1>
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search students, teachers, courses..."
                  className={`w-full sm:w-64 lg:w-80 pl-8 sm:pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg transition-colors duration-200 text-sm sm:text-base ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                />
                <svg className="absolute left-2 sm:left-3 top-2.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Side - Date Picker, Notifications and User Profile */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Date Range Picker - Hidden on mobile */}
              <div className={`hidden sm:flex items-center space-x-2 cursor-pointer px-3 sm:px-4 py-2 rounded-lg border transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Jan 15 - Feb 15, 2024</span>
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Notifications */}
              <div className="relative cursor-pointer">
                <IoIosNotifications className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>

              {/* User Profile */}
              <div className={`flex items-center space-x-2 sm:space-x-3 cursor-pointer px-2 sm:px-3 py-2 rounded-lg border transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={userr} alt="Sarah Wilson" className="w-full h-full object-cover rounded-full" />
                </div>
                <span className={`text-xs sm:text-sm font-medium transition-colors duration-200 hidden sm:block ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Sarah Wilson</span>
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 hidden sm:block transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg transition-colors duration-200 lg:hidden ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-4">
            <span className={`text-xs sm:text-sm font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>Filters:</span>
            
            <select className={`px-3 py-2 border rounded-lg transition-colors duration-200 font-semibold ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}>
              <option>All Grades</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>

            <select className={`px-3 py-2 border rounded-lg transition-colors duration-200 font-semibold ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}>
              <option>All Classes</option>
              <option>Class A</option>
              <option>Class B</option>
              <option>Class C</option>
            </select>

            <select className={`px-3 py-2 border rounded-lg transition-colors duration-200 font-semibold ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}>
              <option>Current Term</option>
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Term 3</option>
            </select>

            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center space-x-2">
              <FaSave className="w-4 h-4" />
              <span>Save Filter</span>
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row">
          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
          )}

          {/* Sidebar */}
          <nav className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sm:w-72 lg:w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 shadow-lg lg:shadow-sm lg:min-h-screen p-3 sm:p-4 order-2 lg:order-1 transition-colors duration-200 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Mobile Close Button */}
            <div className="flex justify-between items-center mb-4 sm:mb-6 lg:hidden">
              <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Menu</h3>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <div 
                className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'dashboard' 
                    ? 'bg-orange-500 text-white' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-orange-600 hover:text-white'
                      : 'text-gray-600 hover:bg-orange-600 hover:text-white'
                }`}
                onClick={() => { setActiveView('dashboard'); closeMobileMenu(); }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm sm:text-base font-medium">Dashboard</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'students' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-orange-600 hover:text-white'
                      : 'text-gray-600 hover:bg-orange-600 hover:text-white'
                }`}
                onClick={() => { setActiveView('students'); closeMobileMenu(); }}
              >
                <IoIosPeople className="w-5 h-5" />
                <span className="font-medium">Students</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'teachers' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-orange-600 hover:text-white'
                      : 'text-gray-600 hover:bg-orange-600 hover:text-white'
                }`}
                onClick={() => { setActiveView('teachers'); closeMobileMenu(); }}
              >
                <LiaChalkboardTeacherSolid className="w-6 h-6 font-bold" />
                <span className="font-medium">Teachers</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'courses' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-orange-600 hover:text-white'
                      : 'text-gray-600 hover:bg-orange-600 hover:text-white'
                }`}
                onClick={() => { setActiveView('courses'); closeMobileMenu(); }}
              >
                <FaCalendarAlt className="w-5 h-5" />
                <span className="font-medium">Courses & Timetable</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'attendance' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-orange-600 hover:text-white'
                      : 'text-gray-600 hover:bg-orange-600 hover:text-white'
                }`}
                onClick={() => { setActiveView('attendance'); closeMobileMenu(); }}
              >
                <FaClipboardCheck className="w-5 h-5" />
                <span className="font-medium">Attendance</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'exams' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-orange-600 hover:text-white'
                      : 'text-gray-600 hover:bg-orange-600 hover:text-white'
                }`}
                onClick={() => { setActiveView('exams'); closeMobileMenu(); }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="font-medium">Exams/Grades</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'reports' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-orange-600 hover:text-white'
                      : 'text-gray-600 hover:bg-orange-600 hover:text-white'
                }`}
                onClick={() => { setActiveView('reports'); closeMobileMenu(); }}
              >
                <TbReport className="w-5 h-5" />
                <span className="font-medium">Reports</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'settings' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-orange-600 hover:text-white'
                      : 'text-gray-600 hover:bg-orange-600 hover:text-white'
                }`}
                onClick={() => { setActiveView('settings'); closeMobileMenu(); }}
              >
                <IoMdSettings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className={`flex-1 p-3 sm:p-4 lg:p-6 order-1 lg:order-2 transition-colors duration-200 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {activeView === 'dashboard' && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {/* Total Students */}
                  <div className={`rounded-lg shadow-sm p-4 sm:p-6 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Total Students</h3>
                        <p className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>1,247</p>
                        <p className="text-xs sm:text-sm text-green-500 font-medium">↑+3.2% vs last term</p>
                      </div>
                      <div className="flex items-center justify-center flex-shrink-0 ml-2">
                        <IoIosPeople className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Total Teachers */}
                  <div className={`rounded-lg shadow-sm p-4 sm:p-6 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Total Teachers</h3>
                        <p className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>72</p>
                        <p className="text-xs sm:text-sm text-green-500 font-medium">↑+3.2% vs last term</p>
                      </div>
                      <div className="flex items-center justify-center flex-shrink-0 ml-2">
                        <IoIosPeople className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* At-Risk Students */}
                  <div className={`rounded-lg shadow-sm p-4 sm:p-6 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>At-Risk Students</h3>
                      {/* Alert Icon - On the same line as title */}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-red-600">47</p>
                      <p className="text-xs sm:text-sm text-red-400 font-medium">↓-8.1% vs last term</p>
                    </div>
                  </div>

                  {/* Today's Attendance */}
                  <div className={`rounded-lg shadow-sm p-4 sm:p-6 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Today's Attendance</h3>
                      {/* Clipboard Checkmark Icon - On the same line as title */}
                      <FaClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    </div>
                    <div>
                        <p className="text-xl sm:text-2xl font-bold text-green-600">92.4%</p>
                        <p className="text-xs sm:text-sm text-gray-600">1,152 present / 47 absent</p>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Left Column - Charts and Teacher Info */}
                  <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    {/* Risk Level Trends Chart */}
                    <div className={`rounded-lg shadow-sm border p-4 sm:p-6 transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Risk Level Trends</h3>
                      <div className="h-80 sm:h-96 lg:h-[28rem]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            width={500}
                            height={300}
                            data={riskTrendData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                            <XAxis 
                              dataKey="name" 
                              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                              fontSize={12}
                            />
                            <YAxis 
                              yAxisId="left" 
                              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                              fontSize={12}
                            />
                            <YAxis 
                              yAxisId="right" 
                              orientation="right" 
                              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                              fontSize={12}
                            />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                                border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
                                borderRadius: '8px',
                                color: theme === 'dark' ? '#ffffff' : '#000000'
                              }}
                            />
                            <Legend />
                            <Line 
                              yAxisId="left" 
                              type="monotone" 
                              dataKey="highRisk" 
                              stroke="#ef4444" 
                              activeDot={{ r: 8 }}
                              name="High Risk"
                            />
                            <Line 
                              yAxisId="right" 
                              type="monotone" 
                              dataKey="mediumRisk" 
                              stroke="#f59e0b" 
                              name="Medium Risk"
                            />
                            <Line 
                              yAxisId="left" 
                              type="monotone" 
                              dataKey="lowRisk" 
                              stroke="#10b981" 
                              name="Low Risk"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Teacher Roster Today */}
                    <div className={`rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 transition-colors duration-200 mt-6 sm:mt-12 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Teacher Roster Today</h3>
                      
                      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Available</span>
                          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-800 rounded-lg text-sm sm:text-base font-medium">28</span>
                        </div>
                          <div className="flex items-center justify-between">
                          <span className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>On Leave</span>
                          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-100 text-orange-800 rounded-lg text-sm sm:text-base font-medium">3</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Substitutes Needed</span>
                          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 text-red-800 rounded-lg text-sm sm:text-base font-medium">2</span>
                        </div>
                      </div>

                      <div className={`border-t pt-4 sm:pt-6 transition-colors duration-200 ${
                        theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                      }`}>
                        <h4 className={`text-sm sm:text-base font-bold mb-3 sm:mb-4 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Free Periods Now</h4>
                        <div className="space-y-1 sm:space-y-2">
                          <p className={`text-sm sm:text-base transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>Ms. Rodriguez</p>
                          <p className={`text-sm sm:text-base transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>Mr. Thompson</p>
                          <p className={`text-sm sm:text-base transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>Dr. Kim</p>
                        </div>
                      </div>
                      </div>

                      {/* Quick Actions */}
                      <div className={`rounded-lg shadow-sm border p-4 sm:p-6 transition-colors duration-200 ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      }`}>
                        <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Quick Actions</h3>
                        
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                          <button 
                            onClick={() => {
                              console.log('Add Teacher button clicked');
                              setShowTeacherForm(true);
                            }}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center justify-center space-x-1 text-xs sm:text-sm"
                          >
                            <span className="text-xs sm:text-sm">+</span>
                            <span>Add Teacher</span>
                          </button>
                          <button 
                            onClick={() => {
                              console.log('Add Student button clicked');
                              setShowStudentForm(true);
                            }}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center justify-center space-x-1 text-xs sm:text-sm"
                          >
                            <span className="text-xs sm:text-sm">+</span>
                            <span>Add Student</span>
                          </button>
                        </div>
                      </div>
                  </div>

                  {/* Right Column - Flagged Students and Alerts */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Flagged Students */}
                    <div className={`rounded-lg shadow-sm border p-4 sm:p-6 transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Flagged Students</h3>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img src={pe1} alt="Alex Johnson" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm font-medium truncate transition-colors duration-200 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Alex Johnson</p>
                            <p className={`text-xs transition-colors duration-200 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>Grade 10A</p>
                          </div>
                          <span className="px-2 sm:px-3 py-1 bg-orange-400 text-white rounded-full text-xs font-medium">High Risk</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img src={pe2} alt="Emma Davis" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium transition-colors duration-200 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Emma Davis</p>
                            <p className={`text-sm transition-colors duration-200 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>Grade 9B</p>
                          </div>
                          <span className="px-3 py-1 bg-orange-400 text-white rounded-full text-xs font-medium">Med Risk</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img src={pe3} alt="Michael Chen" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium transition-colors duration-200 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Michael Chen</p>
                            <p className={`text-sm transition-colors duration-200 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>Grade 11A</p>
                          </div>
                          <span className="px-3 py-1 bg-orange-400 text-white rounded-full text-xs font-medium">High Risk</span>
                        </div>
                      </div>

                      <button className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-blue-300 text-white hover:bg-blue-400'
                      }`}>
                        View All Flagged Students
                      </button>
                    </div>

                    {/* Alerts & Tasks */}
                    <div className={`rounded-lg shadow-sm border p-6 transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Alerts & Tasks</h3>
                      
                      <div className="space-y-3">
                        {/* First Alert - Pink Background */}
                        <div className="flex items-start space-x-3 p-4 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors cursor-pointer">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">5 students hit High Risk this week</p>
                            <p className="text-xs text-gray-600">Requires immediate intervention</p>
                          </div>
                        </div>

                        {/* Second Alert - Yellow Background */}
                        <div className="flex items-start space-x-3 p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors cursor-pointer">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">Timetable overlap detected</p>
                            <p className="text-xs text-gray-600">Room 204 - Period 3</p>
                          </div>
                        </div>

                        {/* Third Alert - Blue Background */}
                        <div className="flex items-start space-x-3 p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">12 pending approvals</p>
                            <p className="text-xs text-gray-600">8 registrations, 4 timetable changes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeView === 'students' && <Student />}
            {activeView === 'teachers' && <Teachers />}
            {activeView === 'courses' && <Courses />}
            {activeView === 'reports' && <Reports />}
            {activeView === 'attendance' && <Attendance />}
            {activeView === 'exams' && <Exams />}
            {activeView === 'settings' && <Settings />}
            
            {/* Form Components */}
            {showTeacherForm && (
              <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
                  <TeacherForm onBack={() => setShowTeacherForm(false)} />
                </div>
              </div>
            )}
            {showStudentForm && (
              <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
                  <StudentForm onBack={() => setShowStudentForm(false)} />
                </div>
              </div>
            )}
            
            {/* Debug Info */}
            {import.meta.env.DEV && (
              <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs">
                Teacher Form: {showTeacherForm ? 'true' : 'false'}, Student Form: {showStudentForm ? 'true' : 'false'}
              </div>
            )}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default Hod
