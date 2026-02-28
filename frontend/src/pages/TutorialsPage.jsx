import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function TutorialsPage() {

  const [filter, setFilter] = useState('All')

  const tutorials = [
    {
      title: "Getting Started Walkthrough",
      description: "Complete introduction to the platform and its core features",
      duration: "8 min",
      difficulty: "Beginner",
      thumbnail: "/src/assets/Images/resource1.jpeg"
    },
    {
      title: "Voice Commands Demo",
      description: "Learn how to use voice commands effectively in multiple languages",
      duration: "12 min",
      difficulty: "Beginner",
      thumbnail: "/src/assets/Images/resource2.jpeg"
    },
    {
      title: "Dashboard Navigation Guide",
      description: "Master the dashboard interface and find information quickly",
      duration: "10 min",
      difficulty: "Beginner",
      thumbnail: "/src/assets/Images/resource3.jpeg"
    },
    {
      title: "Accessibility Features Tutorial",
      description: "Discover tools designed for users with special accessibility needs",
      duration: "15 min",
      difficulty: "Intermediate",
      thumbnail: "/src/assets/Images/resource4.jpeg"
    },
    {
      title: "Using AI Assistant",
      description: "Advanced techniques for getting the most out of AI interactions",
      duration: "18 min",
      difficulty: "Intermediate",
      thumbnail: "/src/assets/Images/resource5.jpeg"
    },
    {
      title: "Scheme Alerts Setup",
      description: "Configure notifications for government schemes and benefits",
      duration: "14 min",
      difficulty: "Advanced",
      thumbnail: "/src/assets/Images/resource6.jpeg"
    }
  ]

  const filteredTutorials = filter === 'All' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.difficulty === filter)

  const TutorialCard = ({ tutorial, index }) => (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group cursor-pointer">
      <div className="relative">
        <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
            tutorial.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            {tutorial.difficulty}
          </span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {tutorial.duration}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
          {tutorial.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {tutorial.description}
        </p>
        <span className="text-purple-600 font-semibold group-hover:text-blue-600 transition-colors duration-300 inline-flex items-center gap-2">
          Watch Tutorial
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  )

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2] min-h-screen">
        {/* Header Section */}
        <section className="relative bg-[#E2E2E2] py-24 px-6 sm:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-xs font-semibold rounded-full uppercase tracking-wide shadow-lg">
                  TUTORIALS
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#01070f] mb-6 tracking-tight">
                Video & Interactive Tutorials
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-xl mx-auto leading-relaxed">
                Learn quickly through guided videos and hands-on walkthroughs designed for all users.
              </p>
            </div>
          </div>
        </section>

        {/* Search + Filter Bar */}
        <section className="py-12 px-6 sm:px-10 lg:px-16 bg-[#E2E2E2]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search tutorials…"
                  className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 shadow-lg bg-white"
                />
              </div>
              <div className="flex gap-2">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilter(level)}
                    className={`px-6 py-4 rounded-full font-semibold transition-all duration-300 ${
                      filter === level
                        ? 'bg-[#01070f] text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tutorials Grid */}
        <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#E2E2E2]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTutorials.map((tutorial, index) => (
                <TutorialCard key={index} tutorial={tutorial} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#E2E2E2]">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#E7E1D6] to-[#F5F5F5] rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[#E7E1D6] animate-pulse"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-[#01070f] mb-4">
                  Prefer guided learning?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Let our AI assistant teach you step-by-step.
                </p>
                <button className="px-10 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Interactive Tutorial
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default TutorialsPage
