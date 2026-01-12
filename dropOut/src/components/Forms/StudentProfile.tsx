import { useState, useEffect } from 'react'
import { FaArrowLeft, FaUser, FaPrint, FaPlus, FaExclamationTriangle, FaBook, FaExclamationTriangle as FaWarning } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import StudentRepo from './StudentRepo';
import { useUserAuth } from '../../context/useUserAuth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface StudentProfileData {
  studentId: string
  name: string
  studentCode: string
  schoolName: string
  parentName: string
  parentPhone: string
  parentEmail: string
  parentOccupation: string
  riskLevel: string
  dropoutProbability: number
  avgAttendancePercent: number
  academicScore: number
  engagementPercent: number
  currentGrades: Array<{
    type: string
    title: string
    score: number
  }>
  interventionLog: Array<{
    note: string
    incidentType: string
    severityLevel: string
  }>
}

interface StudentProfileProps {
  onBack: () => void;
  studentId: string;
}

function StudentProfile({ onBack, studentId }: StudentProfileProps) {
  const [showStudentRepo, setShowStudentRepo] = useState(false);
  const [profileData, setProfileData] = useState<StudentProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useUserAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${baseUrl}/api/principal/student-profile/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setProfileData(result.data);
        } else {
          setError(result.message || 'Failed to load student profile');
        }
      } catch (err: any) {
        setError(err.message || 'Error loading student profile');
      } finally {
        setLoading(false);
      }
    };
    
    if (studentId && token) {
      fetchStudentProfile();
    }
  }, [studentId, token]);

  if (showStudentRepo) {
    return <StudentRepo onBack={() => setShowStudentRepo(false)} />;
  }

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-96"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* Breadcrumbs Skeleton */}
          <div className="h-4 bg-gray-200 rounded w-80 mb-8"></div>

          {/* Student Info Card Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-56"></div>
              </div>
            </div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Grades Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Intervention Log Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">{error}</div>
          <button onClick={onBack} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">No profile data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Profile</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Watch Student information to monitor dropout risk and academic progress</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-xs sm:text-sm font-medium"
            >
              Historic
            </button>
            <button 
              onClick={onBack}
              className="bg-gray-800 hover:bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-xs sm:text-sm"
            >
              <FaArrowLeft className="text-xs sm:text-sm" />
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUser className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600">Student ID: #{profileData.studentCode}</p>
                <p className="text-gray-600">{profileData.schoolName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaPrint className="text-sm" />
                Print Report
              </button>
            </div>
          </div>
        </div>

        {/* Parent Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Parent/Guardian Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-base font-medium text-gray-900">{profileData.parentName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-base font-medium text-gray-900">{profileData.parentPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-base font-medium text-gray-900">{profileData.parentEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Occupation</p>
              <p className="text-base font-medium text-gray-900">{profileData.parentOccupation}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Assessment Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Assessment</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                  profileData.riskLevel === 'HIGH' ? 'bg-red-500' :
                  profileData.riskLevel === 'MEDIUM' ? 'bg-orange-500' :
                  'bg-green-500'
                }`}>
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">{Math.round(profileData.dropoutProbability * 100)}%</div>
                    <div className="text-sm">{profileData.riskLevel === 'HIGH' ? 'High Risk' : profileData.riskLevel === 'MEDIUM' ? 'Medium Risk' : 'Low Risk'}</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm text-center">Probability of dropout based on ML analysis</p>
            </div>
          </div>

          {/* Performance Timeline Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Timeline</h3>
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
                    <span className="text-gray-900 font-bold text-sm">{profileData.avgAttendancePercent}%</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">Avg Attendance</div>
                <div className="text-xs text-gray-600">Overall attendance</div>
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
                    <span className="text-gray-900 font-bold text-sm">{profileData.academicScore.toFixed(1)}</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">Academic Score</div>
                <div className="text-xs text-gray-600">Average score</div>
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
                    <span className="text-gray-900 font-bold text-sm">{profileData.engagementPercent}%</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">Engagement</div>
                <div className="text-xs text-gray-600">Class participation</div>
              </div>
            </div>
          </div>

          {/* Key Risk Factors Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Key Risk Factors</h3>
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
                  <FaBook className="text-orange-500 text-sm" />
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
            <h3 className="text-lg font-bold text-gray-900 mb-4">Attendance Overview</h3>
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
          <h3 className="text-lg font-bold text-gray-900 mb-4">Current Grades</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profileData.currentGrades.length > 0 ? (
              profileData.currentGrades.map((grade, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{grade.score.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">{grade.title}</div>
                  <div className="text-xs text-gray-500">{grade.type}</div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">No grades available</div>
            )}
          </div>
        </div>

        {/* Intervention Log Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Intervention Log</h3>
            <button 
              onClick={() => setShowStudentRepo(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium"
            >
              <FaPlus className="text-sm" />
              Add Note
            </button>
          </div>
          <div className="space-y-4">
            {profileData.interventionLog.length > 0 ? (
              profileData.interventionLog.map((log, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-1 rounded-full ${
                    log.severityLevel === 'HIGH' ? 'bg-red-500' :
                    log.severityLevel === 'MEDIUM' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium mb-1">{log.incidentType.replace('_', ' ')}</div>
                    <div className="text-gray-600 text-sm mb-2">{log.note}</div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        log.severityLevel === 'HIGH' ? 'bg-red-100 text-red-800' :
                        log.severityLevel === 'MEDIUM' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>{log.severityLevel}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No intervention logs available</div>
            )}
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
