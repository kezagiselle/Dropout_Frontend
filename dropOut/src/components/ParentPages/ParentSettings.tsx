import { useState } from 'react';
import { FaUser, FaCog, FaEdit, FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '../Hod';
import pe3 from "../../img/pe3.png";
import Profile from '../TeacherPages/ProfileForm';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';
import userr from "../../../src/img/userr.png";
import { Calendar, Bell, Menu, X, ChevronDown } from 'lucide-react';
import StudentSidebar from './ParentSidebar';
const ParentSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const [timezone, setTimezone] = useState('UTC-5');
  const [language, setLanguage] = useState('English');
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('My Profile');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} />;
  }

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
                onClick={() => handleNavigation('/student-dash', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/student-class', 'My Classes')}
                className="hover:text-orange-600 transition-colors"
              >
                Classes
              </button>
              <button 
                onClick={() => handleNavigation('/my-assignments', 'My Assignments')}
                className="hover:text-orange-600 transition-colors"
              >
                Assignments
              </button>
              <button 
                onClick={() => handleNavigation('/student-settings', 'My Profile')}
                className="hover:text-orange-600 transition-colors"
              >
                My Profile
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
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Student'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <StudentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          <div className="w-full max-w-none">
            {/* Settings Header - Centered with content */}
            <div className={`p-4 sm:p-6 border-b transition-colors duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="w-full max-w-none">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Back Button */}
                  <button 
                    onClick={() => window.history.back()}
                    className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 flex-shrink-0"
                    aria-label="Go back"
                  >
                    <FaArrowLeft className="text-sm" />
                  </button>
                  
                  <div className="min-w-0">
                    <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-200 truncate ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Settings
                    </h1>
                    <p className={`text-sm sm:text-base transition-colors duration-200 truncate ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Manage your account settings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="w-full max-w-none space-y-6 sm:space-y-8">
                {/* Profile Settings Section */}
                <div className={`rounded-lg border transition-colors duration-200 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <FaUser className="text-blue-600 text-xl" />
                        <h2 className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Profile Settings
                        </h2>
                      </div>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center">
                        <FaEdit className="text-sm" />
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    {/* Profile Picture and Info */}
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mx-auto sm:mx-0">
                        <img 
                          src={pe3} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className={`text-lg sm:text-xl font-semibold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {user?.name || 'Alex Johnson'}
                        </h3>
                        <p className={`text-sm sm:text-base transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Student at {user?.schoolName || 'Westfield High School'}
                        </p>
                        <button
                          onClick={() => setShowProfile(true)}
                          className="text-orange-600 hover:text-orange-700 font-medium text-sm mt-2"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user?.name?.split(' ')[0] || 'Alex'}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user?.name?.split(' ').slice(1).join(' ') || 'Johnson'}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={user?.email || 'alex.johnson@student.westfield.edu'}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Student ID
                          </label>
                          <input
                            type="text"
                            defaultValue={user?.studentId || 'STU001'}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Current Password
                          </label>
                          <input
                            type="password"
                            defaultValue="........"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            New Password
                          </label>
                          <input
                            type="password"
                            defaultValue="........"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 ${
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
                    <div className="flex items-center space-x-3">
                      <FaCog className="text-blue-600 text-xl" />
                      <div>
                        <h2 className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          System Preferences
                        </h2>
                        <p className={`text-sm transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Configure system settings
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Timezone
                          </label>
                          <div className="relative">
                            <select 
                              value={timezone}
                              onChange={(e) => setTimezone(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 appearance-none ${
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
                            <FaChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                          </div>
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Language
                          </label>
                          <div className="relative">
                            <select 
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 appearance-none ${
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
                            <FaChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold mb-3 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Theme
                        </label>
                        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0">
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
                              className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500 accent-orange-600"
                            />
                            <span className={`text-sm transition-colors duration-200 ${
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
                              className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500 accent-orange-600"
                            />
                            <span className={`text-sm transition-colors duration-200 ${
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

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                  <button className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 order-2 sm:order-1 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}>
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 order-1 sm:order-2">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentSettings;