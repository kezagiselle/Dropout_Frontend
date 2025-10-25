/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Calendar, Check, X, User, ChevronDown, Bell, Save } from 'lucide-react';
import { IoTimeSharp } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';
import { toast } from 'react-toastify';
import pe1 from "../../../src/img/pe1.png";
import pe2 from "../../../src/img/pe2.png";
import pe3 from "../../../src/img/pe3.png";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Student {
  id: string; 
  name: string;
  avatar: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

interface StudentByCourseData {
  studentId: string;
  name: string;
}

interface StudentsByCourseApiResponse {
  success: boolean;
  message: string;
  data: StudentByCourseData[];
}




interface Counts {
  present?: number;
  absent?: number;
  late?: number;
  excused?: number;
}

export default function DailyAttendance() {
  const { teacherCourses, token } = useUserAuth();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-15');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [students, setStudents] = useState<Student[]>([]);

  // Function to fetch students by specific course
  const fetchStudentsByCourse = useCallback(async (courseId: string) => {
    if (!courseId || !token) return;
    
    setLoading(true);
    try {
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
        // Convert API response to Student format
        const courseStudents: Student[] = result.data.map((studentData: StudentByCourseData, index: number) => ({
          id: studentData.studentId, // Use actual studentId from API
          name: studentData.name,
          avatar: [pe1, pe2, pe3][index % 3], // Cycle through avatars
          status: 'present' as const // Default status
        }));
        
        setStudents(courseStudents);
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

  // Load students from navigation state (from Attendance.tsx) or fetch all teacher's courses
  useEffect(() => {
    const { studentsData, attendanceData }: { 
      studentsData?: any[];
      attendanceData?: any;
    } = location.state || {};
    
    if (studentsData && Array.isArray(studentsData)) {
      // Convert the student data from Attendance.tsx to DailyAttendance format
      const convertedStudents: Student[] = studentsData.map((student: any, index: number) => ({
        id: student.studentId || `STU${String(index + 1).padStart(3, '0')}`,
        name: student.name,
        avatar: student.avatar || [pe1, pe2, pe3][index % 3],
        status: (student.activeStatus === 'Present' ? 'present' : 
                student.activeStatus === 'Absent' ? 'absent' :
                student.activeStatus === 'Late' ? 'late' : 'present') as Student['status']
      }));
      setStudents(convertedStudents);
    } else if (attendanceData?.students && Array.isArray(attendanceData.students)) {
      // Use API students data from Attendance.tsx
      const apiStudents: Student[] = attendanceData.students.map((student: any, index: number) => ({
        id: `STU${String(index + 1).padStart(3, '0')}`,
        name: student.name,
        avatar: [pe1, pe2, pe3][index % 3],
        status: student.attendance > 0 ? 'present' : 'absent'
      }));
      setStudents(apiStudents);
    } else {
      // No data from Attendance.tsx and no teacher courses - show empty state
      setStudents([]);
    }
  }, [location.state, teacherCourses]);

  // Fetch students when course selection changes (only for course filtering)
  useEffect(() => {
    if (selectedCourse) {
      fetchStudentsByCourse(selectedCourse);
    } else {
      // If no course selected and we have navigation data, restore original mixed students
      const { studentsData, attendanceData }: { 
        studentsData?: any[];
        attendanceData?: any;
      } = location.state || {};
      
      if (studentsData && Array.isArray(studentsData)) {
        const convertedStudents: Student[] = studentsData.map((student: any, index: number) => ({
          id: student.studentId || `STU${String(index + 1).padStart(3, '0')}`,
          name: student.name,
          avatar: student.avatar || [pe1, pe2, pe3][index % 3],
          status: (student.activeStatus === 'Present' ? 'present' : 
                  student.activeStatus === 'Absent' ? 'absent' :
                  student.activeStatus === 'Late' ? 'late' : 'present') as Student['status']
        }));
        setStudents(convertedStudents);
      } else if (attendanceData?.students && Array.isArray(attendanceData.students)) {
        const apiStudents: Student[] = attendanceData.students.map((student: any, index: number) => ({
          id: `STU${String(index + 1).padStart(3, '0')}`,
          name: student.name,
          avatar: [pe1, pe2, pe3][index % 3],
          status: student.attendance > 0 ? 'present' : 'absent'
        }));
        setStudents(apiStudents);
      } else {
        // No navigation data available - show empty state
        setStudents([]);
      }
    }
  }, [selectedCourse, fetchStudentsByCourse, location.state, teacherCourses]);

  // Function to save attendance with course ID
  const saveAttendance = async () => {
    if (!selectedCourse) {
      toast.error('Please select a course first');
      return;
    }
    
    if (students.length === 0) {
      toast.error('No students to save attendance for');
      return;
    }

    // Group students by their attendance status
    const presentStudentIds = students
      .filter(student => student.status === 'present')
      .map(student => student.id);
    
    const absentStudentIds = students
      .filter(student => student.status === 'absent')
      .map(student => student.id);

    const attendanceData = {
      courseId: selectedCourse,
      presentStudentIds,
      absentStudentIds
    };
    
    console.log('Saving attendance for course:', attendanceData);
    
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/attendance/bulk-save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(attendanceData)
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        toast.success(`Attendance saved successfully: ${result.data.message}`);
        console.log('Attendance saved:', result);
      } else {
        toast.error(`Failed to save attendance: ${result.message || 'Unknown error'}`);
        console.error('Save attendance error:', result);
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
      toast.error('Failed to save attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (studentId: string, newStatus: Student['status']): void => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    ));
  };

  const markAllPresent = (): void => {
    setStudents(students.map(student => ({ ...student, status: 'present' })));
  };

  const handleBack = (): void => {
    navigate('/attendance');
  };

  const counts: Counts = students.reduce((acc: Counts, student) => {
    acc[student.status] = (acc[student.status] || 0) + 1;
    return acc;
  }, {});

  const getStatusButtonClass = (currentStatus: Student['status'], buttonStatus: Student['status']): string => {
    const isActive = currentStatus === buttonStatus;
    const baseClass = "px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all flex-1 justify-center";
    
    switch(buttonStatus) {
      case 'present':
        return `${baseClass} ${isActive ? 'bg-green-200 text-gray-800 shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
      case 'absent':
        return `${baseClass} ${isActive ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
      case 'late':
        return `${baseClass} ${isActive ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
      case 'excused':
        return `${baseClass} ${isActive ? 'bg-green-200 text-gray-800 shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="w-full max-w-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Daily Attendance Recording</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {selectedCourse ? 
                  `Course: ${teacherCourses.find(course => course.courseId === selectedCourse)?.courseName || 'Unknown Course'}` :
                  'Showing all students from your courses - Select a specific course to filter'
                }
              </p>
            </div>
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-none px-4 sm:px-6 py-4 sm:py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                <div className="relative">
                  <select 
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="appearance-none w-full sm:w-80 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={teacherCourses.length === 0}
                  >
                    <option value="">Select Course</option>
                    {teacherCourses.length === 0 ? (
                      <option value="" disabled>No courses available</option>
                    ) : (
                      teacherCourses.map((course) => (
                        <option key={course.courseId} value={course.courseId}>
                          {course.courseName}
                        </option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex-1 sm:flex-none">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <div className="relative">
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-80 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <button 
              onClick={markAllPresent}
              className="px-4 sm:px-5 py-2.5 bg-blue-200 text-gray-800 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-300 transition-colors w-full sm:w-auto justify-center mt-2 sm:mt-0"
            >
              <Check className="w-4 h-4" />
              Mark All Present
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-200 rounded-full flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{counts.present || 0}</p>
                <p className="text-sm text-gray-600 truncate">Present</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{counts.absent || 0}</p>
                <p className="text-sm text-gray-600 truncate">Absent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{counts.late || 0}</p>
                <p className="text-sm text-gray-600 truncate">Late</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-500 rounded-full flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{counts.excused || 0}</p>
                <p className="text-sm text-gray-600 truncate">Excused</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Student List ({loading ? 'Loading...' : `${students.length} Students`})
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="px-4 py-2 text-orange-600 font-medium flex items-center gap-2 hover:bg-orange-50 rounded-lg transition-colors justify-center text-sm">
                <Bell className="w-4 h-4" />
                Notify Parents
              </button>
              <button 
                onClick={saveAttendance}
                disabled={loading || students.length === 0}
                className="px-4 py-2 bg-green-200 text-gray-800 rounded-lg font-medium flex items-center gap-2 hover:bg-green-300 transition-colors justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Save Attendance
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Loading students...</div>
            </div>
          ) : students.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">No students found for this course</div>
            </div>
          ) : (
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{student.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">ID: {student.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => updateStatus(student.id, 'present')}
                      className={getStatusButtonClass(student.status, 'present')}
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Present</span>
                    </button>
                    <button 
                      onClick={() => updateStatus(student.id, 'absent')}
                      className={getStatusButtonClass(student.status, 'absent')}
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Absent</span>
                    </button>
                    <button 
                      onClick={() => updateStatus(student.id, 'late')}
                      className={getStatusButtonClass(student.status, 'late')}
                    >
                      <IoTimeSharp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Late</span>
                    </button>
                    <button 
                      onClick={() => updateStatus(student.id, 'excused')}
                      className={getStatusButtonClass(student.status, 'excused')}
                    >
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Excused</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">Last saved: 2 minutes ago</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button 
              onClick={saveAttendance}
              disabled={loading || students.length === 0}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-orange-600 transition-colors justify-center text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              Submit Attendance
            </button>
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-green-200 text-gray-800 rounded-lg font-medium flex items-center gap-2 hover:bg-green-300 transition-colors justify-center text-sm sm:text-base">
              <Bell className="w-4 h-4" />
              Notify Parents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}