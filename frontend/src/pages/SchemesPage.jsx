import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function SchemesPage() {

  const [filters, setFilters] = useState({
    category: 'All',
    eligibility: 'All',
    state: 'All',
    benefitType: 'All'
  })

  const schemes = [
    {
      title: "Farmer Support Scheme",
      description: "Financial assistance and subsidies for farmers to improve agricultural productivity and income",
      eligibility: ["Farmers", "Landowners"],
      benefitType: "Financial Aid",
      deadline: "March 31, 2024"
    },
    {
      title: "Senior Citizen Pension Program",
      description: "Monthly pension support for senior citizens above 60 years to ensure financial security",
      eligibility: ["Senior Citizens", "Age 60+"],
      benefitType: "Pension",
      deadline: null
    },
    {
      title: "Student Scholarship Scheme",
      description: "Educational scholarships for meritorious students from economically weaker sections",
      eligibility: ["Students", "Low Income"],
      benefitType: "Education",
      deadline: "June 30, 2024"
    },
    {
      title: "Women Empowerment Grant",
      description: "Financial support and training programs for women entrepreneurs and self-help groups",
      eligibility: ["Women", "Entrepreneurs"],
      benefitType: "Business Support",
      deadline: "December 31, 2024"
    },
    {
      title: "Rural Housing Assistance",
      description: "Subsidized housing loans and grants for building homes in rural areas",
      eligibility: ["Rural Residents", "Below Poverty Line"],
      benefitType: "Housing",
      deadline: null
    },
    {
      title: "Health Insurance Support",
      description: "Free health insurance coverage for families below poverty line covering hospitalization",
      eligibility: ["BPL Families", "All Ages"],
      benefitType: "Healthcare",
      deadline: null
    }
  ]

  const SchemeCard = ({ scheme, index }) => (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-200 p-8 group cursor-pointer">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
        {scheme.title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        {scheme.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {scheme.eligibility.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-semibold rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
          {scheme.benefitType}
        </span>
        {scheme.deadline && (
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {scheme.deadline}
          </span>
        )}
      </div>
      <span className="text-purple-600 font-semibold group-hover:text-blue-600 transition-colors duration-300 inline-flex items-center gap-2">
        View Details
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  )

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2] min-h-screen">
        {/* Header Section */}
        <section className="relative bg-[#E2E2E2] py-24 px-6 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-xs font-semibold rounded-full uppercase tracking-wide shadow-lg">
                  GOVERNMENT SCHEMES
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#01070f] mb-6 tracking-tight">
                Available Government Schemes & Benefits
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Explore programs designed to support citizens through financial aid, healthcare, education, and social welfare.
              </p>
            </div>
          </div>
        </section>

        {/* Search + Filters Section */}
        <section className="py-12 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search schemes…"
                  className="w-full pl-14 pr-6 py-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 shadow-lg bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-md text-gray-900 font-semibold"
                >
                  <option>All Categories</option>
                  <option>Agriculture</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Housing</option>
                </select>

                <select
                  value={filters.eligibility}
                  onChange={(e) => setFilters({...filters, eligibility: e.target.value})}
                  className="px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-md text-gray-900 font-semibold"
                >
                  <option>All Eligibility</option>
                  <option>Farmers</option>
                  <option>Students</option>
                  <option>Senior Citizens</option>
                  <option>Women</option>
                </select>

                <select
                  value={filters.state}
                  onChange={(e) => setFilters({...filters, state: e.target.value})}
                  className="px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-md text-gray-900 font-semibold"
                >
                  <option>All States</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Gujarat</option>
                </select>

                <select
                  value={filters.benefitType}
                  onChange={(e) => setFilters({...filters, benefitType: e.target.value})}
                  className="px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-md text-gray-900 font-semibold"
                >
                  <option>All Benefit Types</option>
                  <option>Financial Aid</option>
                  <option>Pension</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Schemes Grid */}
        <section className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {schemes.map((scheme, index) => (
                <SchemeCard key={index} scheme={scheme} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Info Banner */}
        <section className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#E7E1D6] to-[#F5F5F5] rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[#E7E1D6] animate-pulse"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-[#01070f] mb-4">
                  Not sure which scheme applies to you?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Use our AI assistant to find personalized government benefits instantly.
                </p>
                <button className="px-10 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find My Schemes
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

export default SchemesPage
