// components/LessonCard.jsx
import { Pencil, Trash2, Video } from "lucide-react";

export const LessonCard = ({ title, description, videoUrl, onEdit, onDelete }) => {
  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to check if URL is a YouTube URL
  const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  // Function to check if URL is a Vimeo URL
  const isVimeoUrl = (url) => {
    return url && url.includes('vimeo.com');
  };

  // Function to get Vimeo video ID
  const getVimeoVideoId = (url) => {
    if (!url) return null;
    
    const regExp = /vimeo.com\/(\d+)/;
    const match = url.match(regExp);
    
    return match ? match[1] : null;
  };

  // Function to render the appropriate video embed
  const renderVideoEmbed = () => {
    if (!videoUrl) {
      return (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <Video className="h-12 w-12 text-gray-400" />
        </div>
      );
    }

    if (isYouTubeUrl(videoUrl)) {
      const videoId = getYouTubeVideoId(videoUrl);
      if (videoId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full h-40"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        );
      }
    }

    if (isVimeoUrl(videoUrl)) {
      const videoId = getVimeoVideoId(videoUrl);
      if (videoId) {
        return (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}`}
            className="w-full h-40"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        );
      }
    }

    // Fallback for direct video URLs
    return (
      <video
        src={videoUrl}
        className="w-full h-40 object-cover"
        controls={false}
        poster=""
      />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Video Embed */}
      <div className="relative">
        {renderVideoEmbed()}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-44">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{description}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            onClick={onEdit}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
            title="Edit"
          >
            <Pencil size={18} className="text-blue-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
            title="Delete"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;