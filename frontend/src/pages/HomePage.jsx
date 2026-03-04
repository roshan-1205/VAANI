import React from 'react'
import Hero from '../components/Hero'
import CTASection from '../components/CTASection'
import VideoSection from '../components/VideoSection'
import Features from '../components/Features'
import Architecture from '../components/Architecture'
import About from '../components/About'
import VideoTestimonials from '../components/VideoTestimonials'
import PricingSection from '../components/PricingSection'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'
import ChatbotWidget from '../components/ChatbotWidget'

function HomePage() {
  return (
    <>
      <Hero />
      <CTASection />
      <VideoSection />
      <Features />
      <Architecture />
      <About />
      <VideoTestimonials />
      <PricingSection />
      <CTABanner />
      <Footer />
      <ChatbotWidget />
    </>
  )
}

export default HomePage
