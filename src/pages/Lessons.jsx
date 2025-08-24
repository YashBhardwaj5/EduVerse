import { 
  ArrowLeft, Plus, Video, FileText, Edit3, Trash2, Eye, Move, 
  Users, Star, MoreVertical, BookOpen
} from "lucide-react";
import { useState } from "react";

export const LessonsDashboard=()=> {
  // Sample course data
  const course = {
    id: 1,
    title: "Complete React Development Course",
    description: "Master React from basics to advanced concepts",
    image: "🚀",
    category: "Programming",
    students: 1245,
    rating: 4.8,
    totalLessons: 8,
    totalDuration: "12h 45m"
  };

  // Sample lessons data
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Introduction to React",
      videoUrl: "https://youtube.com/watch?v=abc123",
      textContent: "Welcome to React! In this lesson, we'll cover the basics of React and why it's such a popular library for building user interfaces.",
      position: 1,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Setting Up Your Development Environment",
      videoUrl: "https://youtube.com/watch?v=def456",
      textContent: "Let's set up our development environment with Node.js, npm, and create-react-app.",
      position: 2,
      createdAt: "2024-01-16"
    },
    {
      id: 3,
      title: "JSX and Components",
      videoUrl: "https://youtube.com/watch?v=ghi789",
      textContent: "Understanding JSX syntax and creating your first React components.",
      position: 3,
      createdAt: "2024-01-18"
    },
    {
      id: 4,
      title: "Props and State Management",
      videoUrl: "https://youtube.com/watch?v=jkl012",
      textContent: "Learn how to pass data between components using props and manage component state.",
      position: 4,
      createdAt: "2024-01-20"
    },
    {
      id: 5,
      title: "React Hooks - useState and useEffect",
      videoUrl: "https://youtube.com/watch?v=mno345",
      textContent: "Deep dive into React Hooks, focusing on useState and useEffect.",
      position: 5,
      createdAt: "2024-01-22"
    },
    {
      id: 6,
      title: "Event Handling in React",
      videoUrl: "https://youtube.com/watch?v=pqr678",
      textContent: "Handle user interactions and events in React applications.",
      position: 6,
      createdAt: "2024-01-24"
    },
    {
      id: 7,
      title: "Conditional Rendering and Lists",
      videoUrl: "https://youtube.com/watch?v=stu901",
      textContent: "Learn how to conditionally render components and work with lists in React.",
      position: 7,
      createdAt: "2024-01-26"
    },
    {
      id: 8,
      title: "Building a Complete React Project",
      videoUrl: "https://youtube.com/watch?v=vwx234",
      textContent: "Put everything together by building a complete React application from scratch.",
      position: 8,
      createdAt: "2024-01-28"
    }
  ]);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [sortBy, setSortBy] = useState("position");
  const [draggedLesson, setDraggedLesson] = useState(null);

  // Filter and sort lessons
  const filteredLessons = lessons
    .sort((a, b) => {
      switch (sortBy) {
        case "position":
          return a.position - b.position;
        case "title":
          return a.title.localeCompare(b.title);
        case "date":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  const handleDeleteLesson = (lesson) => {
    setLessonToDelete(lesson);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setLessons(prev => prev.filter(lesson => lesson.id !== lessonToDelete.id));
    setShowDeleteModal(false);
    setLessonToDelete(null);
  };

  const handleDragStart = (e, lesson) => {
    setDraggedLesson(lesson);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetLesson) => {
    e.preventDefault();
    if (draggedLesson && draggedLesson.id !== targetLesson.id) {
      // Reorder lessons
      const draggedPosition = draggedLesson.position;
      const targetPosition = targetLesson.position;
      
      setLessons(prev => prev.map(lesson => {
        if (lesson.id === draggedLesson.id) {
          return { ...lesson, position: targetPosition };
        }
        if (lesson.id === targetLesson.id) {
          return { ...lesson, position: draggedPosition };
        }
        return lesson;
      }));
    }
    setDraggedLesson(null);
  };

  const getTotalStats = () => {
    return { totalLessons: lessons.length };
  };

  const { totalLessons } = getTotalStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Course Lessons</h1>
                <p className="text-sm text-gray-500">{course.title}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Lesson</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl">
                  {course.image}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
                  <p className="text-gray-600 mt-1">{course.description}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()} students
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {course.rating}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {lessons.length} lessons
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{lessons.length}</div>
                  <div className="text-sm text-gray-500">Total Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{course.students.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{course.totalDuration}</div>
                  <div className="text-sm text-gray-500">Duration</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="position">Position</option>
                  <option value="title">Title</option>
                  <option value="date">Date Created</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-500">
                Showing {filteredLessons.length} lessons
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Lessons</h3>
          </div>
          
          {filteredLessons.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
              <p className="text-gray-500">
                Start by creating your first lesson
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lesson)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, lesson)}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-move"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Position */}
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                        {lesson.position}
                      </div>
                      
                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900 truncate">
                            {lesson.title}
                          </h4>
                        </div>
                        
                        {lesson.textContent && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {lesson.textContent}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-1" />
                            Video
                          </span>
                          {lesson.textContent && (
                            <span className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              Text
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteLesson(lesson)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Lesson</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{lessonToDelete?.title}"? This will permanently remove the lesson and all associated data.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}