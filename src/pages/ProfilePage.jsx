import { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Shield, Edit3, Camera } from "lucide-react";

export const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    role: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/profile", {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setUserProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 lg:pl-64">
        <div className="p-6 space-y-8">
          <div className="animate-pulse">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-16 bg-gray-200 rounded-xl"></div>
                  <div className="h-16 bg-gray-200 rounded-xl"></div>
                  <div className="h-16 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'from-red-500 to-pink-500';
      case 'instructor':
        return 'from-blue-500 to-indigo-500';
      case 'student':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getRoleBg = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'from-red-50 to-pink-50 border-red-200';
      case 'instructor':
        return 'from-blue-50 to-indigo-50 border-blue-200';
      case 'student':
        return 'from-green-50 to-emerald-50 border-green-200';
      default:
        return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 lg:pl-64">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 text-lg">Manage your account information</p>
        </div>

        {/* Main Profile Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className={`bg-gradient-to-r ${getRoleColor(userProfile.role)} h-2`}></div>
            
            <div className="p-8">
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:scale-110">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {userProfile.name || "User Name"}
                </h2>
                
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getRoleBg(userProfile.role)} border`}>
                  <Shield className="w-4 h-4 mr-2" />
                  {userProfile.role ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1) : "Role"}
                </div>
              </div>

              {/* Profile Information Cards */}
              <div className="space-y-6">
                {/* Name Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600 mb-1">Full Name</p>
                        <p className="text-xl font-semibold text-gray-900">
                          {userProfile.name || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                      <Edit3 className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
                        <Mail className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-600 mb-1">Email Address</p>
                        <p className="text-xl font-semibold text-gray-900">
                          {userProfile.email || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                      <Edit3 className="w-5 h-5 text-green-600" />
                    </button>
                  </div>
                </div>

                {/* Role Card */}
                <div className={`bg-gradient-to-r ${getRoleBg(userProfile.role)} rounded-2xl p-6 border`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-600 mb-1">Account Role</p>
                        <p className="text-xl font-semibold text-gray-900">
                          {userProfile.role ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1) : "Not assigned"}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {userProfile.role === 'admin' && "Full system access and management"}
                          {userProfile.role === 'instructor' && "Create and manage courses"}
                          {userProfile.role === 'student' && "Access and enroll in courses"}
                          {!userProfile.role && "Role not assigned"}
                        </p>
                      </div>
                    </div>
                    <div className="text-purple-400">
                      <Shield className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 mt-8">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 font-semibold">
                  <Edit3 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
                
                <button className="sm:w-auto bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-2 font-medium">
                  <span>Change Password</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Account Security</h3>
                <p className="text-sm text-amber-800">
                  Keep your account secure by regularly updating your password and reviewing your profile information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};