import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, User, Calendar, BookOpen, AlertCircle, Activity } from 'lucide-react';
import { useUserAuth } from '../../context/useUserAuth';
import { toast } from 'react-toastify';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface PredictionProfileData {
  studentId: string;
  studentName: string;
  probability: number;
  riskLevel: string;
  topFactor: string;
  predictedAt: string;
  averageMarks: number;
  lowestGrade: number;
  failingCoursesCount: number;
  weeksEnrolled: number;
  attendanceRate: number;
  daysAbsent: number;
  consecutiveAbsences: number;
  incidentCount: number;
  severityScore: number;
  daysSinceLastIncident: number;
  age: number;
  gender: string;
}

export default function PredictionProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useUserAuth();
  const studentId = location.state?.studentId;

  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [profileData, setProfileData] = useState<PredictionProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictionProfile = async () => {
      if (!studentId || !token) {
        setIsPageLoading(false);
        setError('Student ID or authentication token is missing');
        return;
      }

      setIsPageLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/api/predictions/profile/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch prediction profile');
        }

        const result = await response.json();

        if (result.success && result.data) {
          setProfileData(result.data);
        } else {
          setError(result.message || 'Failed to load prediction profile');
          toast.error(result.message || 'Failed to load prediction profile');
        }
      } catch (err: any) {
        console.error('Error fetching prediction profile:', err);
        setError(err.message || 'Error loading prediction profile');
        toast.error(err.message || 'Error loading prediction profile');
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchPredictionProfile();
  }, [studentId, token]);

  const handleMakePrediction = async () => {
    if (!studentId || !token) {
      toast.error('Authentication required');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${baseUrl}/api/predictions/student/${studentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to run prediction');
      }
      
      if (result.success) {
        toast.success(result.message || 'Prediction completed successfully');
        
        // Refresh the prediction profile data
        const refreshResponse = await fetch(`${baseUrl}/api/predictions/profile/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const refreshResult = await refreshResponse.json();
        
        if (refreshResult.success && refreshResult.data) {
          setProfileData(refreshResult.data);
        }
      } else {
        toast.error(result.message || 'Failed to run prediction');
      }
    } catch (err: any) {
      console.error('Error running prediction:', err);
      toast.error(err.message || 'Error running prediction');
    } finally {
      setIsLoading(false);
    }
  };

  const getPredictionColor = (prediction: number) => {
    if (prediction >= 0.7) return { color: 'text-red-600', bg: 'bg-red-100', ring: 'ring-red-500' };
    if (prediction >= 0.4) return { color: 'text-yellow-600', bg: 'bg-yellow-100', ring: 'ring-yellow-500' };
    return { color: 'text-green-600', bg: 'bg-green-100', ring: 'ring-green-500' };
  };

  const getRiskLevelStyles = (level: string) => {
    switch (level.toUpperCase()) {
      case 'HIGH':
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (!studentId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No student ID provided</p>
          <button
            onClick={() => navigate('/hod-dashboard', { state: { view: 'predictions' } })}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (error && !isPageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/hod-dashboard', { state: { view: 'predictions' } })}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const predictionPercentage = profileData ? (profileData.probability * 100).toFixed(1) : '0.0';
  const colorStyles = profileData ? getPredictionColor(profileData.probability) : getPredictionColor(0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate('/hod-dashboard', { state: { view: 'predictions' } })}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Prediction</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          {isPageLoading ? (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div>
                <div className="h-8 bg-gray-200 rounded-full w-32"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profileData?.studentName || 'Loading...'}</h1>
                  <p className="text-gray-600">Student ID: {profileData?.studentId || studentId}</p>
                </div>
              </div>
              <div>
                <span className={`px-4 py-2 rounded-full border-2 font-semibold text-sm ${getRiskLevelStyles(profileData?.riskLevel || 'LOW')}`}>
                  Risk Level: {profileData?.riskLevel || 'N/A'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Prediction Circle & Action */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Dropout Prediction
            </h2>

            {isPageLoading ? (
              <div className="animate-pulse">
                <div className="flex flex-col items-center py-6">
                  <div className="w-48 h-48 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              </div>
            ) : (
              <>
            {/* Circular Progress */}
            <div className="flex flex-col items-center py-6">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - (profileData?.probability || 0))}`}
                    className={`${colorStyles.color} transition-all duration-1000 ease-out`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className={`text-4xl font-bold ${colorStyles.color}`}>
                    {predictionPercentage}%
                  </span>
                  <span className="text-sm text-gray-600 mt-1">Risk Score</span>
                </div>
              </div>

              <p className="text-center text-gray-600 mt-4 text-sm">
                {profileData?.topFactor || 'No factor information available'}
              </p>
            </div>

            {/* Make Prediction Button */}
            <button
              onClick={handleMakePrediction}
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Activity size={20} />
                  <span>Run Prediction Analysis</span>
                </>
              )}
            </button>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Student Features */}
        <div className="lg:col-span-2 space-y-6">
          {isPageLoading ? (
            // Skeleton loading for all feature cards
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(i === 1 || i === 2 ? 3 : 2)].map((_, j) => (
                    <div key={j} className="p-4 bg-gray-100 rounded-lg">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
          {/* Academic Performance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen size={20} />
              Academic Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Average Marks</p>
                <p className="text-2xl font-bold text-blue-900">{profileData?.averageMarks?.toFixed(2) || '0.00'}%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Lowest Grade</p>
                <p className="text-2xl font-bold text-purple-900">{profileData?.lowestGrade?.toFixed(1) || '0.0'}%</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-600 mb-1">Failing Courses</p>
                <p className="text-2xl font-bold text-orange-900">{profileData?.failingCoursesCount || 0}</p>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-sm text-gray-600 mb-1">Weeks Enrolled</p>
                <p className="text-2xl font-bold text-teal-900">{profileData?.weeksEnrolled || 0}</p>
              </div>
            </div>
          </div>

          {/* Attendance Metrics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Attendance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
                <p className="text-2xl font-bold text-green-900">{profileData?.attendanceRate?.toFixed(2) || '0.00'}%</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-gray-600 mb-1">Days Absent</p>
                <p className="text-2xl font-bold text-red-900">{profileData?.daysAbsent || 0}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-600 mb-1">Consecutive Absences</p>
                <p className="text-2xl font-bold text-yellow-900">{profileData?.consecutiveAbsences || 0}</p>
              </div>
            </div>
          </div>

          {/* Behavior & Incidents */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Behavior & Incidents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-gray-600 mb-1">Incident Count</p>
                <p className="text-2xl font-bold text-red-900">{profileData?.incidentCount || 0}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-600 mb-1">Severity Score</p>
                <p className="text-2xl font-bold text-orange-900">{profileData?.severityScore || 0}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Days Since Last Incident</p>
                <p className="text-2xl font-bold text-blue-900">{profileData?.daysSinceLastIncident || 0}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User size={20} />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Age</p>
                <p className="text-2xl font-bold text-gray-900">{profileData?.age || 0} years</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Gender</p>
                <p className="text-2xl font-bold text-gray-900">
                  {profileData?.gender || 'N/A'}
                </p>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
