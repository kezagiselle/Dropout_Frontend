/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { FaArrowLeft, FaChevronDown, FaUser, FaCalendarAlt } from 'react-icons/fa'
import { FaHouseChimney } from "react-icons/fa6";
import { toast } from 'react-toastify';
import StudentProfile from './StudentProfile';
import { useUserAuth } from '../../context/useUserAuth';
import axios from 'axios';

interface StudentProps {
  onBack: () => void;
  onStudentCreated?: () => void;
}

function Student({ onBack, onStudentCreated }: StudentProps) {
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  const { user, token } = useUserAuth();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    // Parent Information
    parentName: '',
    parentEmail: '',
    parentPassword: '',
    parentPhone: '',
    parentOccupation: '',
    
    // Student Information
    studentName: '',
    studentEmail: '',
    studentPassword: '',
    studentPhone: '',
    dateOfBirth: '',
    gender: '',
    enrollmentYear: '',
    courseIds: [] as string[],
    academicYear: '',
    semester: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseToggle = (courseId: string) => {
    setFormData(prev => {
      const currentCourses = prev.courseIds;
      const isSelected = currentCourses.includes(courseId);
      return {
        ...prev,
        courseIds: isSelected
          ? currentCourses.filter(id => id !== courseId)
          : [...currentCourses, courseId]
      };
    });
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const response = await axios.get(`${baseUrl}/api/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.data && Array.isArray(response.data.data)) {
          setCourses(response.data.data.map((course: { id: string; name: string }) => ({
            id: course.id,
            name: course.name
          })));
        } else {
          toast.error(response.data.message);
          setCourses([]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses. Please try again.');
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses(); 
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate user context and schoolId
    if (!user?.schoolId) {
      toast.error('School information not found. Please log in again.');
      return;
    }
    
    // Validate form
    if (!formData.parentName || !formData.parentEmail || !formData.parentPassword || 
        !formData.parentPhone || !formData.parentOccupation ||
        !formData.studentName || !formData.studentEmail || !formData.studentPassword ||
        !formData.studentPhone || !formData.dateOfBirth || !formData.gender || !formData.enrollmentYear ||
        !formData.academicYear || !formData.semester) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate at least one course is selected
    if (formData.courseIds.length === 0) {
      toast.error('Please select at least one course');
      return;
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.parentEmail)) {
      toast.error('Please enter a valid parent email address');
      return;
    }
    if (!emailRegex.test(formData.studentEmail)) {
      toast.error('Please enter a valid student email address');
      return;
    }

    // Validate password lengths
    if (formData.parentPassword.length < 6) {
      toast.error('Parent password must be at least 6 characters long');
      return;
    }
    if (formData.studentPassword.length < 6) {
      toast.error('Student password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        parentName: formData.parentName,
        parentEmail: formData.parentEmail,
        parentPassword: formData.parentPassword,
        parentPhone: formData.parentPhone,
        parentOccupation: formData.parentOccupation,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        studentPassword: formData.studentPassword,
        studentPhone: formData.studentPhone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender.toUpperCase(),
        enrollmentYear: parseInt(formData.enrollmentYear),
        schoolId: user?.schoolId,
        courseIds: formData.courseIds,
        academicYear: formData.academicYear,
        semester: formData.semester.toUpperCase()
      };

      console.log('Sending student payload:', payload); // Debug log

      const response = await fetch(`${baseUrl}/api/students/create-with-parent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });
      const res = await response.json();

      if (!res.success && !res.data) {

        toast.error(res.message);

      }

      toast.success(res.message);

      // Reset form
      setFormData({
        parentName: '',
        parentEmail: '',
        parentPassword: '',
        parentPhone: '',
        parentOccupation: '',
        studentName: '',
        studentEmail: '',
        studentPassword: '',
        studentPhone: '',
        dateOfBirth: '',
        gender: '',
        enrollmentYear: '',
        courseIds: [],
        academicYear: '',
        semester: ''
      });
      
      // Call the callback to refresh the student list
      if (onStudentCreated) {
        onStudentCreated();
      }
      
      // Optionally navigate back or show success message
      setTimeout(() => {
        onBack();
      }, 1500);
      
    } catch (error: any) {
      console.error('Error creating student:', error);
      toast.error(error.message || 'An error occurred. Please try again.');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showStudentProfile) {
    return <StudentProfile onBack={() => setShowStudentProfile(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-12 sm:pt-16 md:pt-20">
      {/* Main Content Card */}
      <div className="w-full max-w-6xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12 min-h-[600px] sm:min-h-[700px] flex flex-col">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Add New Student
            </h1>
            <p className="text-sm text-gray-600">
              Enter student information to monitor dropout risk and academic progress
            </p>
          </div>
          
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </button>
        </div>

        {/* Form Content */}
        <form id="student-form" onSubmit={handleSubmit} className="flex-1 space-y-8">
          {/* Student Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUser className="text-blue-600 text-lg" />
              <h2 className="text-lg font-bold text-gray-900">Student Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Student Email
                </label>
                <input
                  type="email"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleInputChange}
                  placeholder="Enter student email"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Student Password
                </label>
                <input
                  type="password"
                  name="studentPassword"
                  value={formData.studentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter student password"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Student Phone
                </label>
                <input
                  type="tel"
                  name="studentPhone"
                  value={formData.studentPhone}
                  onChange={handleInputChange}
                  placeholder="Enter student phone"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 pr-10"
                    required
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Enrollment Year
                </label>
                <div className="relative">
                  <select
                    name="enrollmentYear"
                    value={formData.enrollmentYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Academic Year
                </label>
                <input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  placeholder="e.g., 2025-2026"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Semester
                </label>
                <div className="relative">
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                    required
                  >
                    <option value="">Select Semester</option>
                    <option value="SPRING">Spring</option>
                    <option value="SUMMER">Summer</option>
                    <option value="FALL">Fall</option>
                    <option value="WINTER">Winter</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Courses <span className="text-red-500">*</span>
                </label>
                {loadingCourses ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading courses...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-300 rounded-lg bg-gray-50 max-h-48 overflow-y-auto">
                    {courses.length === 0 ? (
                      <p className="text-gray-500 text-sm col-span-full">No courses available</p>
                    ) : (
                      courses.map((course) => (
                        <label key={course.id} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.courseIds.includes(course.id)}
                            onChange={() => handleCourseToggle(course.id)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                          />
                          <span className="text-sm text-gray-700">{course.name}</span>
                        </label>
                      ))
                    )}
                  </div>
                )}
                {formData.courseIds.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.courseIds.length} course(s) selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Parent Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FaHouseChimney className="text-blue-600 text-lg" />
              <h2 className="text-lg font-bold text-gray-900">Parent Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Parent Name
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="Enter parent name"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Parent Email
                </label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  placeholder="Enter parent email"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Parent Password
                </label>
                <input
                  type="password"
                  name="parentPassword"
                  value={formData.parentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter parent password"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Parent Phone
                </label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  placeholder="Enter parent phone"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Parent Occupation
                </label>
                <input
                  type="text"
                  name="parentOccupation"
                  value={formData.parentOccupation}
                  onChange={handleInputChange}
                  placeholder="Enter parent occupation"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8">
          <button 
            type="button"
            onClick={onBack}
            className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium w-full sm:w-auto"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="student-form"
            disabled={isSubmitting}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm font-medium w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              'Create Student'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Student