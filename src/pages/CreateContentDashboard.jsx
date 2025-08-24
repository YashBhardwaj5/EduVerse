import axios from "axios";
import { 
  ArrowLeft, Upload, DollarSign, BookOpen, FileText, Image 
} from "lucide-react";
import { useState } from "react";

export const CreateContentDashboard = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnailUrl: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      await axios.post(
        "http://localhost:3000/courses",
        {
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price), // ✅ ensure numeric
          thumbnail_url: formData.thumbnailUrl,
        },
        {
          headers: {
            Authorization: token // ✅ correct way
          },
        }
      );

      onCancel(); // go back to dashboard after submit
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.price &&
    formData.thumbnailUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 lg:pl-64">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={onCancel}
                className="group flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-all duration-200 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Create New Course
                </h1>
                <p className="text-gray-600 mt-1">Design your next educational masterpiece</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 h-1"></div>
          
          <div className="p-8">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl mb-4">
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Course Information
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Fill in the details below to bring your course to life and inspire students worldwide
              </p>
            </div>

            <div className="space-y-8">
              {/* Course Title */}
              <div className="group">
                <label
                  htmlFor="title"
                  className="flex items-center space-x-3 text-sm font-semibold text-gray-700 mb-3"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg group-focus-within:bg-blue-200 transition-colors">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>Course Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging course title that captures attention"
                  className="w-full px-6 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-200 placeholder-gray-400"
                  required
                />
              </div>

              {/* Course Description */}
              <div className="group">
                <label
                  htmlFor="description"
                  className="flex items-center space-x-3 text-sm font-semibold text-gray-700 mb-3"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg group-focus-within:bg-green-200 transition-colors">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Course Description</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the value students will gain and what makes your course special"
                  rows={5}
                  className="w-full px-6 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-200 resize-none placeholder-gray-400"
                  required
                />
              </div>

              {/* Price */}
              <div className="group">
                <label
                  htmlFor="price"
                  className="flex items-center space-x-3 text-sm font-semibold text-gray-700 mb-3"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-lg group-focus-within:bg-yellow-200 transition-colors">
                    <DollarSign className="h-4 w-4 text-yellow-600" />
                  </div>
                  <span>Course Price (₹)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-semibold text-lg">₹</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-6 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-200 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Thumbnail URL */}
              <div className="group">
                <label
                  htmlFor="thumbnailUrl"
                  className="flex items-center space-x-3 text-sm font-semibold text-gray-700 mb-3"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg group-focus-within:bg-purple-200 transition-colors">
                    <Image className="h-4 w-4 text-purple-600" />
                  </div>
                  <span>Thumbnail Image URL</span>
                </label>
                <input
                  type="url"
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/your-amazing-course-image.jpg"
                  className="w-full px-6 py-4 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-200 placeholder-gray-400"
                  required
                />
                {formData.thumbnailUrl && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-3">Live Preview:</p>
                    <div className="w-40 h-24 rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                      <img
                        src={formData.thumbnailUrl}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full bg-red-50 items-center justify-center text-red-400 text-sm font-medium hidden border-2 border-red-200">
                        Invalid URL
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                >
                  <span>Cancel</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 flex-1 sm:flex-initial font-semibold ${
                    isFormValid
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Upload className="h-5 w-5" />
                  <span>Create Course</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Info Card */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200/50 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Pro Tips for Course Success
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Create compelling, benefit-focused titles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Use high-quality 16:9 aspect ratio images</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Write descriptions that solve student problems</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Research competitive pricing in your niche</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};