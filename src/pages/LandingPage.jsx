import { CourseCard } from "../components/CourseCard"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { useSampleCourses } from "../context/SampleCourses"
import { Star,Users } from "lucide-react"
import { useState } from "react"

export const LandingPage = () => {
    
    const courses=useSampleCourses();
    return <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
    {/* Header Section */}
        <Header/>
    {/* Hero Section */}
        <Hero/>
    {/* Courses Section */}
      <div className="bg-white/95 backdrop-blur-xl mx-4 md:mx-8 rounded-3xl shadow-2xl mb-8">
        <section id="courses-section" className="px-6 py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our most popular courses designed to accelerate your professional growth
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {courses.map((course) => (
              <CourseCard course={course} key={course.id}/>
            ))}
          </div>
        </section>
      </div>
    </div>
}
