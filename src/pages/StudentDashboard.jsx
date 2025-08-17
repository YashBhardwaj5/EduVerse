import { Star, Play, BookOpen, TrendingUp } from "lucide-react";
import { useSampleCourses } from "../context/SampleCourses";
import { Header } from "../components/Header";
import { SidebarV1 } from "../components/Sidebar";

export const StudentDashboard = () => {
  const user = {
    name: "abc",
  };
  const courses = useSampleCourses();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16 flex">
        {/* Sidebar */}
        <SidebarV1 user={user} />

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Continue your learning journey
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">5</h3>
                    <p className="text-gray-600">Enrolled Courses</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">78%</h3>
                    <p className="text-gray-600">Average Progress</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">3</h3>
                    <p className="text-gray-600">Certificates Earned</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Courses */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  My Courses
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-3xl mb-4">
                        {course.image}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        by {course.instructor}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                      <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
                        <Play className="h-4 w-4" />
                        <span>Continue Learning</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
