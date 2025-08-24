import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { SignInPage } from "./pages/SigninPage";
import { SignUpPage } from "./pages/SignupPage";
import { MyCourses } from "./pages/MyCourses";
import { ProfilePage } from "./pages/ProfilePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { StudentDashboard } from "./pages/StudentDashboard";
import { InstructorDashboard } from "./pages/InstructorDashboard";
import { CreateContentDashboard } from "./pages/CreateContentDashboard";
import { AuthProvider } from "./context/AuthContext";
import { MainLayout } from "./layouts/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LessonsPage } from "./pages/LessonsPage";
import { StudentCourses } from "./pages/StudentCourses"; // ✅ import
import { StudentLessonsPage } from "./pages/StudentLessonsPage";

function App() {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate("/instructordashboard");
  };

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected routes with layout */}
        <Route element={<MainLayout />}>
          <Route
            path="/instructor/courses/:courseId/lessons"
            element={<LessonsPage />}
          />
          <Route path="/student/lessons/:id" element={<StudentLessonsPage />} />
          <Route
            path="/studentdashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/studentcourses" // ✅ added
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentCourses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructordashboard"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mycourses"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <MyCourses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/createcontent"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <CreateContentDashboard onCancel={onCancel} />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
