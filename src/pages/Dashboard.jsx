import { 
  Home, BookOpen, BarChart3, Users, User, Video, Calendar, 
  MessageSquare, DollarSign, Bell, Settings, PlusCircle, Star, Menu, X,
  Clock, ChevronRight, TrendingUp
} from "lucide-react";
import { useContext, useState } from "react";


export const DashboardContent = ({ allCourses }) => (
  <div className="space-y-6">
    {/* Welcome Section */}
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
          <p className="text-indigo-100">Discover and explore all available courses on our platform</p>
        </div>
        <div className="hidden md:block">
          <TrendingUp className="h-16 w-16 text-indigo-200" />
        </div>
      </div>
    </div>

    {/* Platform Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900">150+</h3>
            <p className="text-gray-600 text-sm">Total Courses</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-full">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900">25K+</h3>
            <p className="text-gray-600 text-sm">Active Students</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900">4.7</h3>
            <p className="text-gray-600 text-sm">Platform Rating</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 rounded-full">
            <Video className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900">500+</h3>
            <p className="text-gray-600 text-sm">Hours of Content</p>
          </div>
        </div>
      </div>
    </div>

    {/* All Available Courses */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">All Available Courses</h2>
          <span className="text-sm text-gray-500">{allCourses.length} courses available</span>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        {allCourses.map((course) => (
          <div key={course.id} className="p-4 border-b border-gray-100 last:border-b-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Course Image */}
              <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {course.image}
              </div>
              
              {/* Course Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                  {course.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-indigo-600 text-lg">
                    ₹{course.price.toLocaleString()}
                  </div>
                </div>
                
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Edit Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {allCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Course Image */}
            <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              {course.image}
            </div>
            
            {/* Course Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
                {course.title}
              </h3>
              
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-indigo-600 text-lg">
                  ₹{course.price.toLocaleString()}
                </div>
              </div>
              
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Edit Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
