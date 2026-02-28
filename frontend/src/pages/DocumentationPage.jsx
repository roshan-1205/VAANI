import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function DocumentationPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const [activeSection, setActiveSection] = useState('Introduction')

  const sidebarItems = [
    'Introduction',
    'Getting Started',
    'Authentication',
    'Voice API',
    'Endpoints',
    'SDK Integration',
    'Error Codes',
    'Webhooks',
    'Examples',
    'FAQ'
  ]

  const CodeBlock = ({ code, language = 'javascript' }) => (
    <div className="relative bg-[#1e293b] rounded-xl p-6 my-6 overflow-x-auto">
      <button className="absolute top-4 right-4 px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-all duration-300">
        Copy
      </button>
      <pre className="text-sm text-gray-300 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )

  const NoteBox = ({ children }) => (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-blue-800 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2] min-h-screen">
        {/* Header Section */}
        <section className="relative bg-[#E2E2E2] py-24 px-6 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-xs font-semibold rounded-full uppercase tracking-wide shadow-lg">
                  DOCUMENTATION
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#01070f] mb-6 tracking-tight">
                Developer Documentation & API Reference
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Complete technical resources for integrating and using the platform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Top Controls */}
        <section className="py-8 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full max-w-xl">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white shadow-md"
                />
              </div>
              <select className="px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-md text-gray-900 font-semibold">
                <option>v2.0.0</option>
                <option>v1.9.0</option>
                <option>v1.8.0</option>
              </select>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Navigation */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg lg:sticky lg:top-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Contents</h3>
                  <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                      <button
                        key={item}
                        onClick={() => setActiveSection(item)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                          activeSection === item
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Content Area */}
              <motion.div
                ref={contentRef}
                initial={{ opacity: 0, y: 30 }}
                animate={contentVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex-1 bg-white rounded-2xl p-8 md:p-12 shadow-lg"
              >
                <h2 className="text-4xl font-bold text-[#01070f] mb-6">
                  {activeSection}
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Welcome to the Vaani Voice AI Platform documentation. This comprehensive guide will help you integrate our voice-powered services into your applications and understand how to leverage our API for government service accessibility.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    Quick Start
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Get started with the Voice API in just a few steps. First, obtain your API credentials from the developer dashboard.
                  </p>

                  <NoteBox>
                    All API requests must be authenticated using your API key. Keep your credentials secure and never expose them in client-side code.
                  </NoteBox>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    Authentication
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Include your API key in the Authorization header of every request:
                  </p>

                  <CodeBlock code={`curl -X GET "https://api.vaani.gov.in/v2/voice/recognize" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`} />

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    Voice Recognition API
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Send audio data to our voice recognition endpoint to convert speech to text in multiple Indian languages.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 my-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">POST</span>
                      <code className="text-sm text-gray-800 font-mono">/v2/voice/recognize</code>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Converts audio input to text with language detection</p>
                    
                    <h4 className="font-bold text-gray-900 mb-2">Request Body</h4>
                    <CodeBlock code={`{
  "audio": "base64_encoded_audio_data",
  "language": "hi-IN",
  "format": "wav",
  "sampleRate": 16000
}`} />

                    <h4 className="font-bold text-gray-900 mb-2 mt-6">Response</h4>
                    <CodeBlock code={`{
  "status": "success",
  "transcript": "मुझे किसान योजना के बारे में जानकारी चाहिए",
  "confidence": 0.95,
  "language": "hi-IN",
  "duration": 3.2
}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    Error Handling
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The API uses standard HTTP status codes to indicate success or failure:
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 my-6">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">200</span>
                        <span className="text-gray-700">Success - Request completed successfully</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">400</span>
                        <span className="text-gray-700">Bad Request - Invalid parameters</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">401</span>
                        <span className="text-gray-700">Unauthorized - Invalid API key</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">429</span>
                        <span className="text-gray-700">Rate Limit Exceeded - Too many requests</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">500</span>
                        <span className="text-gray-700">Server Error - Internal server error</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    SDK Integration
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Install our official SDK for easier integration:
                  </p>

                  <CodeBlock code={`# Install via npm
npm install @vaani/voice-sdk

# Install via yarn
yarn add @vaani/voice-sdk`} />

                  <p className="text-gray-600 leading-relaxed mb-4 mt-6">
                    Initialize the SDK in your application:
                  </p>

                  <CodeBlock code={`import { VaaniVoiceClient } from '@vaani/voice-sdk';

const client = new VaaniVoiceClient({
  apiKey: 'YOUR_API_KEY',
  language: 'hi-IN'
});

// Recognize speech from audio
const result = await client.recognize(audioBuffer);
console.log(result.transcript);`} />

                  <div className="border-t border-gray-200 my-8"></div>

                  <p className="text-gray-600 leading-relaxed">
                    For more detailed information and advanced use cases, explore the other sections in the sidebar navigation.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section ref={ctaRef} className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-[#E7E1D6] rounded-3xl p-12 md:p-16 text-center shadow-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#01070f] mb-4">
                Need integration help?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our team can assist you with implementation and setup.
              </p>
              <button className="px-10 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Contact Developer Support
              </button>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default DocumentationPage
