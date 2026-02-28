import animationVideo from '../assets/animation.mp4'

function VideoSection() {
  return (
    <section className="relative bg-[#01070f] py-20 px-3 sm:px-10 lg:px-20 overflow-hidden" style={{ borderRadius: '0 20rem 20rem 0' }}>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#E2E2E2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#E2E2E2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
        {/* Video Container with Capsule Shape on Right - Aligned Left */}
        <div className="overflow-hidden shadow-2xl border-4 border-white/10 h-[400px] md:h-[500px] max-w-4xl flex-shrink-0" style={{ borderRadius: '1.5rem 15rem 15rem 1.5rem' }}>
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={animationVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text Content on Right */}
        <div className="flex-1 text-white">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            "Your voice deserves more than a complaint    <br/>- it deserves a solution"
          </h3>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
