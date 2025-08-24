import { useState } from "react";

export default function LessonForm({ initialData, onSave, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.video_url || "");
  const [position, setPosition] = useState(initialData?.position || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      title, 
      content:description, 
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
}