import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface FormData {
  schoolName: string;
  schoolCode: string;
  typeOfSchool: string;
  ownership: string;
  educationLevel: string[];
  schoolCategory: string;
  province: string;
  district: string;
  sector: string;
  gpsCoordinates: string;
  exactAddress: string;
  emailAddress: string;
  phoneNumbers: string[];
  website: string;
  headOfSchool: string;
  registrationNumber: string;
  headOfDepartment: string;
  supervisingAuthority: string;
  numberOfTeachers: string;
  numberOfAdminStaff: string;
  maximumStudentCapacity: string;
  currentEnrollment: string;
  numberOfClassrooms: string;
  dormitories: string;
  facilities: {
    library: boolean;
    labs: boolean;
    ictRooms: boolean;
    sports: boolean;
    canteen: boolean;
    others: boolean;
  };
  internetAccess: string;
}

export default function AddNewSchool() {
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    schoolCode: '',
    typeOfSchool: '',
    ownership: '',
    educationLevel: [],
    schoolCategory: '',
    province: '',
    district: '',
    sector: '',
    gpsCoordinates: '',
    exactAddress: '',
    emailAddress: '',
    phoneNumbers: [''],
    website: '',
    headOfSchool: '',
    registrationNumber: '',
    headOfDepartment: '',
    supervisingAuthority: '',
    numberOfTeachers: '',
    numberOfAdminStaff: '',
    maximumStudentCapacity: '',
    currentEnrollment: '',
    numberOfClassrooms: '',
    dormitories: '',
    facilities: {
      library: false,
      labs: false,
      ictRooms: false,
      sports: false,
      canteen: false,
      others: false
    },
    internetAccess: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      facilities: { ...prev.facilities, [name]: checked }
    }));
  };

  const handleEducationLevelChange = (level: string) => {
    setFormData(prev => ({
      ...prev,
      educationLevel: prev.educationLevel.includes(level)
        ? prev.educationLevel.filter(l => l !== level)
        : [...prev.educationLevel, level]
    }));
  };

  const addPhoneNumber = () => {
    setFormData(prev => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, '']
    }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...formData.phoneNumbers];
    newPhones[index] = value;
    setFormData(prev => ({ ...prev, phoneNumbers: newPhones }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <button className="bg-gray-800 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Add New School</h1>
          <p className="text-sm text-gray-500">Enter School Informations</p>
        </div>

        {/* Basic School Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">Basic School Information</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Code / Unique ID</label>
              <input
                type="text"
                name="schoolCode"
                value={formData.schoolCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type of School</label>
              <select
                name="typeOfSchool"
                value={formData.typeOfSchool}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ownership</label>
              <select
                name="ownership"
                value={formData.ownership}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select ownership</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="religious">Religious</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.educationLevel.includes('Primary')}
                    onChange={() => handleEducationLevelChange('Primary')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Primary</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.educationLevel.includes('Secondary')}
                    onChange={() => handleEducationLevelChange('Secondary')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Secondary</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.educationLevel.includes('University')}
                    onChange={() => handleEducationLevelChange('University')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">University</span>
                </label>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Establishment</label>
                <input
                  type="text"
                  name="yearOfEstablishment"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Category</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="schoolCategory"
                    value="Day"
                    checked={formData.schoolCategory === 'Day'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Day</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="schoolCategory"
                    value="Boarding"
                    checked={formData.schoolCategory === 'Boarding'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Boarding</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="schoolCategory"
                    value="Mixed"
                    checked={formData.schoolCategory === 'Mixed'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Mixed</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">Location & Contact</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select province</option>
                <option value="kigali">Kigali</option>
                <option value="northern">Northern</option>
                <option value="southern">Southern</option>
                <option value="eastern">Eastern</option>
                <option value="western">Western</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select district</option>
                <option value="gasabo">Gasabo</option>
                <option value="kicukiro">Kicukiro</option>
                <option value="nyarugenge">Nyarugenge</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select sector</option>
                <option value="sector1">Sector 1</option>
                <option value="sector2">Sector 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GPS Coordinates</label>
              <input
                type="text"
                name="gpsCoordinates"
                placeholder="Optional"
                value={formData.gpsCoordinates}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Exact Address</label>
            <textarea
              name="exactAddress"
              value={formData.exactAddress}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number(s)</label>
              {formData.phoneNumbers.map((phone, index) => (
                <input
                  key={index}
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
              ))}
              <button
                onClick={addPhoneNumber}
                className="text-orange-500 text-sm font-medium hover:text-orange-600"
              >
                + Add More
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              name="website"
              placeholder="Optional"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Administration */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">Administration</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Head of School / Principal</label>
              <input
                type="text"
                name="headOfSchool"
                value={formData.headOfSchool}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Head of Department(s)</label>
              <input
                type="text"
                name="headOfDepartment"
                value={formData.headOfDepartment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supervising Authority</label>
              <select
                name="supervisingAuthority"
                value={formData.supervisingAuthority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select authority</option>
                <option value="reb">REB</option>
                <option value="mineduc">MINEDUC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Staffing & Capacity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">Staffing & Capacity</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Teachers</label>
              <input
                type="number"
                name="numberOfTeachers"
                value={formData.numberOfTeachers}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Admin Staff</label>
              <input
                type="number"
                name="numberOfAdminStaff"
                value={formData.numberOfAdminStaff}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Student Capacity</label>
              <input
                type="number"
                name="maximumStudentCapacity"
                value={formData.maximumStudentCapacity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Enrollment</label>
              <input
                type="number"
                name="currentEnrollment"
                value={formData.currentEnrollment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Infrastructure */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">Infrastructure</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Classrooms</label>
              <input
                type="number"
                name="numberOfClassrooms"
                value={formData.numberOfClassrooms}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dormitories</label>
              <input
                type="text"
                name="dormitories"
                placeholder="Optional if boarding"
                value={formData.dormitories}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">Facilities</label>
            <div className="grid grid-cols-3 gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="library"
                  checked={formData.facilities.library}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Library</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="labs"
                  checked={formData.facilities.labs}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Labs</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="ictRooms"
                  checked={formData.facilities.ictRooms}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">ICT Rooms</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="sports"
                  checked={formData.facilities.sports}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Sports</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="canteen"
                  checked={formData.facilities.canteen}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Canteen</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="others"
                  checked={formData.facilities.others}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Others</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Internet Access</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="internetAccess"
                  value="Yes"
                  checked={formData.internetAccess === 'Yes'}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="internetAccess"
                  value="No"
                  checked={formData.internetAccess === 'No'}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg font-medium hover:bg-cyan-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600"
          >
            Save School
          </button>
        </div>
      </div>
    </div>
  );
}