/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../context/useUserAuth';
import { FaArrowLeft, FaChevronDown, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
const baseUrl = import.meta.env.VITE_API_BASE_URL;


interface TeacherProps {
  onBack: () => void;
  onTeacherCreated?: () => void;
  teacherData?: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    specialization: string;
    courses: string[];
  };
}


function Teacher({ onBack, onTeacherCreated, teacherData }: TeacherProps) {
  const [formData, setFormData] = useState({
    name: teacherData?.name || '',
    email: teacherData?.email || '',
    password: '',
    phone: teacherData?.phone || '',
    specialization: teacherData?.specialization || '',
    courses: teacherData?.courses || []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const { user, token } = useUserAuth();
  const isEditMode = !!teacherData?.id;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseToggle = (courseId: string) => {
    setFormData(prev => {
      const currentCourses = prev.courses as string[];
      const isSelected = currentCourses.includes(courseId);
      return {
        ...prev,
        courses: isSelected
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
    
    // Validation for create mode - all fields required
    if (!isEditMode) {
      if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.specialization) {
        toast.error('Please fill in all required fields');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }
    } else {
      // Validation for edit mode - only validate provided email
      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error('Please enter a valid email address');
          return;
        }
      }
      // Only validate password if provided
      if (formData.password && formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }
    }
    
    setIsSubmitting(true);
    try {
      const payload: any = {};
      
      // For create mode, include all fields
      if (!isEditMode) {
        payload.name = formData.name;
        payload.email = formData.email;
        payload.password = formData.password;
        payload.phone = formData.phone;
        payload.schoolId = user?.schoolId;
        payload.specialization = formData.specialization;
        payload.courses = formData.courses;
      } else {
        // For edit mode, only include fields that have values
        if (formData.name) payload.name = formData.name;
        if (formData.email) payload.email = formData.email;
        if (formData.password) payload.password = formData.password;
        if (formData.phone) payload.phone = formData.phone;
        if (formData.specialization) payload.specialization = formData.specialization;
        if (formData.courses && (formData.courses as string[]).length > 0) {
          payload.courses = formData.courses;
        }
      }

      const url = isEditMode 
        ? `${baseUrl}/api/teachers/${teacherData?.id}`
        : `${baseUrl}/api/teachers/create`;
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data && data.success) {
        toast.success(data.message || `Teacher ${isEditMode ? 'updated' : 'created'} successfully!`);
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          specialization: '',
          courses: []
        });
  if (onTeacherCreated) onTeacherCreated();
        setTimeout(() => {
          onBack();
        }, 1500);
      } else {
        toast.error(data.message || `Failed to ${isEditMode ? 'update' : 'create'} teacher`);
      }
    } catch (error: any) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} teacher:`, error);
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-12 sm:pt-16 md:pt-20">
      <div className="w-full max-w-6xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12 min-h-[600px] sm:min-h-[700px] flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{isEditMode ? 'Edit Teacher' : 'Add New Teacher'}</h1>
            <p className="text-sm text-gray-600">{isEditMode ? 'Update teacher information' : 'Enter teacher information'}</p>
          </div>
          <button onClick={onBack} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm">
            <FaArrowLeft className="text-sm" />
            Back
          </button>
        </div>
        <form id="teacher-form" onSubmit={handleSubmit} className="flex-1 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUser className="text-blue-600 text-lg" />
              <h2 className="text-lg font-bold text-gray-900">Teacher Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Full Name {!isEditMode && <span className="text-red-500">*</span>}</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter full name" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required={!isEditMode} />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Email {!isEditMode && <span className="text-red-500">*</span>}</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={isEditMode ? "Leave empty to keep current" : "Enter email"} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required={!isEditMode} />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Password {isEditMode && <span className="text-gray-500 font-normal">(Leave empty to keep current)</span>}</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder={isEditMode ? "Enter new password (optional)" : "Enter password"} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required={!isEditMode} />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Phone {!isEditMode && <span className="text-red-500">*</span>}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={isEditMode ? "Leave empty to keep current" : "Enter phone number"} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required={!isEditMode} />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Specialization {!isEditMode && <span className="text-red-500">*</span>}</label>
                <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder={isEditMode ? "Leave empty to keep current" : "e.g., Mathematics, Science"} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required={!isEditMode} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">Courses (Optional)</label>
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
                            checked={(formData.courses as string[]).includes(course.id)}
                            onChange={() => handleCourseToggle(course.id)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                          />
                          <span className="text-sm text-gray-700">{course.name}</span>
                        </label>
                      ))
                    )}
                  </div>
                )}
                {(formData.courses as string[]).length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {(formData.courses as string[]).length} course(s) selected
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8">
          <button type="button" onClick={onBack} className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium w-full sm:w-auto">Cancel</button>
          <button type="submit" form="teacher-form" disabled={isSubmitting} className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm font-medium w-full sm:w-auto flex items-center justify-center gap-2">
            {isSubmitting ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>{isEditMode ? 'Updating...' : 'Creating...'}</>) : (isEditMode ? 'Update Teacher' : 'Create Teacher')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Teacher;