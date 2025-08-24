// MyCourses.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { InstructorCourseCard } from "@/components/InstructorCourseCard";

export const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail_url: "",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/instructor/courses", {
        headers: { Authorization: token }, // use `Bearer ${token}` if your middleware expects it
      })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`, {
        headers: { Authorization: token },
      });
      setCourses((prev) => prev.filter((c) => c.course_id !== id));
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title ?? "",
      description: course.description ?? "",
      price: String(course.price ?? ""),
      thumbnail_url: course.thumbnail_url ?? "",
    });
  };

  const handleUpdate = async () => {
    if (!editingCourse) return;
    const token = localStorage.getItem("token");
    try {
      setSaving(true);
      await axios.put(
        `http://localhost:3000/courses/${editingCourse.course_id}`,
        {
          title: formData.title || null,
          description: formData.description || null,
          price: formData.price === "" ? null : Number(formData.price),
          thumbnail_url: formData.thumbnail_url || null,
        },
        { headers: { Authorization: token } }
      );

      // 🔥 Update UI immediately (backend only returns {message: ...})
      setCourses((prev) =>
        prev.map((c) =>
          c.course_id === editingCourse.course_id
            ? {
                ...c,
                title: formData.title,
                description: formData.description,
                price: formData.price === "" ? c.price : Number(formData.price),
                thumbnail_url: formData.thumbnail_url,
              }
            : c
        )
      );

      setEditingCourse(null);
    } catch (err) {
      console.error("Failed to update course:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 lg:pl-64">
      <div className="p-6 space-y-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Courses
          </h1>
          <p className="text-gray-600 text-lg">Manage and edit your course collection</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <InstructorCourseCard
              key={course.course_id}
              title={course.title}
              description={course.description}
              image={course.thumbnail_url}
              price={course.price}
              onDelete={() => handleDelete(course.course_id)}
              onEdit={() => handleEditClick(course)}
              onArrowClick={() =>
                navigate(`/instructor/courses/${course.course_id}/lessons`)
              }
            />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="max-w-md mx-auto">
              <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-500">Create your first course to get started.</p>
            </div>
          </div>
        )}

        {/* Edit Popup */}
        {editingCourse && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border p-2 rounded mb-3"
                placeholder="Title"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border p-2 rounded mb-3"
                placeholder="Description"
                rows={4}
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border p-2 rounded mb-3"
                placeholder="Price"
                min="0"
                step="0.01"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
              <input
                type="text"
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                className="w-full border p-2 rounded mb-4"
                placeholder="https://..."
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
