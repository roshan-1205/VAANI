import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  const handleSubscriptionClick = (e) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    if (location.pathname === '/') {
      const pricingSection = document.getElementById('pricing')
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      navigate('/')
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing')
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  
  return (
    <>
      <nav className="bg-[#0F172A] px-4 md:px-8 lg:px-16 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 z-50" onClick={closeMobileMenu}>
            <div className="flex items-center justify-center">
              <img 
                src="https://vaani-storage.s3.eu-north-1.amazonaws.com/assets/Vaani-images/mainlogo.png" 
                alt="Vaani Logo" 
                className="h-12 w-16 md:h-16 md:w-20 object-cover" 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex font-semibold items-center space-x-6 xl:space-x-8">
            <Link to="/overview" className={`${location.pathname === '/overview' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group text-sm xl:text-base`}>
              Overview
              <span className={`absolute left-0 bottom-0 ${location.pathname === '/overview' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link to="/resources" className={`${location.pathname === '/resources' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group text-sm xl:text-base`}>
              Resources
              <span className={`absolute left-0 bottom-0 ${location.pathname === '/resources' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <a 
              href="#pricing" 
              onClick={handleSubscriptionClick}
              className={`${location.pathname === '/subscription' || location.pathname === '/' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group cursor-pointer text-sm xl:text-base`}
            >
              Subscription
              <span className={`absolute left-0 bottom-0 ${location.pathname === '/subscription' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
            </a>
            <Link to="/teams" className={`${location.pathname === '/teams' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group text-sm xl:text-base`}>
              Teams
              <span className={`absolute left-0 bottom-0 ${location.pathname === '/teams' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link to="/blog" className={`${location.pathname === '/blog' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group text-sm xl:text-base`}>
              Blog
              <span className={`absolute left-0 bottom-0 ${location.pathname === '/blog' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link to="/survey" className={`${location.pathname === '/survey' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group text-sm xl:text-base`}>
              Survey
              <span className={`absolute left-0 bottom-0 ${location.pathname === '/survey' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link to="/feedback" className={`${location.pathname === '/feedback' ? 'text-white' : 'text-[#E5E7EB]'} hover:text-white transition-colors relative group text-sm xl:text-base`}>
              Feedback
              <span className={`absolute left-0 bottom-0 ${location.pathname === '/feedback' ? 'w-full' : 'w-0'} h-0.5 bg-white transition-all duration-300 group-hover:w-full`}></span>
            </Link>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-white text-sm font-medium">EN</span>
            </div>
            <Link to="/login" className="bg-[#E5E7EB] text-[#1D4ED8] px-4 lg:px-6 py-2 rounded-full hover:bg-white transition-all duration-300 font-medium flex items-center gap-2 text-sm lg:text-base">
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden z-50 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-[#0F172A] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <img 
              src="https://vaani-storage.s3.eu-north-1.amazonaws.com/assets/Vaani-images/mainlogo.png" 
              alt="Vaani Logo" 
              className="h-12 w-16 object-cover" 
            />
            <button
              onClick={closeMobileMenu}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="flex flex-col space-y-1 px-4">
              <Link 
                to="/overview" 
                onClick={closeMobileMenu}
                className={`${location.pathname === '/overview' ? 'bg-white/10 text-white' : 'text-[#E5E7EB]'} px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all font-medium`}
              >
                Overview
              </Link>
              <Link 
                to="/resources" 
                onClick={closeMobileMenu}
                className={`${location.pathname === '/resources' ? 'bg-white/10 text-white' : 'text-[#E5E7EB]'} px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all font-medium`}
              >
                Resources
              </Link>
              <a 
                href="#pricing" 
                onClick={handleSubscriptionClick}
                className={`${location.pathname === '/subscription' ? 'bg-white/10 text-white' : 'text-[#E5E7EB]'} px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all font-medium cursor-pointer`}
              >
                Subscription
              </a>
              <Link 
                to="/teams" 
                onClick={closeMobileMenu}
                className={`${location.pathname === '/teams' ? 'bg-white/10 text-white' : 'text-[#E5E7EB]'} px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all font-medium`}
              >
                Teams
              </Link>
              <Link 
                to="/blog" 
                onClick={closeMobileMenu}
                className={`${location.pathname === '/blog' ? 'bg-white/10 text-white' : 'text-[#E5E7EB]'} px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all font-medium`}
              >
                Blog
              </Link>
              <Link 
                to="/survey" 
                onClick={closeMobileMenu}
                className={`${location.pathname === '/survey' ? 'bg-white/10 text-white' : 'text-[#E5E7EB]'} px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all font-medium`}
              >
                Survey
              </Link>
              <Link 
                to="/feedback" 
                onClick={closeMobileMenu}
                className={`${location.pathname === '/feedback' ? 'bg-white/10 text-white' : 'text-[#E5E7EB]'} px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all font-medium`}
              >
                Feedback
              </Link>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-white text-sm font-medium">EN</span>
            </div>
            <Link 
              to="/login" 
              onClick={closeMobileMenu}
              className="w-full bg-[#E5E7EB] text-[#1D4ED8] px-6 py-3 rounded-lg hover:bg-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
