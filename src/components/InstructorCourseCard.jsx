// InstructorCourseCard.jsx
import { ArrowRight, Pencil, Trash2 } from "lucide-react";

export const InstructorCourseCard = ({
  title,
  description,
  image,
  price,
  onDelete,
  onEdit,
  onArrowClick,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-48">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          {/* Price */}
          <span className="text-blue-600 font-semibold">
            ₹{price}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-2">
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
            <button
              onClick={onArrowClick}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              title="Go to lessons"
            >
              <ArrowRight size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
