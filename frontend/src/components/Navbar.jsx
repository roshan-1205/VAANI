import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const handleSubscriptionClick = (e) => {
    e.preventDefault()
    
    if (location.pathname === '/') {
      // If on home page, scroll to pricing section
      const pricingSection = document.getElementById('pricing')
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // If on another page, navigate to home and then scroll
      navigate('/')
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing')
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }
  
  return (
    <nav className="bg-[#0F172A] px-1 md:px-16 ">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className=" flex items-center justify-center">
            <img src="https://vaani-storage.s3.eu-north-1.amazonaws.com/assets/Vaani-images/mainlogo.png" alt="Vaani Logo" className=" h-full w-20 object-cover" />
          </div>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex font-semibold items-center space-x-8">
          <Link to="/overview" className={`${location.pathname === '/overview' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group`}>
            Overview
            <span className={`absolute left-0 bottom-0 ${location.pathname === '/overview' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
          </Link>
          <Link to="/resources" className={`${location.pathname === '/resources' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group`}>
            Resources
            <span className={`absolute left-0 bottom-0 ${location.pathname === '/resources' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
          </Link>
          <a 
            href="#pricing" 
            onClick={handleSubscriptionClick}
            className={`${location.pathname === '/subscription' || location.pathname === '/' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group cursor-pointer`}
          >
            Subscription
            <span className={`absolute left-0 bottom-0 ${location.pathname === '/subscription' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
          </a>
          <Link to="/teams" className={`${location.pathname === '/teams' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group`}>
            Teams
            <span className={`absolute left-0 bottom-0 ${location.pathname === '/teams' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
          </Link>
          <Link to="/blog" className={`${location.pathname === '/blog' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group`}>
            Blog
            <span className={`absolute left-0 bottom-0 ${location.pathname === '/blog' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
          </Link>
          <Link to="/survey" className={`${location.pathname === '/survey' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group`}>
            Survey
            <span className={`absolute left-0 bottom-0 ${location.pathname === '/survey' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
          </Link>
          <Link to="/feedback" className={`${location.pathname === '/feedback' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group`}>
            Feedback
            <span className={`absolute left-0 bottom-0 ${location.pathname === '/feedback' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="text-white text-sm font-medium">EN</span>
          </div>
          <Link to="/login" className="bg-[#E5E7EB] text-[#1D4ED8] px-6 py-2 rounded-full hover:bg-white transition-all duration-300 font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Login
          </Link>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar
