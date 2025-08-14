import React, { useState } from 'react';
import { FaBell, FaUser, FaCog, FaChartBar, FaUsers, FaCalendarAlt, FaFileAlt, FaComments } from 'react-icons/fa';

const Settings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [alertFrequency, setAlertFrequency] = useState('immediate');
  const [theme, setTheme] = useState('light');
  const [timezone, setTimezone] = useState('UTC-5');
  const [language, setLanguage] = useState('English');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaBell className="text-gray-600 text-xl cursor-pointer" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <span className="text-gray-700 font-medium">John Admin</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaBell className="text-orange-600 text-xl" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                <p className="text-gray-600">Manage your notification preferences</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Email Alerts */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-sm text-gray-600">Alerts email notifications for important updates</p>
                </div>
                <button
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailAlerts ? 'bg-orange-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Alert Frequency */}
              <div className="py-3">
                <h3 className="font-medium text-gray-900 mb-3">Alert Frequency</h3>
                <div className="space-y-2">
                  {['immediate', 'daily', 'weekly'].map((freq) => (
                    <label key={freq} className="flex items-center space-x-3 cursor-pointer">
                                             <input
                         type="radio"
                         name="alertFrequency"
                         value={freq}
                         checked={alertFrequency === freq}
                         onChange={(e) => setAlertFrequency(e.target.value)}
                         className="w-4 h-4 text-orange-400 border-gray-300 focus:ring-orange-400"
                       />
                      <span className="text-gray-700 capitalize">{freq}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User Permissions Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <FaUser className="text-orange-600 text-xl" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">User Permissions</h2>
                <p className="text-gray-600">Manage roles and access levels</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Head of Department */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Head of Department</h3>
                <p className="text-sm text-gray-600 mb-3">Manage all features</p>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Full Access</option>
                  <option>Limited Access</option>
                  <option>Read Only</option>
                </select>
              </div>

              {/* Registrar */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Registrar</h3>
                <p className="text-sm text-gray-600 mb-3">Student records and enrollment</p>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Full Access</option>
                  <option>Limited Access</option>
                  <option>Read Only</option>
                </select>
              </div>

              {/* Staff */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Staff</h3>
                <p className="text-sm text-gray-600 mb-3">Basic operational access</p>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Limited Access</option>
                  <option>Full Access</option>
                  <option>Read Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Profile Settings Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <FaUser className="text-orange-600 text-xl" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                <p className="text-gray-600">Update your personal information</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                  <input
                    type="text"
                    defaultValue="John Admin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                  <input
                    type="email"
                    defaultValue="john.admin@university.edu"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  defaultValue="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  defaultValue="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* System Preferences Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <FaCog className="text-orange-600 text-xl" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">System Preferences</h2>
                <p className="text-gray-600">Configure system settings</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                  <select 
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                  <option value="UTC-5">UTC-5 (Eastern Time)</option>
                  <option value="UTC-6">UTC-6 (Central Time)</option>
                  <option value="UTC-7">UTC-7 (Mountain Time)</option>
                  <option value="UTC-8">UTC-8 (Pacific Time)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Theme</h3>
              <div className="space-y-2">
                {['light', 'dark'].map((themeOption) => (
                  <label key={themeOption} className="flex items-center space-x-3 cursor-pointer">
                                                                                     <input
                         type="radio"
                         name="theme"
                         value={themeOption}
                         checked={theme === themeOption}
                         onChange={(e) => setTheme(e.target.value)}
                         className="w-4 h-4 text-orange-400 border-gray-300 focus:ring-orange-400"
                       />
                    <span className="text-gray-700 capitalize">{themeOption}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
