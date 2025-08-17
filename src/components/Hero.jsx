import { Play } from "lucide-react"
export const Hero=()=>{
    return <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block animate-pulse">
                Career Today
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto">
              Join thousands of learners mastering new skills with our premium courses taught by industry experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('courses-section').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
              >
                Start Learning Now
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-indigo-900 transition-all">
                <Play className="inline-block w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
}