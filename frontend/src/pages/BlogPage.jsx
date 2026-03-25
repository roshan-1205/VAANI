import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function BlogPage() {
  const featuredPost = {
    title: "How Voice AI is Transforming Government Services in Rural India",
    description: "Discover how voice-powered technology is breaking down barriers and making government services accessible to millions of citizens in remote areas",
    image: "https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446375/service1_qwl926.jpg",
    category: "Featured",
    author: "Dr. Priya Sharma",
    date: "March 15, 2024"
  }

  const blogPosts = [
    {
      title: "How Voice AI Helps Rural Citizens",
      excerpt: "Exploring the impact of voice technology in bridging the digital divide for rural communities",
      image: "https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446369/resource1_ekojqh.jpg",
      category: "Technology",
      author: "Rajesh Kumar",
      date: "March 10, 2024"
    },
    {
      title: "Future of Government AI Assistants",
      excerpt: "What's next for AI-powered government services and citizen engagement platforms",
      image: "https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446370/resource3_lue7si.jpg",
      category: "Innovation",
      author: "Ananya Patel",
      date: "March 8, 2024"
    },
    {
      title: "Accessibility in Digital India",
      excerpt: "Building inclusive digital infrastructure that serves every citizen regardless of ability",
      image: "https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446369/resource4_s1whhw.jpg",
      category: "Accessibility",
      author: "Vikram Singh",
      date: "March 5, 2024"
    },
    {
      title: "NLP in Regional Languages",
      excerpt: "The challenges and breakthroughs in natural language processing for Indian languages",
      image: "https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446370/resource2_d0eeoa.jpg",
      category: "AI & ML",
      author: "Dr. Meera Reddy",
      date: "March 2, 2024"
    },
    {
      title: "Voice Interfaces vs Traditional Apps",
      excerpt: "Comparing user experience and accessibility between voice and traditional interfaces",
      image:"https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446372/resource5_dhuzcn.jpg",
      category: "UX Design",
      author: "Arjun Mehta",
      date: "February 28, 2024"
    },
    {
      title: "AI for Social Impact",
      excerpt: "How artificial intelligence is being leveraged to solve real-world social challenges",
      image: "https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446376/resource6_vdxdzk.jpg",
      category: "Social Impact",
      author: "Dr. Priya Sharma",
      date: "February 25, 2024"
    }
  ]

  const BlogCard = ({ post }) => (
    <article className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-200 overflow-hidden group cursor-pointer">
      {post.image.startsWith('bg-') ? (
        <div className={`${post.image} h-48 w-full object`}></div>
      ) : (
        <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
      )}
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-semibold rounded-full mb-4">
          {post.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
          {post.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
        <div className="mt-4">
          <span className="text-purple-600 font-semibold group-hover:text-blue-600 transition-colors duration-300">
            Read more →
          </span>
        </div>
      </div>
    </article>
  )

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2]">
        {/* Header Section */}
        <section className="relative bg-[#E2E2E2] py-24 px-6 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-sm font-semibold rounded-full shadow-lg">
                  BLOG
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-#01070f mb-6 tracking-tight">
                Insights, Updates & Knowledge
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Stay informed with the latest articles, updates, and insights about voice AI, accessibility, and digital transformation
              </p>
            </div>
          </div>
        </section>

        {/* Featured Blog Post Section */}
        <section className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <article className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 overflow-hidden group">
              <div className="flex flex-col lg:flex-row">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full lg:w-1/2 h-64 lg:h-auto object-cover" />
                <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
                  <span className="inline-block px-4 py-2 bg-[#01070f] text-white text-sm font-semibold rounded-full mb-6 w-fit">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4  transition-all duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span>{featuredPost.author}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <Link to="/article/voice-ai-rural-india" className="px-8 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-fit inline-block text-center">
                    Read Article
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Blog Grid Section */}
        <section className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Latest Articles
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our collection of articles on technology, accessibility, and innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post, index) => (
                <BlogCard key={index} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#E7E1D6]   rounded-3xl p-12 shadow-2xl text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get Updates Directly in Your Inbox
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
                Subscribe to our newsletter and never miss an update on new articles, features, and insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900"
                />
                <button className="px-8 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
                  Subscribe
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

export default BlogPage
