import { useState, createContext, useContext } from 'react'
import Student from './HodPages/Student';
import Teachers from './HodPages/Teachers';
import Courses from './HodPages/Courses';
import Reports from './HodPages/Reports';
import Attendance from './HodPages/Attendance';
import Communication from './HodPages/Communication';
import Settings from './HodPages/Settings';
import userr from "../../src/img/userr.png";
import { IoIosNotifications } from "react-icons/io"
import { FaSave } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbReport } from "react-icons/tb";






// Create theme context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const Hod = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'students' | 'teachers' | 'courses' | 'attendance' | 'exams' | 'reports' | 'communication' | 'settings'>('dashboard')
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        } px-6 py-4`}>
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Left Side - School Selector and Search */}
            <div className="flex items-center space-x-6">
              {/* School Selector */}
              <div className="flex items-center space-x-2 cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 transition-colors">
                <h1 className={`text-lg font-semibold transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Westfield High School</h1>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students, teachers, courses..."
                  className={`w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Side - Date Picker, Notifications and User Profile */}
            <div className="flex items-center space-x-4">
              {/* Date Range Picker */}
              <div className="flex items-center space-x-2 cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 transition-colors">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Jan 15 - Feb 15, 2024</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Notifications */}
              <div className="relative cursor-pointer">
                <IoIosNotifications className="w-6 h-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 cursor-pointer bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={userr} alt="Sarah Wilson" className="w-full h-full object-cover rounded-full" />
                </div>
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Sarah Wilson</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center space-x-4 mt-4">
            <span className={`text-sm font-medium transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>Filters:</span>
            
            <select className={`px-3 py-2 border rounded-lg transition-colors duration-200 ${
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

            <select className={`px-3 py-2 border rounded-lg transition-colors duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}>
              <option>All Classes</option>
              <option>Class A</option>
              <option>Class B</option>
              <option>Class C</option>
            </select>

            <select className={`px-3 py-2 border rounded-lg transition-colors duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}>
              <option>Current Term</option>
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Term 3</option>
            </select>

            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center space-x-2">
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
          <nav className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 shadow-lg lg:shadow-sm lg:min-h-screen p-4 order-2 lg:order-1 transition-colors duration-200 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Mobile Close Button */}
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h3 className={`text-lg font-semibold transition-colors duration-200 ${
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

            <div className="space-y-2">
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'dashboard' 
                    ? 'bg-orange-500 text-white' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => { setActiveView('dashboard'); closeMobileMenu(); }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">Dashboard</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'students' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
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
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
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
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
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
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => { setActiveView('attendance'); closeMobileMenu(); }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Attendance</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'exams' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
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
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => { setActiveView('reports'); closeMobileMenu(); }}
              >
                <TbReport className="w-5 h-5" />
                <span className="font-medium">Reports</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'communication' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => { setActiveView('communication'); closeMobileMenu(); }}
              >
                <FaComments className="w-5 h-5" />
                <span className="font-medium">Communications</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'settings' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => { setActiveView('settings'); closeMobileMenu(); }}
              >
                <IoMdSettings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className={`flex-1 p-6 order-1 lg:order-2 transition-colors duration-200 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {activeView === 'dashboard' && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Total Students */}
                  <div className={`rounded-lg shadow-sm p-6 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Total Students</h3>
                        <p className={`text-2xl font-bold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>1,247</p>
                        <p className="text-sm text-green-600 font-medium">↑+3.2% vs last term</p>
                      </div>
                    </div>
                  </div>

                  {/* Total Teachers */}
                  <div className={`rounded-lg shadow-sm p-6 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Total Teachers</h3>
                        <p className={`text-2xl font-bold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>72</p>
                        <p className="text-sm text-green-600 font-medium">↑+3.2% vs last term</p>
                      </div>
                    </div>
                  </div>

                  {/* At-Risk Students */}
                  <div className={`rounded-lg shadow-sm p-6 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>At-Risk Students</h3>
                        <p className="text-2xl font-bold text-red-600">47</p>
                        <p className="text-sm text-red-600 font-medium">↓-8.1% vs last term</p>
                      </div>
                    </div>
                  </div>

                  {/* Today's Attendance */}
                  <div className={`rounded-lg shadow-sm p-6 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Today's Attendance</h3>
                        <p className="text-2xl font-bold text-green-600">92.4%</p>
                        <p className="text-sm text-gray-600">1,152 present / 47 absent</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Left Column - Charts and Teacher Info */}
                  <div className="xl:col-span-2 space-y-6">
                    {/* Risk Level Trends Chart */}
                    <div className={`rounded-lg shadow-sm border p-6 transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <h2 className={`text-lg font-semibold mb-4 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Risk Level Trends</h2>
                      
                      {/* Chart Placeholder */}
                      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <p className="text-gray-600 font-medium">Risk Level Trends Chart</p>
                          <p className="text-sm text-gray-500">Jan - Jun 2024</p>
                          <div className="flex items-center justify-center space-x-4 mt-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">High Risk</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">Medium Risk</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">Low Risk</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher Roster and Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Teacher Roster Today */}
                      <div className={`rounded-lg shadow-sm border p-6 transition-colors duration-200 ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      }`}>
                        <h3 className={`text-lg font-semibold mb-4 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Teacher Roster Today</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm transition-colors duration-200 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>Available</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">28</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm transition-colors duration-200 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>On Leave</span>
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">3</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm transition-colors duration-200 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>Substitutes Needed</span>
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">2</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className={`text-sm font-medium mb-2 transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Free Periods Now</h4>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">Ms. Rodriguez</p>
                            <p className="text-sm text-gray-600">Mr. Thompson</p>
                            <p className="text-sm text-gray-600">Dr. Kim</p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className={`rounded-lg shadow-sm border p-6 transition-colors duration-200 ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      }`}>
                        <h3 className={`text-lg font-semibold mb-4 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Quick Actions</h3>
                        
                        <div className="space-y-3">
                          <button className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                            + Add Teacher
                          </button>
                          <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
                            + Add Student
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Flagged Students and Alerts */}
                  <div className="space-y-6">
                    {/* Flagged Students */}
                    <div className={`rounded-lg shadow-sm border p-6 transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Flagged Students</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">AJ</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Alex Johnson</p>
                            <p className="text-sm text-gray-600">Grade 10A</p>
                          </div>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">High Risk</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-green-600">ED</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Emma Davis</p>
                            <p className="text-sm text-gray-600">Grade 9B</p>
                          </div>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Med Risk</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600">MC</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Michael Chen</p>
                            <p className="text-sm text-gray-600">Grade 11A</p>
                          </div>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">High Risk</span>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
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
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">5 students hit High Risk this week</p>
                            <p className="text-xs text-gray-600">Requires immediate intervention</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Timetable overlap detected</p>
                            <p className="text-xs text-gray-600">Room 204 - Period 3</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">12 pending approvals</p>
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
            {activeView === 'communication' && <Communication />}
            {activeView === 'settings' && <Settings />}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default Hod
