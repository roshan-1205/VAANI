import React from 'react'

function CTASection() {
  return (
    <section className="bg-[#E2E2E2] py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Top Badge */}
       

        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6">
          Try Voice Demo
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-[#475569] leading-relaxed mb-10 max-w-md mx-auto">
          Interact with our live voice intelligence platform. Speak naturally and witness real-time AI processing.
        </p>

        {/* CTA Button */}
        <button className="bg-gradient-to-r from-[white] to-[white] text-#01070f px-10 py-5 rounded-full font-semibold text-lg inline-flex items-center space-x-3 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 mb-6">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
          <span>Start Voice Demo</span>
        </button>

        {/* Footer Note */}
        <p className="text-sm text-[#64748B]">
          Microphone access required • Works best on Chrome & Edge
        </p>
      </div>
    </section>
  )
}

export default CTASection
