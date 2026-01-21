import React, { useState, useEffect } from 'react';
import { Download, Filter, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';
import { toast } from 'react-toastify';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Student {
  studentId: string;
  studentName: string;
  probability: number;
  riskLevel: string;
  topFactor: string;
  predictedAt: string;
}

export default function StudentRiskTable() {
  const navigate = useNavigate();
  const { user, token } = useUserAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  
  useEffect(() => {
    const fetchPredictions = async () => {
      if (!user?.schoolId || !token) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${baseUrl}/api/predictions/school/${user.schoolId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch predictions');
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setStudents(result.data);
        } else {
          setError(result.message || 'Failed to load predictions');
          toast.error(result.message || 'Failed to load predictions');
        }
      } catch (err: any) {
        console.error('Error fetching predictions:', err);
        setError(err.message || 'Error loading predictions');
        toast.error(err.message || 'Error loading predictions');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPredictions();
  }, [user?.schoolId, token]);

  const handleStudentClick = (student: Student) => {
    navigate('/prediction-profile', { state: { student, studentId: student.studentId } });
  };

  const handleMakePrediction = async () => {
    if (!user?.schoolId || !token) {
      toast.error('Authentication required');
      return;
    }

    setIsPredicting(true);
    
    try {
      const response = await fetch(`${baseUrl}/api/predictions/run-batch/school/${user.schoolId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to run predictions');
      }
      
      if (result.success) {
        toast.success(result.message || 'Predictions completed successfully');
        
        // Refresh the predictions list
        const refreshResponse = await fetch(`${baseUrl}/api/predictions/school/${user.schoolId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const refreshResult = await refreshResponse.json();
        
        if (refreshResult.success && refreshResult.data) {
          setStudents(refreshResult.data);
        }
      } else {
        toast.error(result.message || 'Failed to run predictions');
      }
    } catch (err: any) {
      console.error('Error running predictions:', err);
      toast.error(err.message || 'Error running predictions');
    } finally {
      setIsPredicting(false);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'CRITICAL':
      case 'HIGH':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full mx-auto p-2 sm:p-3 md:p-4 lg:p-6"> {/* Responsive padding */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          {/* Title on left */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-0">
            Students List
          </h2>
          
          {/* Right side with all action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Make Prediction button - primary action */}
            <button 
              onClick={handleMakePrediction}
              disabled={isPredicting}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none flex-1 sm:flex-none"
              aria-label="Make prediction"
            >
              {isPredicting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Running Predictions...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Make Prediction</span>
                </>
              )}
            </button>
            
            {/* Export and filter buttons - bottom row on mobile, inline on desktop */}
            <div className="flex gap-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 text-sm border border-gray-200"
                aria-label="Export data"
              >
                <Download size={18} className="text-gray-600" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 text-sm border border-gray-200"
                aria-label="Filter results"
              >
                <Filter size={18} className="text-gray-600" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add space between header and table */}
        <div className="h-4 sm:h-6"></div> {/* This lowers the table */}

        {isLoading ? (
          <>
            {/* Mobile skeleton */}
            <div className="sm:hidden p-3 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 border border-gray-200 rounded-lg animate-pulse">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop skeleton */}
            <div className="hidden sm:block overflow-x-auto px-3 sm:px-4">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Student</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Risk Level</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Prediction</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Information</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Predicted At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-3 sm:px-4 py-3"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                      <td className="px-3 sm:px-4 py-3"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                      <td className="px-3 sm:px-4 py-3"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                      <td className="px-3 sm:px-4 py-3"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                      <td className="px-3 sm:px-4 py-3"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {/* Mobile card view for small screens */}
            <div className="sm:hidden p-3">
          {students.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {error ? error : 'No predictions available'}
            </div>
          ) : (
            students.map((student) => (
              <div 
                key={student.studentId} 
                onClick={() => handleStudentClick(student)}
                className="mb-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors last:mb-0 cursor-pointer hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{student.studentName}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full border shrink-0 ${getRiskLevelColor(student.riskLevel)}`}>
                    {student.riskLevel}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Prediction:</span> {(student.probability * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Top Factor:</span> {student.topFactor}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Predicted:</span> {formatDate(student.predictedAt)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop table view (hidden on mobile) */}
        <div className="hidden sm:block overflow-x-auto px-3 sm:px-4"> {/* Added horizontal padding */}
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Student
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Risk Level
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Prediction
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Information
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Predicted At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 sm:px-4 py-8 text-center text-gray-500">
                    {error ? error : 'No predictions available'}
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr 
                    key={student.studentId} 
                    onClick={() => handleStudentClick(student)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer hover:shadow-sm"
                  >
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.studentName}
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 sm:px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRiskLevelColor(student.riskLevel)}`}>
                        {student.riskLevel}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900">
                      {(student.probability * 100).toFixed(1)}%
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-sm text-gray-600">
                      {student.topFactor}
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-xs text-gray-500">
                      {formatDate(student.predictedAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </>
        )}

        {/* Add space before footer */}
        <div className="h-4 sm:h-6"></div> {/* Added space before footer */}

        {/* Responsive footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-3 sm:mb-0 text-center sm:text-left">
            Showing 1 to {students.length} of {students.length} results
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded transition-colors flex items-center gap-1 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
              1
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded transition-colors flex items-center gap-1 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}