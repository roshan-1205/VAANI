import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function SupportPage() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  })

  const supportOptions = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Live Chat Support",
      description: "Get instant help from our support team through live chat",
      action: "Start Chat"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Help Articles",
      description: "Browse our comprehensive knowledge base and guides",
      action: "View Articles"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      action: "Join Forum"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
      title: "Submit Ticket",
      description: "Create a support ticket for detailed assistance",
      action: "Create Ticket"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Support",
      description: "Speak directly with our support team by phone",
      action: "Call Now"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      action: "Send Email"
    }
  ]

  const systemStatus = [
    { name: "Voice AI", status: "operational" },
    { name: "Dashboard", status: "operational" },
    { name: "API", status: "operational" },
    { name: "Notifications", status: "operational" }
  ]

  const SupportCard = ({ option, index }) => (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-200 p-8 group cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
        {option.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
        {option.title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        {option.description}
      </p>
      <button className="px-6 py-3 bg-[#01070f] text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
        {option.action}
      </button>
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
                  SUPPORT CENTER
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#01070f] mb-6 tracking-tight">
                Get Help & Support
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-xl mx-auto leading-relaxed">
                Our team and community are here to assist you anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Help Options Grid */}
        <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#E2E2E2]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {supportOptions.map((option, index) => (
                <SupportCard key={index} option={option} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#E2E2E2]">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#01070f] mb-6 text-center">
                Send Us a Message
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Issue Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Help</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                    placeholder="Describe your issue or question..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-10 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                  >
                    Submit Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Status Banner */}
        <section className="py-12 px-6 sm:px-10 lg:px-16 bg-[#E2E2E2]">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-bold text-gray-900">All systems operational</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {systemStatus.map((system, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${system.status === 'operational' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm text-gray-600">{system.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default SupportPage
