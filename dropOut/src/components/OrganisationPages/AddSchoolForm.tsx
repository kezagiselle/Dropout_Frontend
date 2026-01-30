import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu, X, Bell, Calendar, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar';
import userr from "../../../src/img/userr.png";
import { useUserAuth } from '../../context/useUserAuth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface FormData {
  name: string;
  region: string;
  address: string;
  type: string;
  principal: {
    name: string;
    email: string;
    password: string;
    phone: string;
  };
}

export default function AddSchoolForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    region: '',
    address: '',
    type: '',
    principal: {
      name: '',
      email: '',
      password: '',
      phone: ''
    }
  });

  const [activeTab, setActiveTab] = useState('Schools');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      principal: { ...prev.principal, [name]: value }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.region || !formData.type || !formData.address) {
      toast.error('Please fill in all school information fields');
      return;
    }
    
    if (!formData.principal.name || !formData.principal.email || !formData.principal.password || !formData.principal.phone) {
      toast.error('Please fill in all principal information fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.principal.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Password validation
    if (formData.principal.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    if (!token) {
      toast.error('Authentication required. Please log in again.');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${baseUrl}/api/schools/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast.success(result.message);
        // Reset form
        setFormData({
          name: '',
          region: '',
          address: '',
          type: '',
          principal: {
            name: '',
            email: '',
            password: '',
            phone: ''
          }
        });
        // Navigate back to schools page after a short delay
        setTimeout(() => {
          navigate('/org-schools');
        }, 1500);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error creating school:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    navigate('/org-schools');
  };

  const handleBack = () => {
    navigate('/org-schools');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
          {/* Left Section - Mobile Menu Button and Organization Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.name || 'Education Organization'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            {/* Top menu bar removed as requested */}
          </div>

          {/* Right Section - Calendar, Notifications, Profile */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            {/* Calendar - Hidden on mobile, visible on tablet and up */}
            <div className="hidden sm:flex items-center gap-1 lg:gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden lg:block" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>

            {/* Profile - Compact on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              <img src={userr} alt="User profile" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" />
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Organization Admin'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Organization Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <button 
                  onClick={handleBack}
                  className="bg-gray-800 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Add New School</h1>
              <p className="text-xs sm:text-sm text-gray-500">Enter School Informations</p>
            </div>

            {/* Basic School Information */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-cyan-400 mb-3 sm:mb-4">Basic School Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">School Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Region *</label>
                  <input
                    type="text"
                    name="region"
                    placeholder="e.g., Eastern Province"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">School Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select type</option>
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g., 789 Elite Avenue, Kayonza"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Principal Information */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-cyan-400 mb-3 sm:mb-4">Principal Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Principal Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.principal.name}
                    onChange={handlePrincipalChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Principal Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.principal.email}
                    onChange={handlePrincipalChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Principal Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.principal.password}
                    onChange={handlePrincipalChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Principal Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g., 0730079152"
                    value={formData.principal.phone}
                    onChange={handlePrincipalChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-4 sm:px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg font-medium hover:bg-cyan-50 text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 sm:px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save School'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}