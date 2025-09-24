import { useState } from 'react';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';

interface CourseProps {
  onBack: () => void;
}

function Course({ onBack }: CourseProps) {
  const [formData, setFormData] = useState({
    courseName: '',
    credit: '',
    grade: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-12 sm:pt-16 md:pt-20">
      {/* Main Content Card */}
      <div className="w-full max-w-6xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12 min-h-[600px] sm:min-h-[700px] flex flex-col">
        {/* Centered Form Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl space-y-6 sm:space-y-8">
            {/* Main Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Add New Course
                </h1>
                <p className="text-sm text-gray-600">
                  Monitor and manage courses
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

            {/* Section Title */}
            <div>
              <h2 className="text-lg font-semibold text-orange-600 mb-6">
                Create a Course
              </h2>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Course Name
                </label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  placeholder="Enter course name"
                />
              </div>

              {/* Credit Hours */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Credit Hours
                </label>
                <input
                  type="number"
                  name="credit"
                  value={formData.credit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  placeholder="Enter credit hours"
                  min="1"
                  max="6"
                />
              </div>

              {/* Grade Level */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Grade Level
                </label>
                <div className="relative">
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                  >
                    <option value="">Select grade level</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 resize-none"
                  placeholder="Enter course description"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons - Bottom Right */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6">
          <button className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium w-full sm:w-auto">
            Cancel
          </button>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium w-full sm:w-auto">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default Course;
