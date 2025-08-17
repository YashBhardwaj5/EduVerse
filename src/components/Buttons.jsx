const variants = {
  primary: "px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors",
  secondary: "px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:-translate-y-1 hover:shadow-2xl",
  signin: "px-6 py-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors",
  signup: "px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 hover:shadow-xl",
  demo: "px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-indigo-900 transition-all",
  logout: "px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
};

export const Button = ({ className = "", onClick, children, variant }) => {
  return (
    <button
      onClick={onClick}
      className={`${variants[variant] || ""} ${className}`}
    >
      {children}
    </button>
  );
};
