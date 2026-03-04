import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupWithEmail, loginWithGoogle, setupRecaptcha, sendOTP, verifyOTP } from '../services/authService'

function SignupPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('user')
  const [signupMethod, setSignupMethod] = useState('email') // 'email', 'google', 'phone'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dob: '',
    language: ''
  })
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleTabChange = (tab) => {
    if (tab === 'admin') {
      setError('Admin accounts cannot be created through signup. Please contact system administrator.')
      return
    }
    setActiveTab(tab)
    setError('')
  }

  const handleEmailSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy')
      setLoading(false)
      return
    }

    try {
      const result = await signupWithEmail(formData.email, formData.password, activeTab)
      
      if (result.success) {
        console.log('✅ Signup successful with role:', result.role);
        
        // Show success message and redirect to login
        alert(`Account created successfully as ${activeTab}! Please login to continue.`);
        navigate('/login');
      }
    } catch (err) {
      console.error('❌ Signup error:', err);
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setLoading(true)
    setError('')

    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy')
      setLoading(false)
      return
    }

    try {
      const result = await loginWithGoogle(activeTab)
      
      if (result.success) {
        console.log('✅ Google signup successful with role:', result.role);
        
        // Redirect based on role
        if (result.role === 'admin') {
          window.location.href = 'http://localhost:3002';
        } else if (result.role === 'volunteer') {
          window.location.href = 'http://localhost:3001';
        } else {
          window.location.href = 'http://localhost:3000';
        }
      }
    } catch (err) {
      console.error('❌ Google signup error:', err);
      setError(err.message || 'Google signup failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('Phone authentication is not available. Please use Email or Google signup.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#E2E2E2]">
      {/* Left Column - Brand Side */}
      <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-center items-center min-h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://vaani-storage.s3.eu-north-1.amazonaws.com/assets/Vaani-images/jaiho.jpeg"
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
              src="https://vaani-storage.s3.eu-north-1.amazonaws.com/assets/Vaani-images/blacklogo.png"
              alt="Vaani Logo" 
              className="h-36 h-36 object-cover"
            />
          </div>
          
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Create your account</h2>
            <p className="text-[#475569]">Join us as a User or Volunteer</p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleTabChange('user')}
              type="button"
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'user'
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
               User
            </button>
            <button
              onClick={() => handleTabChange('volunteer')}
              type="button"
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'volunteer'
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
              Volunteer
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Signup Method Selection */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setSignupMethod('email')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                signupMethod === 'email'
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setSignupMethod('google')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                signupMethod === 'google'
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => setSignupMethod('phone')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                signupMethod === 'phone'
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
              Phone
            </button>
          </div>

          {/* Email Signup Form */}
          {signupMethod === 'email' && (
            <form onSubmit={handleEmailSignup}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F172A] text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all duration-200 mb-6 disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Google Signup */}
          {signupMethod === 'google' && (
            <div>
              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  id="terms-google"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-5 h-5 border-2 border-[#E2E2E2] rounded accent-[#4F46E5] cursor-pointer mt-0.5"
                />
                <label htmlFor="terms-google" className="text-sm text-[#475569]">
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

              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full bg-white border border-[#E2E2E2] rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-all duration-200 mb-6 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {loading ? 'Processing...' : 'Sign up with Google'}
              </button>
            </div>
          )}

          {/* Phone Signup */}
          {signupMethod === 'phone' && (
            <form onSubmit={handlePhoneSignup}>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900"
                  required
                  disabled={otpSent}
                  className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all disabled:bg-gray-100"
                />
              </div>

              {otpSent && (
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    required
                    className="w-full px-4 py-3 border border-[#E2E2E2] rounded-lg bg-white outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                  />
                </div>
              )}

              <div id="recaptcha-container"></div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  id="terms-phone"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  className="w-5 h-5 border-2 border-[#E2E2E2] rounded accent-[#4F46E5] cursor-pointer mt-0.5"
                />
                <label htmlFor="terms-phone" className="text-sm text-[#475569]">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F172A] text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all duration-200 mb-6 disabled:opacity-50"
              >
                {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
              </button>
            </form>
          )}
          {/* Login link */}
          <p className="text-center text-sm text-[#475569]">
            Already have an account?{' '}
            <a href="/login" className="text-[#4F46E5] hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
