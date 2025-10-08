import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../context/useUserAuth';
import { FaArrowLeft, FaChevronDown, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
const baseUrl = import.meta.env.VITE_API_BASE_URL;


interface TeacherProps {
  onBack: () => void;
  onTeacherCreated?: () => void;
}


function Teacher({ onBack, onTeacherCreated }: TeacherProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
    courses: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const { user, token } = useUserAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        schoolId: user?.schoolId,
        specialization: formData.specialization,
        courses: formData.courses ? [formData.courses] : []
      };
      const response = await axios.post(`${baseUrl}/api/teachers/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data && response.data.success) {
        toast.success(response.data.message || 'Teacher created successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          specialization: '',
          courses: ''
        });
  if (onTeacherCreated) onTeacherCreated();
        setTimeout(() => {
          onBack();
        }, 1500);
      } else {
        toast.error(response.data.message || 'Failed to create teacher');
      }
    } catch (error: any) {
      console.error('Error creating teacher:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-12 sm:pt-16 md:pt-20">
      <div className="w-full max-w-6xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12 min-h-[600px] sm:min-h-[700px] flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Add New Teacher</h1>
            <p className="text-sm text-gray-600">Enter teacher information</p>
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
                <label className="block text-sm font-semibold text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter password" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Specialization</label>
                <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="Enter specialization" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900" required />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Course (Optional)</label>
                <div className="relative">
                  <select name="courses" value={formData.courses} onChange={handleInputChange} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10" disabled={loadingCourses}>
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  {loadingCourses && (
                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8">
          <button type="button" onClick={onBack} className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium w-full sm:w-auto">Cancel</button>
          <button type="submit" form="teacher-form" disabled={isSubmitting} className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm font-medium w-full sm:w-auto flex items-center justify-center gap-2">
            {isSubmitting ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Creating...</>) : ('Create Teacher')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Teacher;