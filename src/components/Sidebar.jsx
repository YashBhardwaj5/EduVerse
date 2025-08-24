import { 
  Home, BookOpen, BarChart3,Award,TrendingUp, Users, User, Video, Calendar, 
  MessageSquare, DollarSign, Bell, Settings, PlusCircle, Star, Menu, X 
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const SidebarV1 = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/studentdashboard" },
    { id: "courses", label: "My Courses", icon: BookOpen, path: "/studentcourses" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user?.name || "Guest"}</h3>
              <p className="text-sm text-gray-500">Student</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)} // close sidebar on mobile
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export const SidebarV2 = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/instructordashboard" },
    { id: "courses", label: "My Courses", icon: BookOpen, path: "/mycourses" },
    { id: "content", label: "Content", icon: Video, path: "/createcontent" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user?.name || "Guest"}</h3>
              <p className="text-sm text-gray-500">Instructor</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)} // close on mobile
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};