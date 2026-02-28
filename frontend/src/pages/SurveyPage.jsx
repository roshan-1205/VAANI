import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function SurveyPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    rating: 0,
    easeOfUse: '',
    features: [],
    feedback: '',
    recommend: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2] min-h-screen">
        {/* Header Section */}
        <section ref={heroRef} className="py-24 px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-xs font-semibold rounded-full shadow-lg uppercase tracking-wide">
                  USER FEEDBACK
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-text-#01070f mb-6 tracking-tight">
                Help Us Improve
              </h1>
              <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
                Your feedback helps us build better AI experiences for everyone.
              </p>
            </motion.div>

            {/* Survey Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200"
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  {/* User Type */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label htmlFor="userType" className="block text-sm font-semibold text-gray-900 mb-2">
                      User Type *
                    </label>
                    <select
                      id="userType"
                      name="userType"
                      required
                      value={formData.userType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    >
                      <option value="">Select user type</option>
                      <option value="student">Student</option>
                      <option value="senior">Senior Citizen</option>
                      <option value="government">Government Worker</option>
                      <option value="developer">Developer</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>

                  {/* Experience Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Experience Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className="transition-all duration-200 hover:scale-110"
                        >
                          <svg
                            className={`w-10 h-10 ${formData.rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Ease of Use */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Ease of Use *
                    </label>
                    <div className="space-y-2">
                      {['Very Easy', 'Easy', 'Neutral', 'Difficult', 'Very Difficult'].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="easeOfUse"
                            value={option}
                            checked={formData.easeOfUse === option}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-purple-600 focus:ring-2 focus:ring-purple-600"
                          />
                          <span className="text-gray-700 group-hover:text-gray-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>

                  {/* Features Used */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Features Used
                    </label>
                    <div className="space-y-2">
                      {['Voice Assistant', 'Scheme Alerts', 'Dashboard', 'Notifications', 'Accessibility Tools'].map((feature) => (
                        <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.features.includes(feature)}
                            onChange={() => handleFeatureToggle(feature)}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
                          />
                          <span className="text-gray-700 group-hover:text-gray-900">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>

                  {/* Feedback */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <label htmlFor="feedback" className="block text-sm font-semibold text-gray-900 mb-2">
                      Feedback
                    </label>
                    <textarea
                      id="feedback"
                      name="feedback"
                      rows="4"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
                      placeholder="Share your thoughts..."
                    ></textarea>
                  </motion.div>

                  {/* Would Recommend */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm font-semibold text-gray-900">Would you recommend us?</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="recommend"
                          checked={formData.recommend}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600 transition-all"></div>
                        <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-7"></div>
                      </div>
                    </label>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="pt-4"
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-10 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Feedback'
                      )}
                    </button>
                  </motion.div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Thank you for your feedback!
                  </h2>
                  <p className="text-lg text-gray-600 max-w-md mx-auto">
                    Your response helps us improve accessibility and intelligence.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default SurveyPage
