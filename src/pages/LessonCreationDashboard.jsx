import { 
  Save, X, Video, FileText, Hash, ArrowLeft, Eye, Plus, Trash2, Move, Upload
} from "lucide-react";
import { useState } from "react";

// LessonForm component (inline for compatibility)
const LessonForm = ({ initialData, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.video_url || "");
  const [position, setPosition] = useState(initialData?.position || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      title, 
      description, 
      video_url: videoUrl,
      position: parseInt(position) || 0
    });
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {initialData ? "Edit Lesson" : "Create New Lesson"}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lesson Title
          </label>
          <input
            type="text"
            placeholder="Enter lesson title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter lesson description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/video"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="number"
            placeholder="1"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            min="1"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
        <button 
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
        >
          {initialData ? "Update Lesson" : "Create Lesson"}
        </button>
        <button 
          onClick={onCancel} 
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export const LessonCreationDashboard = () => {
  const [lesson, setLesson] = useState({
    title: "",
    videoUrl: "",
    textContent: "",
    position: 1
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveLesson = async (lessonData) => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Saving lesson:", lessonData);
    setIsSaving(false);
    
    // Update the lesson state with form data
    setLesson({
      title: lessonData.title,
      videoUrl: lessonData.video_url,
      textContent: lessonData.description, // Map description to textContent
      position: lessonData.position
    });
    
    alert("Lesson created successfully!");
  };

  const handleReset = () => {
    setLesson({
      title: "",
      videoUrl: "",
      textContent: "",
      position: 1
    });
    setIsPreviewMode(false);
  };

  const handleCancel = () => {
    // Just reset the form for now
    handleReset();
  };

  // Convert lesson state to form format
  const lessonFormData = {
    title: lesson.title,
    description: lesson.textContent,
    video_url: lesson.videoUrl,
    position: lesson.position
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Create New Lesson</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isPreviewMode ? "Edit" : "Preview"}
                </span>
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isPreviewMode ? (
          /* Creation Form */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <LessonForm
                initialData={lessonFormData}
                onSave={handleSaveLesson}
                onCancel={handleCancel}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Tips */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Keep lesson titles clear and descriptive</li>
                    <li>• Test video URLs before saving</li>
                    <li>• Use text content for additional context</li>
                    <li>• Position determines lesson order</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Position {lesson.position}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {lesson.title || "Untitled Lesson"}
                  </h1>
                </div>

                {lesson.videoUrl && (
                  <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Video Preview</p>
                      <p className="text-sm text-gray-500 mt-1">{lesson.videoUrl}</p>
                    </div>
                  </div>
                )}

                {lesson.textContent && (
                  <div className="prose max-w-none">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Text Content:</h4>
                      <div className="text-gray-600 whitespace-pre-wrap">
                        {lesson.textContent}
                      </div>
                    </div>
                  </div>
                )}

                {!lesson.title && !lesson.videoUrl && !lesson.textContent && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>No content to preview yet</p>
                    <p className="text-sm">Fill out the form to see a preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};