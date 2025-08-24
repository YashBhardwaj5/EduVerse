// pages/LessonsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LessonCard from "@/components/LessonCard";
import LessonForm from "./LessonForm";
import { MainLayout } from "@/layouts/MainLayout";

export const LessonsPage = () => {
  const { courseId } = useParams(); // course id from route
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/courses/${courseId}/lessons`,
        { headers: { Authorization: token } }
      );
      setLessons(res.data.lessons);
    } catch (err) {
      console.error(err);
      setError("Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (lessonData) => {
    try {
      if (editingLesson) {
        await axios.put(
          `http://localhost:3000/lessons/${editingLesson.lesson_id}`,
          lessonData,
          { headers: { Authorization: token } }
        );
      } else {
        await axios.post(
          `http://localhost:3000/courses/${courseId}/lessons`,
          lessonData,
          { headers: { Authorization: token } }
        );
      }
      setShowForm(false);
      setEditingLesson(null);
      fetchLessons();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save lesson");
    }
  };

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await axios.delete(`http://localhost:3000/lessons/${lessonId}`, {
        headers: { Authorization: token },
      });
      fetchLessons();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete lesson");
    }
  };

  return (
    <div className="p-6 lg:pl-70">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lessons</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Add Lesson
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-600">Loading lessons...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {showForm && (
            <LessonForm
              initialData={editingLesson}
              onCancel={() => {
                setShowForm(false);
                setEditingLesson(null);
              }}
              onSave={handleSave}
            />
          )}

          {lessons.length === 0 ? (
            <p className="text-gray-500">No lessons added yet.</p>
          ) : (
            lessons.map((lesson) => (
              <LessonCard
                key={lesson.lesson_id}
                title={lesson.title}
                description={lesson.content}
                videoUrl={lesson.video_url}
                onEdit={() => {
                  setEditingLesson(lesson);
                  setShowForm(true);
                }}
                onDelete={() => handleDelete(lesson.lesson_id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
