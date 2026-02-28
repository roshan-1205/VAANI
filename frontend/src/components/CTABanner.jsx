function CTABanner() {
  return (
    <section className="bg-[#E7E1D6] px-6 sm:px-10 lg:px-20 py-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937]">
            "When Systems Listen, Access Becomes Possible"
          </h2>
          <button className="rounded-full bg-[#178F82] text-white px-8 py-4 shadow-md hover:bg-[#14786E] transition-colors duration-300 font-medium">
            Start with a Call
          </button>
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/src/assets/calls2.jpeg" 
            alt="Friendly illustration"
            className="w-full max-w-[400px] mx-auto rounded-2xl border-4 border-[#178F82] shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

export default CTABanner
