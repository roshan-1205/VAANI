import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function FAQPage() {

  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How do I use the voice assistant?",
      answer: "Simply click on the microphone icon and speak naturally in your preferred language. The AI assistant will understand your query and provide relevant information about government services, schemes, and more. You can ask questions, request information, or navigate through services using voice commands."
    },
    {
      question: "Is the platform free?",
      answer: "Yes, the platform is completely free for all citizens. It is a government initiative to make public services accessible to everyone, regardless of their economic background. There are no hidden charges or subscription fees."
    },
    {
      question: "Which languages are supported?",
      answer: "We support 22+ Indian languages including Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and many more. The platform automatically detects your language and provides responses accordingly. You can also switch between languages at any time."
    },
    {
      question: "How do I check government scheme eligibility?",
      answer: "You can check your eligibility for government schemes by using the voice assistant or navigating to the Schemes section. Provide basic information like your age, income, location, and occupation. The system will match you with relevant schemes and guide you through the application process."
    },
    {
      question: "Can I access services without internet?",
      answer: "While most features require an internet connection, we offer an offline mode with limited functionality. You can access previously downloaded information and use basic voice commands. For full functionality including real-time updates and scheme applications, an internet connection is required."
    },
    {
      question: "How secure is my data?",
      answer: "We take data security very seriously. All your personal information is encrypted using industry-standard protocols. We follow government data protection guidelines and never share your information with third parties without your explicit consent. Your voice recordings are processed securely and deleted after processing."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team 24/7 through multiple channels: use the Contact Support button on any page, call our toll-free helpline, send an email, or use the in-app chat feature. Our multilingual support team is always ready to assist you with any questions or issues."
    },
    {
      question: "Can elderly users use this platform easily?",
      answer: "Absolutely! The platform is specifically designed with accessibility in mind. Elderly users can use voice commands instead of typing, the interface has large text and clear buttons, and we provide step-by-step audio guidance. We also offer tutorial videos and dedicated support for senior citizens."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const FAQItem = ({ faq, index }) => {
    const isOpen = openIndex === index

    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <button
          onClick={() => toggleFAQ(index)}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-300"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 pr-4">
            {faq.question}
          </h3>
          <div
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            className="flex-shrink-0"
          >
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        {isOpen && (
          <div className="overflow-hidden">
            <div className="px-6 pb-6">
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2] min-h-screen">
        {/* Header Section */}
        <section className="relative bg-[#E2E2E2] py-24 px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-xs font-semibold rounded-full uppercase tracking-wide shadow-lg">
                  FAQS
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#01070f] mb-6 tracking-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-xl mx-auto leading-relaxed">
                Find quick answers to common questions about using the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-12 px-6 sm:px-10 lg:px-16 bg-[#E2E2E2]">
          <div className="max-w-5xl mx-auto">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search questions…"
                className="w-full pl-14 pr-6 py-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 shadow-lg bg-white"
              />
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#E2E2E2]">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Help Banner Section */}
        <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#E2E2E2]">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-[#E7E1D6] to-[#F5F5F5] rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[#E7E1D6] animate-pulse"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-[#01070f] mb-4">
                  Still have questions?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Our support team is available 24/7 to assist you.
                </p>
                <button className="px-10 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Contact Support
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

export default FAQPage
