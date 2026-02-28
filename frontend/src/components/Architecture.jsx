import React from 'react'

function Architecture() {
  const steps = [
    {
      number: "Step 1",
      title: "Voice Input",
      description: "Multi-lingual speech recognition",
      icon: (
        <svg className="w-12 h-12 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      number: "Step 2",
      title: "Intent Processing",
      description: "Natural language understanding",
      icon: (
        <svg className="w-12 h-12 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      number: "Step 3",
      title: "Service Integration",
      description: "Connect to government databases",
      icon: (
        <svg className="w-12 h-12 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      number: "Step 4",
      title: "Data Processing",
      description: "Secure transaction handling",
      icon: (
        <svg className="w-12 h-12 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "Step 5",
      title: "Voice Response",
      description: "Natural voice output generation",
      icon: (
        <svg className="w-12 h-12 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )
    }
  ]

  return (
    <section className="bg-[#0F172A] py-28 px-4">
      <div className="max-w-full mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase">
            System Architecture
          </h2>
          <p className="text-xl text-[#94A3B8] mb-4">
            Architecture Preview Diagram
          </p>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Clear, seamless, integrated ecosystem and standardized interfaces
          </p>
        </div>

        {/* Steps in Single Horizontal Line - No Scroll */}
        <div className="flex flex-wrap justify-center items-center gap-6 w-full">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div className="bg-[#1E293B] rounded-lg p-6 w-[220px] shadow-lg text-left">
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  {step.icon}
                </div>
                <p className="text-sm text-[#6366F1] uppercase mb-2">{step.number}</p>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-[#94A3B8]">{step.description}</p>
              </div>

              {/* Arrow (except after last step) */}
              {index < steps.length - 1 && (
                <div className="text-[#6366F1] text-2xl hidden lg:block">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Architecture
