 
import { useState, useEffect, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { User, BookOpen, Eye, ChevronDown } from 'lucide-react';
import { IoMdSave } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';
import { toast } from 'react-toastify';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface StudentGrade {
  id: string;        // studentId from API
  studentName: string; // name from API (read-only)
  grade: string;     // editable grade value (stored as string but represents float)
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

export default function Marks() {
  const { teacherCourses, token } = useUserAuth();
  const [course, setCourse] = useState<string>('');
  const [gradeType, setGradeType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<StudentGrade[]>([]);

  const navigate = useNavigate();

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
        // Convert API response to StudentGrade format
        const courseStudents: StudentGrade[] = result.data.map((studentData: StudentByCourseData) => ({
          id: studentData.studentId,
          studentName: studentData.name,
          grade: '' // Empty grade initially
        }));
        
        setStudents(courseStudents);
      } else {
        console.error('Failed to fetch students:', result.message);
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch students when course selection changes
  useEffect(() => {
    if (course) {
      fetchStudentsByCourse(course);
    } else {
      setStudents([]);
    }
  }, [course, fetchStudentsByCourse]);

  const handleGradeChange = (id: string, value: string) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, grade: value } : student
    ));
  };

  const handleSaveAll = async () => {
    if (!course) {
      toast.error('Please select a course first');
      return;
    }

    if (!gradeType || !name) {
      toast.error('Please fill in grade type and name before saving grades');
      return;
    }
    
    if (students.length === 0) {
      toast.error('No students to save grades for');
      return;
    }

    // Filter out students with empty grades and validate float values
    const studentsWithValidGrades = students.filter(student => {
      const grade = student.grade.trim();
      if (grade === '') return false;
      
      const gradeFloat = parseFloat(grade);
      if (isNaN(gradeFloat) || gradeFloat < 0 || gradeFloat > 100) {
        toast.error(`Invalid grade for ${student.studentName}: ${grade}. Grade must be a number between 0 and 100`);
        return false;
      }
      return true;
    });
    
    if (studentsWithValidGrades.length === 0) {
      toast.error('Please enter at least one valid grade (0-100)');
      return;
    }

    // Prepare the request body according to the API blueprint
    const requestBody = {
      courseId: course,
      gradeName: name,
      gradeType: gradeType.toUpperCase(),
      grades: studentsWithValidGrades.map(student => ({
        studentId: student.id,
        marks: parseFloat(student.grade)
      }))
    };

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/grades/bulk-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        toast.success(result.message);
        console.log('Bulk grades saved:', result);
        
       
      } else {
        toast.error(`Failed to save grades: ${result.message }`);
        console.error('Save grades error:', result);
      }
    } catch (error) {
      console.error('Error saving grades:', error);
      toast.error('Failed to save grades. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveForm = () => {
    if (!course || !gradeType || !name) {
      toast.error('Please fill in all course information fields');
      return;
    }
    
    console.log('Form saved:', {
      course,
      gradeType,
      name
    });
    toast.success('Form settings saved!');
  };


  // Function to handle View Marks navigation
  const handleViewMarks = () => {
    navigate('/view-marks');
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="flex-1 w-full">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">Marks Management</h1>
              <p className="text-xs sm:text-sm text-gray-600">Manage student grades and assessments for different courses and grade types.</p>
            </div>
          </div>
        </div>
        {/* Form Content */}
        <div className="p-4 sm:p-6 w-full">
          <div className="space-y-6 w-full">
              {/* Course Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Course Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Courses Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Courses *
                    </label>
                    <div className="relative">
                      <select
                        value={course}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setCourse(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300 transition-colors"
                        disabled={teacherCourses.length === 0}
                      >
                        <option value="">Select course...</option>
                        {teacherCourses.length === 0 ? (
                          <option value="" disabled>No courses available</option>
                        ) : (
                          teacherCourses.map((courseItem) => (
                            <option key={courseItem.courseId} value={courseItem.courseId}>
                              {courseItem.courseName}
                            </option>
                          ))
                        )}
                      </select>
                      <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  
                  {/* Grade Type Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Type *
                    </label>
                    <div className="relative">
                      <select
                        value={gradeType}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setGradeType(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300 transition-colors"
                      >
                        <option value="">Select grade type...</option>
                        <option value="QUIZ">Quiz</option>
                        <option value="ASSIGNMENT">Assignment</option>
                        <option value="GROUPWORK">Groupwork</option>
                        <option value="EXAM">Exam</option>
                      </select>
                      <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      placeholder="Enter assessment name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300 transition-colors"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSaveForm}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <IoMdSave className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>

              {/* Student Grades Table */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Student Grades</h2>
                  {course && (
                    <span className="text-sm text-gray-600 ml-2">
                      ({teacherCourses.find(c => c.courseId === course)?.courseName || 'Unknown Course'})
                    </span>
                  )}
                </div>

                {!course ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Please select a course to view students</p>
                  </div>
                ) : loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Loading students...</p>
                  </div>
                ) : students.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No students found for this course</p>
                  </div>
                ) : (
                  <>
                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Student Name</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student) => (
                            <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="font-medium text-gray-900">{student.studentName}</div>
                              </td>
                              <td className="py-3 px-4">
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="100"
                                  value={student.grade}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => 
                                    handleGradeChange(student.id, e.target.value)
                                  }
                                  placeholder="Enter grade (e.g., 85.5)"
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* Save All and View Marks Buttons */}
                {course && students.length > 0 && (
                  <div className="flex justify-end gap-3 mt-6">
                    {/* View Marks Button */}
                    <button
                      onClick={handleViewMarks}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Marks
                    </button>
                    
                    {/* Save All Button */}
                    <button
                      onClick={handleSaveAll}
                      disabled={loading}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <IoMdSave className="w-4 h-4" />
                      Save All Grades
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}