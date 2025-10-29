import React, { useState, useEffect, useCallback} from 'react';
import type { ChangeEvent } from 'react';
import { ArrowLeft, User, AlertTriangle, FileText } from 'lucide-react';
import { IoMdSave } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';
import { toast } from 'react-toastify';

interface StudentByCourseData {
  studentId: string;
  name: string;
  // Add other student properties as needed
}

interface StudentsByCourseApiResponse {
  success: boolean;
  message: string;
  data: StudentByCourseData[];
}

export default function LogBehaviorReport() {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [course, setCourse] = useState<string>(''); // This will store courseName for display
  const [selectedCourseId, setSelectedCourseId] = useState<string>(''); // This will store courseId for API calls
  const [incidentType, setIncidentType] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [students, setStudents] = useState<StudentByCourseData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { teacherCourses, token } = useUserAuth();

  // Function to fetch students by specific course
  const fetchStudentsByCourse = useCallback(async (courseId: string) => {
    if (!courseId || !token) return;
    
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/students/by-course/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      const result: StudentsByCourseApiResponse = await response.json();
      
      if (result.success && result.data) {
        setStudents(result.data);
      } else {
        console.error('Failed to fetch students:', result.message);
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch students when course selection changes
  useEffect(() => {
    if (selectedCourseId) {
      fetchStudentsByCourse(selectedCourseId);
      // Reset selected student when course changes
      setSelectedStudent('');
    } else {
      setStudents([]);
      setSelectedStudent('');
    }
  }, [selectedCourseId, fetchStudentsByCourse]);

  // Handle course selection - set both display name and courseId
  const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCourseName = e.target.value;
    setCourse(selectedCourseName);
    
    // Find the courseId from the selected course name
    const selectedCourse = teacherCourses.find(c => c.courseName === selectedCourseName);
    if (selectedCourse) {
      setSelectedCourseId(selectedCourse.courseId);
    } else {
      setSelectedCourseId('');
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!selectedStudent || !incidentType || !severity || !notes.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const behaviorReportData = {
      studentId: selectedStudent,
      notes: notes.trim(),
      incidentType: incidentType,
      severity: severity
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/behavior-incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(behaviorReportData)
      });

      if (!response.ok) {
        throw new Error('Failed to save behavior report');
      }

      const result = await response.json();
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(`Failed to save behavior report: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving behavior report:', error);
      toast.error('Failed to save behavior report. Please try again.');
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/behavior-reports'); 
    }
  };

  return (

    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header - Updated to align with centered content */}
      <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="w-full max-w-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">Log Behavior Report</h1>
              <p className="text-xs sm:text-sm text-gray-600">Record student behavior incidents or commendations with detailed information and notifications.</p>
            </div>
            <button 
              onClick={() => navigate("/behavior-reports")}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full max-w-none p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Student Information */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Student Information</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Courses
                </label>
                <div className="relative">
                  <select
                    value={course}
                    onChange={handleCourseChange}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors"
                  >
                    <option value="">Select course...</option>
                    {teacherCourses.map((courseItem) => (
                      <option key={courseItem.courseId} value={courseItem.courseName}>
                        {courseItem.courseName}
                      </option>
                    ))}
                  </select>
                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student
                </label>
                <div className="relative">
                  <select
                    value={selectedStudent}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStudent(e.target.value)}
                    disabled={!selectedCourseId || loading}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!selectedCourseId ? "Select a course first..." : 
                       loading ? "Loading students..." : 
                       students.length === 0 ? "No students found..." : 
                       "Choose a student..."}
                    </option>
                    {students.map((student) => (
                      <option key={student.studentId} value={student.studentId}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Incident Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Type
                </label>
                <div className="relative">
                  <select
                    value={incidentType}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setIncidentType(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors"
                  >
                    <option value="">Select incident type...</option>
                    <option value="BULLYING">Bullying</option>
                    <option value="CHEATING">Cheating</option>
                    <option value="DISRESPECT">Disrespect</option>
                    <option value="VIOLENCE">Violence</option>
                    <option value="OTHERS">Others</option>
                  </select>
                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity
                </label>
                <div className="relative">
                  <select
                    value={severity}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSeverity(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors"
                  >
                    <option value="">Select severity...</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Notes & Description */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Notes & Description</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                placeholder="Provide detailed description of the behavior incident or commendation..."
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-blue-300 hover:bg-blue-400 text-white rounded-lg font-medium flex items-center gap-2 transition-colors w-full sm:w-auto justify-center mb-3 sm:mb-0"
            >
              <IoMdSave className="w-4 h-4" />
              Save Behavior Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}