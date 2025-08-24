import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function StudentLessonsPage() {
  const { id } = useParams(); // course_id
  const [lessons, setLessons] = useState([]);
  const token = localStorage.getItem("token");

  // Function to extract YouTube video ID from various YouTube URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Function to check if URL is a YouTube URL
  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return /(?:youtube\.com|youtu\.be)/.test(url);
  };

  // Function to render video based on URL type
  const renderVideo = (videoUrl) => {
    if (!videoUrl) return null;

    if (isYouTubeUrl(videoUrl)) {
      const videoId = getYouTubeVideoId(videoUrl);
      if (videoId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-64 md:h-80 lg:h-96 rounded-lg border"
          />
        );
      }
    }

    // For non-YouTube URLs, use regular video element
    return (
      <video
        src={videoUrl}
        controls
        className="w-full rounded-lg border"
      />
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/${id}/lessons`, {
        headers: { Authorization: token },
      })
      .then((res) => setLessons(res.data.lessons || []))
      .catch((err) => console.error("Error fetching lessons:", err));
  }, [id, token]);

  return (
    <div className="p-6 lg:pl-70">
      <h1 className="text-3xl font-bold mb-6">Lessons</h1>
      {lessons.length === 0 ? (
        <p>No lessons found for this course.</p>
      ) : (
        <ul className="space-y-6">
          {lessons.map((lesson) => (
            <li
              key={lesson.lesson_id}
              className="p-6 border rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
              <p className="text-gray-600 mb-4">{lesson.content}</p>
              
              {lesson.video_url && renderVideo(lesson.video_url)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}