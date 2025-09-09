import React, { useState, useRef } from 'react'
import { FaArrowLeft, FaCloudUploadAlt, FaCalendarAlt, FaUser, FaPrint } from 'react-icons/fa'

interface StudentLastProps {
  onBack: () => void;
}

function StudentLast({ onBack }: StudentLastProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSaveChanges = () => {
    // Handle save changes logic here
    console.log('Saving changes...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Profile</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Watch Student information to monitor dropout risk and academic progress</p>
          </div>
          <button 
            onClick={onBack}
            className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm w-full sm:w-auto justify-center"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </button>
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

        {/* Student Information Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaUser className="text-blue-600 text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Marcus Johnson</h2>
                <p className="text-sm sm:text-base text-gray-600">Grade 10 • Student ID: #ST-2024-0847</p>
                <p className="text-sm sm:text-base text-gray-600">Westfield High School</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-xs sm:text-sm font-medium justify-center">
                <FaCalendarAlt className="text-xs sm:text-sm" />
                <span className="hidden xs:inline">Schedule Meeting</span>
                <span className="xs:hidden">Schedule</span>
              </button>
              <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-xs sm:text-sm font-medium justify-center">
                <FaUser className="text-xs sm:text-sm" />
                <span className="hidden xs:inline">Assign as Mentor</span>
                <span className="xs:hidden">Mentor</span>
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-xs sm:text-sm font-medium justify-center">
                <FaPrint className="text-xs sm:text-sm" />
                <span className="hidden xs:inline">Print Report</span>
                <span className="xs:hidden">Print</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Panel - Image Upload */}
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors duration-200 min-h-[250px] sm:min-h-[300px] flex flex-col items-center justify-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewImage ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FaCloudUploadAlt className="text-orange-500 text-3xl sm:text-4xl mb-3 sm:mb-4" />
                    <p className="text-gray-700 font-medium mb-2 text-sm sm:text-base">Drag and drop your image here</p>
                    <p className="text-gray-500 text-xs sm:text-sm">or click to browse files</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Right Panel - Disciplinary Cases */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Disciplinary Cases</h3>
              <div className="space-y-3 sm:space-y-4 max-h-60 sm:max-h-80 overflow-y-auto pr-2">
                {/* Case 1 */}
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium mb-1">Case 1</div>
                    <div className="text-sm text-gray-600">By: [Details to be filled]</div>
                  </div>
                </div>

                {/* Case 2 */}
                <div className="flex gap-4">
                  <div className="w-1 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium mb-1">Case 2</div>
                    <div className="text-sm text-gray-600">By: [Details to be filled]</div>
                  </div>
                </div>

                {/* Case 3 */}
                <div className="flex gap-4">
                  <div className="w-1 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium mb-1">Case 3</div>
                    <div className="text-sm text-gray-600">By: [Details to be filled]</div>
                  </div>
                </div>

                {/* Additional placeholder cases */}
                <div className="flex gap-4">
                  <div className="w-1 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium mb-1">Case 4</div>
                    <div className="text-sm text-gray-600">By: [Details to be filled]</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium mb-1">Case 5</div>
                    <div className="text-sm text-gray-600">By: [Details to be filled]</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto">
              Cancel
            </button>
            <button 
              onClick={handleSaveChanges}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLast;