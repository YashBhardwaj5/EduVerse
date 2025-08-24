// src/pages/StudentDashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PublicCourseCard } from "../components/PublicCourseCard";
import axios from "axios";

export const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  // Fetch all courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/courses"); // adjust your backend route
        setCourses(res.data.courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  if (!user) return <p className="text-center py-10">Please log in to see your dashboard.</p>;

  return (
    <div className="px-4 sm:px-6 lg:pl-70 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">Continue your learning journey</p>
      </div>

      {/* All Courses */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Available Courses</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => (
                <PublicCourseCard
                  key={course.course_id}
                  courseId={course.course_id} 
                  title={course.title}
                  description={course.content}
                  price={course.price}
                  thumbnail={course.thumbnail_url}
                />
              ))
            ) : (
              <p className="text-gray-500">No courses available right now.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
