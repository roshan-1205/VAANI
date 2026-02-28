import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ArticlePage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()
  const { ref: relatedRef, isVisible: relatedVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const relatedArticles = [
    {
      title: "How Voice AI Helps Rural Citizens",
      image: "/src/assets/Images/resource1.jpeg",
      category: "Technology",
      date: "March 10, 2024"
    },
    {
      title: "Future of Government AI Assistants",
      image: "/src/assets/Images/resource3.jpeg",
      category: "Innovation",
      date: "March 8, 2024"
    },
    {
      title: "Accessibility in Digital India",
      image: "/src/assets/Images/resource4.jpeg",
      category: "Accessibility",
      date: "March 5, 2024"
    }
  ]

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2] min-h-screen">
        <article className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-24">
          {/* Header Section */}
          <motion.header
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-xs font-semibold rounded-full uppercase tracking-wide mb-6">
              Featured Article
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#01070f] mb-6 leading-tight">
              How Voice AI is Transforming Government Services in Rural India
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Discover how voice-powered technology is breaking down barriers and making government services accessible to millions of citizens in remote areas
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C19A6B] to-[#A67C52] "></div>
                <span className="font-semibold text-gray-700">Dr. Priya Sharma</span>
              </div>
              <span>•</span>
              <span>March 15, 2024</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={headerVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <img 
              src="/src/assets/Images/service1.jpeg" 
              alt="Voice AI in Rural India" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Article Content */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={contentVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8 text-gray-700 leading-relaxed">
              <h2 className="text-3xl md:text-4xl font-bold text-[#01070f] mt-12 mb-6">
                Breaking Down Digital Barriers
              </h2>
              
              <p className="text-lg leading-relaxed">
                In the heart of rural India, where literacy rates remain a challenge and smartphone penetration is limited, voice AI technology is emerging as a revolutionary force. Government services that once required multiple visits to district offices, lengthy paperwork, and urban connectivity are now accessible through simple voice commands in local languages.
              </p>

              <p className="text-lg leading-relaxed">
                The transformation is profound. Farmers in remote villages can now check subsidy status, apply for government schemes, and access agricultural information without needing to read complex forms or navigate digital interfaces. All they need is a basic phone and their voice.
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-l-4 border-purple-600 p-6 rounded-r-2xl my-8">
                <p className="text-lg font-semibold text-purple-900 mb-2">Key Insight</p>
                <p className="text-gray-700 leading-relaxed">
                  Voice AI has reduced the average time to access government services from 3-4 days to under 10 minutes, with a 78% increase in rural citizen engagement across pilot programs.
                </p>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#01070f] mt-12 mb-6">
                The Technology Behind the Transformation
              </h2>

              <p className="text-lg leading-relaxed">
                The success of voice AI in rural India hinges on three critical technological advancements:
              </p>

              <ul className="space-y-4 my-6 ml-6">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-lg"><strong className="font-semibold text-gray-900">Multilingual NLP:</strong> Advanced natural language processing that understands 22+ Indian languages and regional dialects with high accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-lg"><strong className="font-semibold text-gray-900">Low-bandwidth optimization:</strong> Voice systems designed to work on 2G networks, ensuring accessibility even in areas with poor connectivity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-lg"><strong className="font-semibold text-gray-900">Context-aware responses:</strong> AI that understands local context, cultural nuances, and government scheme specifics</span>
                </li>
              </ul>

              <blockquote className="border-l-4 border-gray-300 pl-6 py-4 my-8 italic text-xl text-gray-600">
                "Voice AI isn't just about technology—it's about dignity. It's about ensuring every citizen, regardless of literacy or location, can access their rights and services with ease."
              </blockquote>

              <h2 className="text-3xl md:text-4xl font-bold text-[#01070f] mt-12 mb-6">
                Real-World Impact Stories
              </h2>

              <p className="text-lg leading-relaxed">
                In Maharashtra's Vidarbha region, a 65-year-old farmer named Ramesh successfully applied for crop insurance using voice AI after struggling for months with paper forms. In Rajasthan, women's self-help groups are using voice interfaces to access microfinance information and government schemes in their native Marwari dialect.
              </p>

              <p className="text-lg leading-relaxed">
                These aren't isolated success stories. Across 15 states, over 2 million citizens have used voice AI platforms to access government services, with satisfaction rates exceeding 85%. The technology is particularly transformative for elderly citizens and those with visual impairments, who previously faced significant barriers to digital services.
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-[#01070f] mt-12 mb-6">
                The Road Ahead
              </h2>

              <p className="text-lg leading-relaxed">
                As voice AI technology continues to evolve, the potential applications expand exponentially. Future developments include integration with healthcare services, educational resources, and emergency response systems. The goal is clear: create a truly inclusive digital India where technology serves every citizen, not just the digitally literate urban population.
              </p>

              <p className="text-lg leading-relaxed">
                The transformation of government services through voice AI represents more than technological progress—it's a fundamental shift toward inclusive governance and digital equity. As we move forward, the focus must remain on accessibility, cultural sensitivity, and ensuring that innovation reaches those who need it most.
              </p>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={statsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 p-8 bg-white rounded-2xl shadow-lg"
          >
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">2M+</div>
              <div className="text-gray-600">Citizens Served</div>
            </div>
            <div className="text-center p-6 border-x border-gray-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">22+</div>
              <div className="text-gray-600">Languages Supported</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </motion.div>

          {/* Tags Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-16 mb-16"
          >
            {['Voice AI', 'Digital India', 'Government Services', 'Rural Technology', 'Accessibility', 'NLP'].map((tag, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Author Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-16 border border-gray-200"
          >
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C19A6B] to-[#A67C52]  flex-shrink-0"></div>
              <div>
                <h3 className="text-2xl font-bold text-[#01070f] mb-2">Dr. Priya Sharma</h3>
                <p className="text-sm text-purple-600 font-semibold mb-3">AI Research Lead & Digital Inclusion Advocate</p>
                <p className="text-gray-600 leading-relaxed">
                  Dr. Sharma is a leading researcher in voice AI and natural language processing with over 15 years of experience. She specializes in developing accessible technology solutions for underserved communities and has published extensively on digital inclusion in emerging markets.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-between py-6 border-y border-gray-300 mb-16"
          >
            <span className="text-gray-700 font-semibold">Share this article:</span>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Related Articles */}
          <motion.div
            ref={relatedRef}
            initial={{ opacity: 0, y: 30 }}
            animate={relatedVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-[#01070f] mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={relatedVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer"
                >
                  <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-semibold rounded-full mb-3">
                      {article.category}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-500">{article.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#E7E1D6] to-[#F5F5F5] rounded-3xl p-12 text-center shadow-lg"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#01070f] mb-4">
              Experience Voice AI in Action
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Try our live voice demo and see how natural language processing can transform digital interactions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="px-10 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block">
                Try Voice Demo
              </Link>
              <Link to="/blog" className="px-10 py-4 bg-white text-[#01070f] font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-[#01070f] inline-block">
                Read More Articles
              </Link>
            </div>
          </motion.div>
        </article>
      </div>
      <Footer />
    </>
  )
}

export default ArticlePage
