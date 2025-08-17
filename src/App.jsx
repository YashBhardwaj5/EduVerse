import './App.css'
import { LandingPage } from './pages/LandingPage'
import { SignInPage } from './pages/SigninPage'
import { SignUpPage } from './pages/SignupPage'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { StudentDashboard } from './pages/StudentDashboard'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
