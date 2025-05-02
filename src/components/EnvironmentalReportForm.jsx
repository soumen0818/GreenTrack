import React, { useState, useRef } from 'react';
import { MapPin, Upload, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnvironmentalReportForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    issueType: '',
    location: '',
    latitude: null,
    longitude: null,
    severityLevel: 3,
    description: '',
    isAnonymous: false,
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const navigateToDashboard = () => {
    navigate('/home');  // Navigate to home page instead of root
  };
  
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const issueTypes = [
    { value: 'air_pollution', label: 'Air Pollution' },
    { value: 'water_pollution', label: 'Water Pollution' },
    { value: 'illegal_dumping', label: 'Illegal Dumping' },
    { value: 'wildlife_endangerment', label: 'Wildlife Endangerment' },
    { value: 'deforestation', label: 'Deforestation' },
    { value: 'noise_pollution', label: 'Noise Pollution' },
    { value: 'industrial_violation', label: 'Industrial Violation' },
    { value: 'other', label: 'Other (Please specify)' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
};


  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: `Lat: ${position.coords.latitude.toFixed(6)}, Long: ${position.coords.longitude.toFixed(6)}`
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please enter location manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create FormData object for file uploads
      const reportData = new FormData();
      
      // Append form data to FormData object
      Object.keys(formData).forEach(key => {
        reportData.append(key, formData[key]);
      });
      
      // Append files
      files.forEach((file, index) => {
        reportData.append(`file${index}`, file);
      });
      
      // In a real app, you would send this data to your backend API
      // const response = await fetch('https://api.greentrack.com/reports', {
      //   method: 'POST',
      //   body: reportData
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          issueType: '',
          location: '',
          latitude: null,
          longitude: null,
          severityLevel: 3,
          description: '',
          isAnonymous: false,
          contactName: '',
          contactEmail: '',
          contactPhone: ''
        });
        setFiles([]);
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("There was an error submitting your report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={navigateToDashboard}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </button>
          <h2 className="text-2xl font-bold text-green-700">Report Environmental Issue</h2>
        </div>
        <div className="bg-green-100 p-2 rounded-full">
          <AlertTriangle className="text-amber-500 h-6 w-6" />
        </div>
      </div>
      
      {submitSuccess ? (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-700 font-medium">Thank you for your report! Your contribution helps us protect the environment.</p>
          <p className="text-green-600 mt-2">Report ID: ECO-{Math.floor(Math.random() * 90000) + 10000}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Type*
            </label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="" disabled>Select issue type</option>
              {issueTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          {/* Location with auto-detect */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location*
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location details"
                required
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button 
                type="button" 
                onClick={getCurrentLocation}
                className="bg-green-100 text-green-600 p-2 rounded-md hover:bg-green-200 flex items-center gap-1"
              >
                <MapPin className="h-5 w-5" />
                <span>Detect</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Your location will help us direct this report to the correct authorities
            </p>
          </div>
          
          {/* Severity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Severity Level: {formData.severityLevel}
            </label>
            <input
              type="range"
              name="severityLevel"
              min="1"
              max="5"
              value={formData.severityLevel}
              onChange={handleInputChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Minor</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Please provide details about the environmental issue..."
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            ></textarea>
          </div>
          
          {/* Photo/Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Evidence (Photos/Videos)
            </label>
            <div 
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
            >
              <Upload className="h-6 w-6 mx-auto text-gray-400" />
              <p className="mt-1 text-sm text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PNG, JPG, MP4 up to 10MB</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*,video/*"
                className="hidden"
              />
            </div>
            
            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                      {file.type.startsWith('image/') ? (
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="Preview" 
                          className="object-cover w-full h-full" 
                        />
                      ) : (
                        <video className="object-cover w-full h-full">
                          <source src={URL.createObjectURL(file)} />
                        </video>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Anonymous Reporting Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAnonymous"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleInputChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700">
              Submit anonymously
            </label>
          </div>
          
          {/* Contact Information (conditionally shown) */}
          {!formData.isAnonymous && (
            <div className="space-y-3 border-t pt-3">
              <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
              <p className="text-xs text-gray-500">
                We may need to contact you for additional information or updates
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md font-medium text-white 
                ${isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            * Required fields. By submitting this report, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      )}
    </div>
  );
};

export default EnvironmentalReportForm;