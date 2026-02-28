import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function OverviewPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
  const { ref: whatRef, isVisible: whatVisible } = useScrollAnimation()
  const { ref: whoRef, isVisible: whoVisible } = useScrollAnimation()
  const { ref: whyRef, isVisible: whyVisible } = useScrollAnimation()

  const whoItHelps = [
    {
      title: "Citizens",
      description: "Access government services through simple voice commands in your native language",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Volunteers",
      description: "Help bridge the digital divide by assisting citizens with voice-based services",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Administrators",
      description: "Manage content, monitor usage, and ensure seamless service delivery",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ]

  const whyDifferent = [
    {
      title: "Voice-First Design",
      description: "Natural conversation interface eliminates the need for digital literacy"
    },
    {
      title: "Multilingual Support",
      description: "Supports 20+ regional languages and dialects for true accessibility"
    },
    {
      title: "Toll-Free Access",
      description: "Completely free for all users, accessible from any phone"
    },
    {
      title: "Privacy Protected",
      description: "Government-grade security ensures your data stays safe"
    },
    {
      title: "24/7 Availability",
      description: "Access services anytime, anywhere without waiting"
    },
    {
      title: "Offline Capable",
      description: "Works reliably even with low connectivity"
    }
  ]

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2]">
        {/* Hero Header Section */}
        <section ref={heroRef} className="relative bg-[#E2E2E2] py-24 px-6 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-sm font-semibold rounded-full shadow-lg">
                  PLATFORM OVERVIEW
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-#01070f mb-6 tracking-tight">
                Understanding How Our Platform Works
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                A comprehensive voice-powered solution designed to make government services accessible to everyone, regardless of literacy or technical expertise
              </p>
            </motion.div>
          </div>
        </section>

        {/* What the Platform Does */}
        <section ref={whatRef} className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={whatVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  What the Platform Does
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our platform transforms how citizens interact with government services by leveraging advanced voice AI technology. Simply call our toll-free number and speak naturally in your preferred language.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The system understands your request, processes it in real-time, and provides accurate information or completes your service request - all through natural conversation.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    No apps to download, no forms to fill, no technical knowledge required. Just your voice and our intelligent system working together.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#E7E1D6] rounded-3xl p-12 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Call Toll-Free</p>
                        <p className="text-sm text-gray-600">Dial our number</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Speak Naturally</p>
                        <p className="text-sm text-gray-600">In your language</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Get Results</p>
                        <p className="text-sm text-gray-600">Instant response</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who It Helps */}
        <section ref={whoRef} className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={whoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Who It Helps
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Designed for everyone in the ecosystem
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whoItHelps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whoVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It's Different */}
        <section ref={whyRef} className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={whyVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why It's Different
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built with accessibility and inclusivity at its core
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyDifferent.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whyVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-full mt-2"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default OverviewPage
