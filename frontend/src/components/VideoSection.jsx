import './VideoSection.css'

function VideoSection() {
  return (
    <section className="video-section relative bg-[#01070f] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">

          {/* Video Container - Fully Responsive */}
          <div className="w-full lg:w-1/2 lg:flex-shrink-0">
            <div className="video-container relative overflow-hidden shadow-2xl 
                           border-2 sm:border-4 border-white/10 
                           h-[280px] xs:h-[320px] sm:h-[400px] md:h-[500px] lg:h-[550px] 
                           w-full max-w-full">
              <video
                src="https://vaani-storage.s3.eu-north-1.amazonaws.com/assets/animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                aria-label="VAANI platform demonstration video"
              />
            </div>
          </div>

          {/* Text Content - Fully Responsive */}
          <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
            <h3 className="video-section-title 
                          text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                          font-bold 
                          leading-tight 
                          px-2 sm:px-0">
              <span className="block">"Your voice deserves</span>
              <span className="block">more than a complaint</span>
              <span className="block mt-1 sm:mt-2">- it deserves a solution"</span>
            </h3>
            
            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl
                         text-gray-300 leading-relaxed
                         max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0">
              Experience the power of voice-driven civic engagement
            </p>
          </div>

        </div>
      </div>

      {/* Decorative elements - Progressive enhancement */}
      <div className="hidden lg:block absolute top-10 right-10 w-32 h-32 
                     bg-blue-500/10 rounded-full blur-3xl animate-pulse" 
           aria-hidden="true" />
      <div className="hidden lg:block absolute bottom-10 left-10 w-40 h-40 
                     bg-purple-500/10 rounded-full blur-3xl animate-pulse" 
           aria-hidden="true" 
           style={{ animationDelay: '1s' }} />
    </section>
  )
}

export default VideoSection
