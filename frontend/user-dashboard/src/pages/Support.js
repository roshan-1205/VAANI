import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Search, ChevronDown, ChevronUp, Book, Video, FileText, Mail, Phone, MessageCircle, X, Send, Clock, CheckCircle } from 'lucide-react';
import './Support.css';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const categories = [
    { id: 'all', label: 'All Topics', count: 12 },
    { id: 'account', label: 'Account', count: 3 },
    { id: 'application', label: 'Applications', count: 4 },
    { id: 'technical', label: 'Technical', count: 3 },
    { id: 'billing', label: 'Billing', count: 2 }
  ];

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button on the homepage and fill in your details. You\'ll receive a verification email to activate your account. Make sure to use a valid email address and create a strong password with at least 8 characters.'
    },
    {
      id: 2,
      category: 'application',
      question: 'How can I track my application status?',
      answer: 'You can track your application status by navigating to "My Activity" section in the sidebar. All your submitted applications will be listed there with their current status. You\'ll also receive email notifications for any status changes.'
    },
    {
      id: 3,
      category: 'application',
      question: 'What documents are required for verification?',
      answer: 'Required documents typically include: Government-issued ID (Aadhaar/PAN), proof of address, and relevant certificates depending on the service you\'re applying for. All documents should be clear, valid, and in PDF or JPG format.'
    },
    {
      id: 4,
      category: 'application',
      question: 'How long does it take to process applications?',
      answer: 'Processing time varies by service type: Healthcare appointments: 1-2 days, Legal aid: 3-5 days, Education services: 5-7 days, Welfare benefits: 7-10 days. You\'ll receive updates via email and in-app notifications.'
    },
    {
      id: 5,
      category: 'application',
      question: 'Can I modify my application after submission?',
      answer: 'Yes, you can modify your application within 24 hours of submission by going to My Activity and clicking "Edit". After 24 hours, you\'ll need to contact support for any changes. Some fields may be locked once processing begins.'
    },
    {
      id: 6,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page. Enter your registered email address, and you\'ll receive a password reset link within 5 minutes. The link is valid for 1 hour. If you don\'t receive it, check your spam folder.'
    },
    {
      id: 7,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to Settings from the sidebar menu, then click on "Profile Settings". You can update your name, email, phone number, and address. Some changes may require verification.'
    },
    {
      id: 8,
      category: 'technical',
      question: 'What browsers are supported?',
      answer: 'We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using Chrome or Firefox. Make sure JavaScript is enabled in your browser.'
    },
    {
      id: 9,
      category: 'technical',
      question: 'Why am I experiencing slow loading times?',
      answer: 'Slow loading can be caused by poor internet connection, browser cache, or high server traffic. Try clearing your browser cache, checking your internet connection, or accessing during off-peak hours.'
    },
    {
      id: 10,
      category: 'technical',
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption (SSL/TLS) to protect your data. All sensitive information is encrypted both in transit and at rest. We comply with data protection regulations and never share your personal information without consent.'
    },
    {
      id: 11,
      category: 'billing',
      question: 'Are there any fees for using the service?',
      answer: 'Most government services are free. However, some premium features or expedited processing may have associated fees. All fees are clearly displayed before you proceed with payment.'
    },
    {
      id: 12,
      category: 'billing',
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, UPI, net banking, and digital wallets. All payments are processed through secure payment gateways. You\'ll receive a receipt via email after successful payment.'
    }
  ];

  const resources = [
    {
      icon: Book,
      title: 'User Guide',
      description: 'Comprehensive guide to using all features',
      color: '#8b5cf6',
      action: () => alert('Opening User Guide...')
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video instructions',
      color: '#3b82f6',
      action: () => alert('Opening Video Tutorials...')
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Detailed technical documentation',
      color: '#10b981',
      action: () => alert('Opening Documentation...')
    },
    {
      icon: Mail,
      title: 'Contact Support',
      description: 'Get help from our support team',
      color: '#f59e0b',
      action: () => setShowContactModal(true)
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setTimeout(() => {
        setShowContactModal(false);
        setSubmitStatus('');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="support-page">
      <motion.div
        className="support-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-icon">
          <HelpCircle size={32} />
        </div>
        <div>
          <h1>Help & Support</h1>
          <p>Find answers and get assistance</p>
        </div>
      </motion.div>

      <motion.div
        className="search-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="search-box-large">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div
        className="resources-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            className="resource-card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resource.action}
          >
            <div className="resource-icon" style={{ backgroundColor: `${resource.color}20`, color: resource.color }}>
              <resource.icon size={28} />
            </div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="faq-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
                <span className="count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="faq-list">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedFaq === faq.id && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredFaqs.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HelpCircle size={48} />
            <p>No results found for "{searchTerm}"</p>
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              Clear Search
            </button>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="contact-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3>Still need help?</h3>
        <p>Our support team is available 24/7 to assist you</p>
        <div className="contact-info">
          <div className="info-item">
            <Clock size={20} />
            <span>24/7 Support</span>
          </div>
          <div className="info-item">
            <Phone size={20} />
            <span>+91 1800-XXX-XXXX</span>
          </div>
          <div className="info-item">
            <Mail size={20} />
            <span>support@example.com</span>
          </div>
        </div>
        <div className="contact-buttons">
          <button className="contact-btn primary" onClick={() => setShowContactModal(true)}>
            <Mail size={18} />
            Email Support
          </button>
          <button className="contact-btn secondary">
            <MessageCircle size={18} />
            Live Chat
          </button>
        </div>
      </motion.div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !submitStatus && setShowContactModal(false)}
          >
            <motion.div
              className="modal contact-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {submitStatus === 'success' ? (
                <div className="success-message">
                  <CheckCircle size={64} />
                  <h3>Message Sent!</h3>
                  <p>We'll get back to you within 24 hours</p>
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <h2>Contact Support</h2>
                    <button className="modal-close" onClick={() => setShowContactModal(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={handleContactSubmit}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        disabled={submitStatus === 'sending'}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        disabled={submitStatus === 'sending'}
                      />
                    </div>

                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your issue"
                        required
                        disabled={submitStatus === 'sending'}
                      />
                    </div>

                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        placeholder="Describe your issue in detail..."
                        rows="5"
                        required
                        disabled={submitStatus === 'sending'}
                      />
                    </div>

                    <div className="modal-actions">
                      <button 
                        type="button" 
                        className="btn-cancel" 
                        onClick={() => setShowContactModal(false)}
                        disabled={submitStatus === 'sending'}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn-submit"
                        disabled={submitStatus === 'sending'}
                      >
                        {submitStatus === 'sending' ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Support;
