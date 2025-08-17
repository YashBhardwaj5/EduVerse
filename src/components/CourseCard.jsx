import { Star ,Users} from "lucide-react";
import { Link } from "react-router-dom";
export const CourseCard=(props)=>{
    const {course}=props;
    return <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer group overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-6xl">
                  {course.image}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">by {course.instructor}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{course.students.toLocaleString()} students</span>
                    </div>
                    <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
                    <Link to="/signin">
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                      Enroll Now
                    </button></Link>
                  </div>
                </div>
              </div>
}