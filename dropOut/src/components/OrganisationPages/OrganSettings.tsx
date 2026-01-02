import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaEdit, FaChevronDown, FaArrowLeft, FaBars } from 'react-icons/fa';
import { useTheme } from '../Hod';
import pe3 from "../../img/pe3.png";
import Profile from '../Forms/Profile';
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar'; 

type RoutePath = 
  | '/org-dash'
  | '/org-schools'
  | '/student-page'
  | '/teacher-page'
  | '/course-timetable'
  | '/exams-grades'
  | '/organ-report'
  | '/organ-settings';

type TabName = 
  | 'Dashboard'
  | 'Schools'
  | 'Students'
  | 'Teachers'
  | 'Courses & Timetable'
  | 'Exams & Grades'
  | 'Reports'
  | 'Settings';

const OrganSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState('UTC-5');
  const [language, setLanguage] = useState('English');
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>('Settings'); 

  const handleNavigation = (path: RoutePath, tabName: TabName) => {
    setActiveTab(tabName);
    console.log(`Navigating to: ${path}`);
    setSidebarOpen(false);
    navigate(path);
  };

  const handleStudentNavigation = (path: string, tabName: string) => {
    console.log(`Navigating to student page: ${path}`);
    // navigate(path);
  };

  const handleNavigationWrapper = (path: string, tabName: string) => {
    handleNavigation(path as RoutePath, tabName as TabName);
  };

  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <OrganizationSidebar
        activeTab={activeTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigation={handleNavigationWrapper}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Responsive Header */}
        <div className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Toggle sidebar"
            >
              <FaBars className="text-lg sm:text-xl" />
            </button>

            {/* Settings Header - Responsive layout */}
            <div className="flex-1 flex items-center justify-center md:justify-start md:ml-2 lg:ml-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={() => window.history.back()}
                  className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors duration-200 flex-shrink-0 ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                  aria-label="Go back"
                >
                  <FaArrowLeft className="text-xs sm:text-sm" />
                </button>
                
                <div className="min-w-0">
                  <h1 className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-200 truncate ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Settings
                  </h1>
                  <p className={`text-xs sm:text-sm transition-colors duration-200 truncate ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Settings of your Profile
                  </p>
                </div>
              </div>
            </div>

            {/* Responsive Navigation Buttons */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {/* Top Navigation - Hidden on small screens */}
              <div className="hidden lg:flex items-center gap-4 text-sm text-gray-600">
                <button 
                  onClick={() => handleStudentNavigation('/student-dash', 'Dashboard')}
                  className="hover:text-orange-600 transition-colors whitespace-nowrap"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => handleStudentNavigation('/student-class', 'My Classes')}
                  className="hover:text-orange-600 transition-colors whitespace-nowrap"
                >
                  Classes
                </button>
                <button 
                  onClick={() => handleStudentNavigation('/my-assignments', 'My Assignments')}
                  className="hover:text-orange-600 transition-colors whitespace-nowrap"
                >
                  Assignments
                </button>
                <button 
                  onClick={() => handleStudentNavigation('/student-settings', 'My Profile')}
                  className="hover:text-orange-600 transition-colors whitespace-nowrap"
                >
                  My Profile
                </button>
              </div>
              
              {/* Save Button - Visible on medium screens and up */}
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 text-sm sm:text-base whitespace-nowrap ml-2">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-3 sm:p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Profile Settings Section */}
              <div className={`rounded-lg border transition-colors duration-200 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <FaUser className="text-blue-600 text-lg sm:text-xl" />
                      <h2 className={`text-base sm:text-lg md:text-xl font-bold transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Profile Settings
                      </h2>
                    </div>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center text-sm sm:text-base">
                      <FaEdit className="text-xs sm:text-sm" />
                      Edit
                    </button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  {/* Profile Picture and Info - Responsive layout */}
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto sm:mx-0">
                      <img 
                        src={pe3} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className={`text-base sm:text-lg md:text-xl font-semibold transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Sarah Willson
                      </h3>
                      <p className={`text-xs sm:text-sm md:text-base transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        HoD of Wesfield High School
                      </p>
                      <button
                        onClick={() => setShowProfile(true)}
                        className="text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm mt-1 sm:mt-2"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Form Fields - Responsive grid */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div>
                        <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Sarah"
                          className={`w-full px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 text-sm sm:text-base ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Willson"
                          className={`w-full px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 text-sm sm:text-base ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div>
                        <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="sarah.willson@gmail.com"
                          className={`w-full px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 text-sm sm:text-base ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className={`w-full px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 text-sm sm:text-base ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div>
                        <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Current Password
                        </label>
                        <input
                          type="password"
                          defaultValue="........"
                          className={`w-full px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 text-sm sm:text-base ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          New Password
                        </label>
                        <input
                          type="password"
                          defaultValue="........"
                          className={`w-full px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 text-sm sm:text-base ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Preferences Section */}
              <div className={`rounded-lg border transition-colors duration-200 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <FaCog className="text-blue-600 text-lg sm:text-xl" />
                    <div>
                      <h2 className={`text-base sm:text-lg md:text-xl font-bold transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        System Preferences
                      </h2>
                      <p className={`text-xs sm:text-sm transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Configure system settings
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div>
                        <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Timezone
                        </label>
                        <div className="relative">
                          <select 
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className={`w-full px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 appearance-none text-sm sm:text-base ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="UTC-5">UTC-5 (Eastern Time)</option>
                            <option value="UTC-6">UTC-6 (Central Time)</option>
                            <option value="UTC-7">UTC-7 (Mountain Time)</option>
                            <option value="UTC-8">UTC-8 (Pacific Time)</option>
                          </select>
                          <FaChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs sm:text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Language
                        </label>
                        <div className="relative">
                          <select 
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className={`w-full px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 appearance-none text-sm sm:text-base ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                          <FaChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs sm:text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs sm:text-sm font-semibold mb-2 sm:mb-3 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Theme
                      </label>
                      <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-6 space-y-2 sm:space-y-0">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="theme"
                            value="light"
                            checked={theme === 'light'}
                            onChange={() => {
                              if (theme === 'dark') {
                                toggleTheme();
                              }
                            }}
                            className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 border-gray-300 focus:ring-orange-500 accent-orange-600"
                          />
                          <span className={`text-xs sm:text-sm transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Light
                          </span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="theme"
                            value="dark"
                            checked={theme === 'dark'}
                            onChange={() => {
                              if (theme === 'light') {
                                toggleTheme();
                              }
                            }}
                            className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 border-gray-300 focus:ring-orange-500 accent-orange-600"
                          />
                          <span className={`text-xs sm:text-sm transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Dark
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Hidden on medium+ screens (moved to header) */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 md:hidden">
                <button className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors duration-200 order-2 sm:order-1 text-sm sm:text-base ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}>
                  Cancel
                </button>
                <button className="px-4 py-2 sm:px-6 sm:py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 order-1 sm:order-2 text-sm sm:text-base">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganSettings;