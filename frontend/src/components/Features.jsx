function Features() {
  const features = [
    {
      title: "Multilanguage Support",
      description: "Available in 20+ regional languages & dialects",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      shadowColor: "shadow-blue-500/30 group-hover:shadow-blue-500/60"
    },
    {
      title: "Toll-Free Access",
      description: "No cost to the user, accessible from any phone",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-500",
      shadowColor: "shadow-green-500/30 group-hover:shadow-green-500/60"
    },
    {
      title: "Secure & Private",
      description: "Data protected with government-grade security",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      shadowColor: "shadow-purple-500/30 group-hover:shadow-purple-500/60"
    },
    {
      title: "24/7 Availability",
      description: "Access services anytime, anywhere",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500",
      shadowColor: "shadow-orange-500/30 group-hover:shadow-orange-500/60"
    },
    {
      title: "Simple Interface",
      description: "Designed for intuitive voice interaction",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      gradient: "from-indigo-500 to-blue-500",
      shadowColor: "shadow-indigo-500/30 group-hover:shadow-indigo-500/60"
    },
    {
      title: "Offline Capable",
      description: "Works reliably even with low connectivity",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      gradient: "from-teal-500 to-green-500",
      shadowColor: "shadow-teal-500/30 group-hover:shadow-teal-500/60"
    }
  ]

  return (
    <section className=" relative py-24 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Section Header */}
      <div className="relative text-center mb-20">
        <div className="inline-block mb-4">
          
        </div>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-#01070f mb-6 tracking-tight">
          Powerful Features
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Built with accessibility, security, and scale in mind
        </p>
      </div>

      {/* Features Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative ${index % 2 === 0 ? 'bg-[#E7E1D6]' : 'bg-[#E7E1D6]'} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3 border border-gray-200 overflow-hidden`}
          >
            {/* Gradient Overlay on Hover */}
            <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-gradient-to-br from-amber-50 to-orange-50' : 'bg-gradient-to-br from-yellow-50 to-amber-50'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
            
            {/* Content Container */}
            <div className="relative z-10">
              {/* Icon */}
              <div className={`w-20 h-20 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.shadowColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-500"></div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="relative text-center mt-20">
        <p className="text-lg text-gray-600 mb-6">
          Experience the future of accessible government services
        </p>
        <button className="bg-[#E2E2E2] text-#01070f px-10 py-5 rounded-full font-semibold text-lg inline-flex items-center space-x-3 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 mb-6">
          Get Started Today
        </button>
      </div>
    </section>
  )
}

export default Features
