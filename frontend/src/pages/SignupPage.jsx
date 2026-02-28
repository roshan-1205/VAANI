import { useState } from 'react'
import loginImage from '../assets/login.jpg'
import posterImage from '../assets/poster.png'
import videoFile from '../assets/video.mp4'
import logoImage from '../assets/logo.png'
import blackLogo from '../assets/blacklogo.png'
import jaihoImage from '../assets/jaiho.jpeg'

function SignupPage() {
  const [activeTab, setActiveTab] = useState('user')

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#E2E2E2]">
      {/* Left Column - Brand Side */}
      <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-center items-center min-h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={jaihoImage} 
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Column - Signup Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-1">
            <img 
              src={blackLogo} 
              alt="Vaani Logo" 
              className="h-36 h-36 object-cover"
            />
          </div>
          
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Create your account</h2>
            <p className="text-[#475569]">Join us as a User, Volunteer, or Admin</p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'user'
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
               User
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'volunteer'
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
              Volunteer
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Form */}
          <form>
            {/* User Category Fields */}
            {activeTab === 'user' && (
              <>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    placeholder="+1 234 567 8900"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
              </>
            )}

            {/* Volunteer Category Fields */}
            {activeTab === 'volunteer' && (
              <>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Jane Smith"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="jane@example.com"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    placeholder="+1 234 567 8900"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dob" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="language" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Preferred Language
                  </label>
                  <select
                    id="language"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  >
                    <option value="">Select language</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="mandarin">Mandarin</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
              </>
            )}

            {/* Admin Category Fields */}
            {activeTab === 'admin' && (
              <>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Alex Johnson"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    placeholder="+1 234 567 8900"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dob" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="alex@company.com"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
              </>
            )}

            {/* Password Fields */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 mb-6">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-5 h-5 border-2 border-[#E2E2E2] rounded accent-[#4F46E5] cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-[#475569]">
                I agree to the{' '}
                <a href="#" className="text-[#4F46E5] hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#4F46E5] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0F172A] text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all duration-200 mb-6"
            >
              Create Account
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-[#475569]">
              Already have an account?{' '}
              <a href="/login" className="text-[#4F46E5] hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
