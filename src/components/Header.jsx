import {BookOpen,LogOut,} from 'lucide-react';
import { Button } from './Buttons';
import { useState } from 'react';
import { Link,useNavigate } from "react-router-dom"
export const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-white/20 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            // onClick={() => setCurrentView('landing')}
          >
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <Link to="/" className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EduVerse
            </Link>
          </div>

          {/* Auth buttons */}
          {!user ? (
            <div className="flex space-x-4">
              <Link to="/signin">
              <Button variant="signin">
                Sign In
              </Button>
              </Link>
              <Link to="/signup"><Button variant="signup">
                Sign Up
              </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Hi, {user.name}</span>
              <Button variant="logout">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
