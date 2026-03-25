import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const VideoCard = ({ video, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={() => onClick(video)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Video Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-black">
          <video 
            src={video.videoSrc}
            className="w-full h-full object-cover pointer-events-none"
            preload="metadata"
          />
          
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Play Button */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/30">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-[#6366F1] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-xl font-bold text-white mb-1">{video.name}</h3>
          <p className="text-sm text-gray-300">{video.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

const VideoModal = ({ video, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Player */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <video
            src={video.videoSrc}
            controls
            autoPlay
            className="w-full aspect-video bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Info */}
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{video.name}</h3>
          <p className="text-lg text-gray-300">{video.role}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const videos = [
    {
      id: 1,
      name: "Aayush Pandey",
      role: "Student, Madhya Pradesh",
      videoSrc: "https://res.cloudinary.com/dvbqsllqw/video/upload/v1774447483/InShot_20260228_153441541_mgluyg.mp4"
    },
    {
      id: 2,
      name: "Roshan Kumar Singh",
      role: "Student, Bihar",
      videoSrc: "https://res.cloudinary.com/dvbqsllqw/video/upload/v1774447452/InShot_20260228_155026980_fpnv2l.mp4"
    },
    {
      id: 3,
      name: "Shiva Kewat",
      role: "Student, Anuppur",
      videoSrc: "https://res.cloudinary.com/dvbqsllqw/video/upload/v1774447422/InShot_20260228_160114169_gyf06l.mp4"
    }
  ]

  return (
    <section className="relative py-28 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#C19A6B] to-[#A67C52] text-white text-sm font-semibold tracking-wide uppercase shadow-lg">
              USER STORIES
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0F172A] mb-6 tracking-tight">
            Real Voices. Real Impact.
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch how people are using our platform to access services effortlessly.
          </p>
        </motion.div>

        {/* Video Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VideoCard video={video} onClick={setSelectedVideo} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-[#E7E1D6] to-[#F5DEB3] rounded-3xl p-12 text-center shadow-xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Want to share your experience?
          </h3>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Help others discover how voice technology is making services accessible to everyone.
          </p>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#01070f] text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              Submit Your Story
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default VideoTestimonials
