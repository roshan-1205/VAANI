import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginWithEmail, loginWithGoogle, setupRecaptcha, sendOTP, verifyOTP } from '../services/authService'

function LoginPage() {
  const navigate = useNavigate()
  const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: ''
  })
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('🔄 Attempting login with:', formData.email);
      const result = await loginWithEmail(formData.email, formData.password)
      
      console.log('📦 Login result:', result);
      console.log('📦 User role from result:', result.role);
      console.log('📦 SessionStorage role:', sessionStorage.getItem('userRole'));
      
      if (result.success) {
        console.log('✅ Login successful. Role:', result.role);
        
        // Small delay to ensure sessionStorage is set
        setTimeout(() => {
          // Determine redirect path based on role
          if (result.role === 'admin') {
            console.log('→ Redirecting to Admin Dashboard');
            window.location.href = '/admin/dashboard';
          } else if (result.role === 'volunteer') {
            console.log('→ Redirecting to Volunteer Dashboard');
            window.location.href = '/volunteer-dashboard';
          } else {
            console.log('→ Redirecting to User Dashboard');
            window.location.href = '/user-dashboard';
          }
        }, 300);
      } else {
        console.error('❌ Login failed - no success flag');
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await loginWithGoogle('user')
      
      if (result.success) {
        console.log('✅ Google login successful. Role:', result.role);
        console.log('📦 SessionStorage role:', sessionStorage.getItem('userRole'));
        
        // Small delay to ensure sessionStorage is set
        setTimeout(() => {
          // Determine redirect path based on role
          if (result.role === 'admin') {
            console.log('→ Redirecting to Admin Dashboard');
            window.location.href = '/admin/dashboard';
          } else if (result.role === 'volunteer') {
            console.log('→ Redirecting to Volunteer Dashboard');
            window.location.href = '/volunteer-dashboard';
          } else {
            console.log('→ Redirecting to User Dashboard');
            window.location.href = '/user-dashboard';
          }
        }, 300);
      }
    } catch (err) {
      console.error('❌ Google login error:', err);
      setError(err.message || 'Google login failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('Phone authentication is not available. Please use Email or Google login.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#E2E2E2]">
      {/* Left Column - Brand Side */}
      <div className="hidden md:flex md:w-1/2  p-12 flex-col justify-center items-center min-h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://vaani-storage.s3.eu-north-1.amazonaws.com/assets/Vaani-images/jaiho.jpeg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full md:w-1/2 p-10 md:p-12 flex items-center justify-center">
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
            <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Welcome back</h2>
            <p className="text-[#475569]">Sign in to your account to continue</p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'phone'
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E2E2]'
              }`}
            >
              Phone
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Email Login Form */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailLogin}>
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
                  placeholder="hello@example.com"
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

              <div className="text-right mb-6">
                <a href="#" className="text-sm text-[#4F46E5] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F172A] text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all duration-200 mb-6 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          )}

          {/* Phone Login Form */}
          {loginMethod === 'phone' && (
            <form onSubmit={handlePhoneLogin}>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F172A] text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all duration-200 mb-6 disabled:opacity-50"
              >
                {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Sign up link */}
          <p className="text-center text-sm text-[#475569]">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#4F46E5] hover:underline">
              Sign up
            </a>
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E2E2]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#94A3B8]">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border border-[#E2E2E2] rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-all duration-200 disabled:opacity-50"
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
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
