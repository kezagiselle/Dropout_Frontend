import { FaArrowLeft, FaCalendarAlt, FaUser, FaPrint, FaPlus, FaExclamationTriangle, FaBook, FaExclamationTriangle as FaWarning } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'

interface StudentProfileProps {
  onBack: () => void;
}

function StudentProfile({ onBack }: StudentProfileProps) {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
            <p className="text-gray-600 mt-1">Watch Student information to monitor dropout risk and academic progress</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium"
            >
              Historic
            </button>
            <button 
              onClick={onBack}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm"
            >
              <FaArrowLeft className="text-sm" />
              Back
            </button>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <span>Dashboard</span>
            <span className="mx-2">&gt;</span>
            <span>Students</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 font-medium">Marcus Johnson</span>
          </nav>
        </div>

        {/* Student Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <FaUser className="text-purple-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Marcus Johnson</h2>
                <p className="text-gray-600">Grade 10 - Student ID: #ST-2024-0847</p>
                <p className="text-gray-600">Westfield High School</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaCalendarAlt className="text-sm" />
                Schedule Meeting
              </button>
              <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaUser className="text-sm" />
                Assign a Mentor
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaPrint className="text-sm" />
                Print Report
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Assessment Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <div className="w-32 h-32 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">58%</div>
                    <div className="text-sm">High Risk</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm text-center">Probability of dropout based on ML analysis</p>
            </div>
          </div>

          {/* Performance Timeline Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Timeline</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-green-500"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="80, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-sm">80%</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">Avg Attendance</div>
                <div className="text-xs text-gray-600">Across all children</div>
              </div>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-orange-500"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="70, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-sm">70%</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">Academic Score</div>
                <div className="text-xs text-gray-600">Weighted average</div>
              </div>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-blue-500"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="75, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-sm">75%</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">Engagement</div>
                <div className="text-xs text-gray-600">Class participation</div>
              </div>
            </div>
          </div>

          {/* Key Risk Factors Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Risk Factors</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaExclamationTriangle className="text-red-500" />
                  <span className="text-red-800 font-medium">Low Attendance</span>
                </div>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Critical</span>
              </div>
              <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaBook className="text-orange-500" />
                  <span className="text-gray-900">Failing Math</span>
                </div>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">High</span>
              </div>
              <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaWarning className="text-yellow-500" />
                  <span className="text-gray-900">Behavioral Issues</span>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Medium</span>
              </div>
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaHouse className="text-blue-500" />
                  <span className="text-gray-900">Family Issues</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Medium</span>
              </div>
            </div>
          </div>

          {/* Attendance Overview Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">This Month</span>
                  <span className="text-gray-900 font-medium">52%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">This Semester</span>
                  <span className="text-gray-900 font-medium">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">This Year</span>
                  <span className="text-gray-900 font-medium">43%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '43%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Grades Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Grades</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">15</div>
              <div className="text-sm text-gray-600">English</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">17</div>
              <div className="text-sm text-gray-600">History</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">18</div>
              <div className="text-sm text-gray-600">Math</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Science</div>
            </div>
          </div>
        </div>

        {/* Intervention Log Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Intervention Log</h3>
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
              <FaPlus className="text-sm" />
              Add Note
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-gray-900 font-medium mb-1">Parent Conference Scheduled</div>
                <div className="text-gray-600 text-sm mb-2">Meeting with parents scheduled for next week to discuss attendance issues and academic performance.</div>
                <div className="text-xs text-gray-500">By: Ms. Rodriguez (Counselor) • 2 days ago</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-gray-900 font-medium mb-1">Math Tutoring Assigned</div>
                <div className="text-gray-600 text-sm mb-2">Student enrolled in after-school math tutoring program. Sessions scheduled for Tuesdays and Thursdays.</div>
                <div className="text-xs text-gray-500">By: Mr. Thompson (Math Teacher) • 1 week ago</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-gray-900 font-medium mb-1">Behavioral Incident Report</div>
                <div className="text-gray-600 text-sm mb-2">Disruption in class. Student counseling session completed. Follow-up required.</div>
                <div className="text-xs text-gray-500">By: Ms. Davis (Vice Principal) • 2 weeks ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Profile Button */}
        <div className="flex justify-end">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
