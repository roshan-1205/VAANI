import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function About() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-b from-white to-gray-50 py-28 px-6 sm:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            Empowering Access Through Voice
          </h2>
          <p className="text-xl text-[#64748b] max-w-3xl mx-auto leading-relaxed">
            We're building the future of accessible government services through AI-powered voice technology
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-[#0F172A] mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-[#64748b] leading-relaxed">
                To make government services accessible to everyone, regardless of literacy level or technical expertise, through natural voice interactions in their native language.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#0F172A] mb-4">
                Why Voice?
              </h3>
              <p className="text-lg text-[#64748b] leading-relaxed mb-4">
                Voice is the most natural form of communication. Our platform breaks down barriers by allowing citizens to access services simply by speaking.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#6366F1] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#64748b]">No need for smartphones or internet connectivity</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#6366F1] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#64748b]">Works in 20+ regional languages and dialects</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#6366F1] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#64748b]">Accessible to elderly and differently-abled citizens</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#6366F1] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#64748b]">Completely free and toll-free for all users</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Side - Stats/Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[140px]">
                <div className="text-4xl sm:text-5xl font-bold mb-2">20+</div>
                <div className="text-base sm:text-lg opacity-90">Languages Supported</div>
              </div>
              <div className="bg-gradient-to-br from-[#F5DEB3] to-[#DEB887] rounded-2xl p-6 sm:p-8 text-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[140px]">
                <div className="text-4xl sm:text-5xl font-bold mb-2">24/7</div>
                <div className="text-base sm:text-lg opacity-90">Availability</div>
              </div>
              <div className="bg-gradient-to-br from-[#E8D5B7] to-[#D4A574] rounded-2xl p-6 sm:p-8 text-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[140px]">
                <div className="text-4xl sm:text-5xl font-bold mb-2">100%</div>
                <div className="text-base sm:text-lg opacity-90">Free Access</div>
              </div>
              <div className="bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[140px]">
                <div className="text-4xl sm:text-5xl font-bold mb-2">99.9%</div>
                <div className="text-base sm:text-lg opacity-90">Uptime</div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-[#FFFDD0] rounded-2xl p-8 border border-[#E8D5B7] shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-bold text-[#0F172A] mb-3">
                Built for Everyone
              </h4>
              <p className="text-[#64748b] leading-relaxed">
                Our platform is designed with inclusivity at its core, ensuring that every citizen can access government services with dignity and ease, regardless of their background or abilities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default About
