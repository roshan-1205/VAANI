import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex items-center px-1 md:px-4 pt-6 pb-6">
      {/* Outer Container Box with margins */}
      <div className="w-full mx-1 md:mx-2 lg:mx-4 bg-[#0F172A]/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 border border-[#1E293B]/50 shadow-2xl relative overflow-hidden">
        {/* Background Video */}
        <video 
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="https://res.cloudinary.com/dvbqsllqw/video/upload/v1774447273/lv_0_20260325192701_sxk3cm.mp4" type="video/mp4" />
        </video>
        
        {/* Content Overlay */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Left Side */}
          <div className="flex-1 space-y-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#E5E7EB]">
              Vaani
            </h1>
            <p className="text-xl md:text-2xl text-[#C7D2FE]">
              Access schemes, support, and services effortlessly through the power of your voice.
Vaani transforms complex processes into simple conversations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium">
                Voice Chat
              </Link>
              <button className="bg-transparent border border-[#C7D2FE] text-[#C7D2FE] px-8 py-3 rounded-full hover:bg-[#C7D2FE] hover:text-[#030712] transition-all duration-300 font-medium">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Card */}
          <div className="flex-shrink-0">
            <div className="relative bg-[#E5E7EB] rounded-3xl shadow-3xl w-full sm:w-[450px] md:w-[500px] lg:w-[550px] h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden transition-all duration-300">
              {/* Glow effect behind */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-xl opacity-75 animate-pulse -z-10"></div>
              <img 
                src="https://res.cloudinary.com/dvbqsllqw/image/upload/v1774446447/new_wrmgcw.png" 
                alt="AI Assistant"
                className="w-full h-full object-cover rounded-3xl  relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
