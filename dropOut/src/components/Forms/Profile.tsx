import { useState, useRef } from 'react';
import { FaArrowLeft, FaCamera, FaCloudUploadAlt } from 'react-icons/fa';
import pe3 from "../../img/pe3.png";

interface ProfileProps {
  onBack: () => void;
}

function Profile({ onBack }: ProfileProps) {
  const [, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(pe3);
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-2 sm:p-4 pt-16 sm:pt-20">
      {/* Header */}
      <div className="flex justify-end w-full max-w-md mb-6 sm:mb-8">
        <button 
          onClick={onBack}
          className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm sm:text-base"
        >
          <FaArrowLeft className="text-sm" />
          Back
        </button>
      </div>

      {/* Profile Picture with Camera Icon */}
      <div className="relative mb-4 sm:mb-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden">
          <img 
            src={previewImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <FaCamera className="text-white text-xs sm:text-sm" />
        </div>
    </div>

      {/* Title and Description */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center px-4">
        Update Profile Picture
      </h2>
      <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 max-w-md px-4">
        Upload a new photo to personalize your profile
      </p>

      {/* Upload Area */}
      <div 
        className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors duration-200"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <FaCloudUploadAlt className="text-orange-500 text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4" />
        <p className="text-gray-700 font-medium mb-2 text-sm sm:text-base">
          Drag and drop your image here
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">
          or click to browse files
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-md">
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base">
          Cancel
        </button>
        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Profile;