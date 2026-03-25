import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ResourcesPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
  const { ref: categoriesRef, isVisible: categoriesVisible } = useScrollAnimation()
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation()
  const { ref: helpRef, isVisible: helpVisible } = useScrollAnimation()

  const categories = [
    {
      title: "User Guides",
      description: "Step-by-step instructions for using the platform effectively",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Tutorials",
      description: "Video and interactive tutorials for quick learning",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Documentation",
      description: "Complete technical documentation and API references",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "FAQs",
      description: "Answers to frequently asked questions",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Government Schemes Info",
      description: "Information about available government schemes and benefits",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "Support Center",
      description: "Get help from our support team and community",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: "from-teal-500 to-green-500"
    }
  ]

  const featuredResources = [
    {
      title: "Getting Started with Voice Services",
      description: "Learn how to access government services using voice commands in your preferred language",
      thumbnail: "https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446368/r1_xi66d0.jpg"
    },
    {
      title: "Understanding Your Rights",
      description: "Comprehensive guide to citizen rights and how to exercise them through our platform",
      thumbnail: "https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446369/r2_sqzjrs.jpg"
    },
    {
      title: "Scheme Application Process",
      description: "Step-by-step guide to applying for government schemes and tracking your applications",
      thumbnail: "https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446370/r3_ynwvhn.jpg"
    }
  ]

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2]">
        {/* Header Section */}
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
                  RESOURCES
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-#01070f mb-6 tracking-tight">
                Helpful Resources & Guides
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Everything you need to make the most of our platform - guides, tutorials, documentation, and support materials
              </p>
            </motion.div>
          </div>
        </section>

        {/* Resource Categories Grid */}
        <section ref={categoriesRef} className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={categoriesVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Browse by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find the resources you need organized by topic
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => {
                const getLink = () => {
                  if (category.title === "User Guides") return "/guides"
                  if (category.title === "Tutorials") return "/tutorials"
                  if (category.title === "Documentation") return "/documentation"
                  if (category.title === "FAQs") return "/faq"
                  if (category.title === "Government Schemes Info") return "/schemes"
                  if (category.title === "Support Center") return "/support"
                  return null
                }
                
                const link = getLink()
                
                return link ? (
                  <Link key={index} to={link}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={categoriesVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-200 cursor-pointer group"
                    >
                      <div className={`w-20 h-20 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <div className="text-white">
                          {category.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {category.description}
                      </p>
                    </motion.div>
                  </Link>
                ) : (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={categoriesVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-200 cursor-pointer group"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {category.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section ref={featuredRef} className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuredVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Featured Resources
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Popular guides and tutorials to get you started
              </p>
            </motion.div>

            <div className="space-y-8">
              {featuredResources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuredVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row">
                    <img src={resource.thumbnail} alt={resource.title} className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 object-cover" />
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                          {resource.description}
                        </p>
                      </div>
                      <div>
                        <button className="px-6 py-3 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Help Section */}
        <section ref={helpRef} className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={helpVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-[#E7E1D6] rounded-3xl p-12 shadow-2xl text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Need More Help?
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
                Our support team is here to assist you. Get personalized help and answers to your specific questions.
              </p>
              <button className="px-8 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Contact Support
              </button>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default ResourcesPage
