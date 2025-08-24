import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function StudentCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/my-courses", {
        headers: { Authorization: token },
      })
      .then((res) => setMyCourses(res.data.courses))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="p-6 lg:pl-70">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      {myCourses.length === 0 ? (
        <p className="text-gray-500 text-lg">
          You are not enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col"
            >
              {/* Thumbnail */}
              {course.thumbnail_url ? (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                  No Thumbnail
                </div>
              )}

              {/* Course Info */}
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 flex-grow">{course.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Enrolled on:{" "}
                {new Date(course.purchase_date).toLocaleDateString()}
              </p>

              {/* Button */}
              <button
                onClick={() => navigate(`/student/lessons/${course.course_id}`)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Lessons
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
