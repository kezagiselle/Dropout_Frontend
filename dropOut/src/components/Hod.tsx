import { useState, createContext, useContext } from 'react'
import Student from './HodPages/Student';
import Teachers from './HodPages/Teachers';
import Courses from './HodPages/Courses';
import Reports from './HodPages/Reports';
import Attendance from './HodPages/Attendance';
import Communication from './HodPages/Communication';
import Settings from './HodPages/Settings';

// Create theme context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const Hod = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'students' | 'teachers' | 'courses' | 'attendance' | 'reports' | 'communication' | 'settings'>('dashboard')
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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
        } px-4 sm:px-6 py-3 sm:py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Academic Portal</h2>
              <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              } ml-20`}>HoD & Registrar Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <div className={`w-6 h-6 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                ▼
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <nav className={`w-full lg:w-64 shadow-sm lg:min-h-screen p-4 order-2 lg:order-1 transition-colors duration-200 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="space-y-2">
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'dashboard' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => setActiveView('dashboard')}
              >
                <span className="text-lg">📊</span>
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
                onClick={() => setActiveView('students')}
              >
                <span className="text-lg">🎓</span>
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
                onClick={() => setActiveView('teachers')}
              >
                <span className="text-lg">👤</span>
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
                onClick={() => setActiveView('courses')}
              >
                <span className="text-lg">📅</span>
                <span className="font-medium">Courses & Timetables</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'attendance' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => setActiveView('attendance')}
              >
                <span className="text-lg">📈</span>
                <span className="font-medium">Attendance & Performance</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'reports' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => setActiveView('reports')}
              >
                <span className="text-lg">📄</span>
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
                onClick={() => setActiveView('communication')}
              >
                <span className="text-lg">💬</span>
                <span className="font-medium">Communication</span>
              </div>
              <div 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeView === 'settings' 
                    ? 'bg-orange-100 text-orange-700' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-orange-400'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => setActiveView('settings')}
              >
                <span className="text-lg">⚙️</span>
                <span className="font-medium">Settings</span>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className={`flex-1 p-3 sm:p-4 order-1 lg:order-2 transition-colors duration-200 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {activeView === 'dashboard' && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className={`rounded-lg shadow-sm p-4 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🎓</span>
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Total Students</h3>
                        <p className={`text-2xl font-bold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>1,234</p>
                      </div>
                    </div>
                  </div>
                  <div className={`rounded-lg shadow-sm p-4 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">⚠️</span>
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>At-risk Students</h3>
                        <p className="text-2xl font-bold text-red-600">45</p>
                      </div>
                    </div>
                  </div>
                  <div className={`rounded-lg shadow-sm p-4 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">▶️</span>
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Active Teachers</h3>
                        <p className={`text-2xl font-bold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>78</p>
                      </div>
                    </div>
                  </div>
                  <div className={`rounded-lg shadow-sm p-4 border transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">⏰</span>
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Pending Approvals</h3>
                        <p className={`text-2xl font-bold transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>3</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Sections */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {/* Alerts & Notifications */}
                  <div className={`rounded-lg shadow-sm border p-4 transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h2 className={`text-lg font-semibold mb-3 transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Alerts & Notifications</h2>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">⚠️</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-red-900 text-sm">Missing Attendance Data</h4>
                          <p className="text-xs text-red-700 mt-0.5">Student John Doe missing attendance data for the past week</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">⚠️</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-orange-900 text-sm">At-risk Student Alert</h4>
                          <p className="text-xs text-orange-700 mt-0.5">At-risk student Maria Gonzalez needs immediate intervention</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">ℹ️</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-900 text-sm">Pending Approval</h4>
                          <p className="text-xs text-blue-700 mt-0.5">Pending timetable approval for Computer Science Department</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pending Actions */}
                  <div className={`rounded-lg shadow-sm border p-4 transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h2 className={`text-lg font-semibold mb-3 transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Pending Actions</h2>
                    <div className="space-y-3">
                      <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">📄</span>
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm transition-colors duration-200 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Approve Timetables</h4>
                          <p className={`text-xs transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>3 pending approvals</p>
                        </div>
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Review
                        </button>
                      </div>
                      <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">📈</span>
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm transition-colors duration-200 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Generate Reports</h4>
                          <p className={`text-xs transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>Monthly performance reports</p>
                        </div>
                        <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Generate
                        </button>
                      </div>
                      <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">⚠️</span>
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm transition-colors duration-200 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Send Alerts</h4>
                          <p className={`text-xs transition-colors duration-200 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>Notify stakeholders</p>
                        </div>
                        <button className="px-3 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                          Send
                        </button>
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
