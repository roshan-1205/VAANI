import { useState } from 'react';
import { HelpCircle, Search, ChevronDown, Book, Video, FileText, Mail, Phone, MessageCircle, X, Send, Clock, CheckCircle } from 'lucide-react';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');

  const categories = [
    { id: 'all', label: 'All Topics', count: 12 },
    { id: 'account', label: 'Account', count: 3 },
    { id: 'application', label: 'Applications', count: 4 },
    { id: 'technical', label: 'Technical', count: 3 },
    { id: 'billing', label: 'Billing', count: 2 }
  ];

  const faqs = [
    { id: 1, category: 'account', question: 'How do I create an account?', answer: 'To create an account, click on the "Sign Up" button on the homepage and fill in your details. You\'ll receive a verification email to activate your account.' },
    { id: 2, category: 'application', question: 'How can I track my application status?', answer: 'You can track your application status by navigating to "My Activity" section in the sidebar.' },
    { id: 3, category: 'application', question: 'What documents are required for verification?', answer: 'Required documents typically include: Government-issued ID (Aadhaar/PAN), proof of address, and relevant certificates.' },
    { id: 4, category: 'application', question: 'How long does it take to process applications?', answer: 'Processing time varies by service type: Healthcare appointments: 1-2 days, Legal aid: 3-5 days, Education services: 5-7 days.' },
    { id: 5, category: 'application', question: 'Can I modify my application after submission?', answer: 'Yes, you can modify your application within 24 hours of submission by going to My Activity and clicking "Edit".' },
    { id: 6, category: 'account', question: 'How do I reset my password?', answer: 'Click on "Forgot Password" on the login page. Enter your registered email address, and you\'ll receive a password reset link.' },
    { id: 7, category: 'account', question: 'How do I update my profile information?', answer: 'Go to Settings from the sidebar menu, then click on "Profile Settings".' },
    { id: 8, category: 'technical', question: 'What browsers are supported?', answer: 'We support the latest versions of Chrome, Firefox, Safari, and Edge.' },
    { id: 9, category: 'technical', question: 'Why am I experiencing slow loading times?', answer: 'Slow loading can be caused by poor internet connection, browser cache, or high server traffic.' },
    { id: 10, category: 'technical', question: 'Is my data secure?', answer: 'Yes, we use industry-standard encryption (SSL/TLS) to protect your data.' },
    { id: 11, category: 'billing', question: 'Are there any fees for using the service?', answer: 'Most government services are free. However, some premium features may have associated fees.' },
    { id: 12, category: 'billing', question: 'What payment methods are accepted?', answer: 'We accept credit/debit cards, UPI, net banking, and digital wallets.' }
  ];

  const resources = [
    { icon: Book, title: 'User Guide', description: 'Comprehensive guide to using all features', color: '#8b5cf6', action: () => alert('Opening User Guide...') },
    { icon: Video, title: 'Video Tutorials', description: 'Step-by-step video instructions', color: '#3b82f6', action: () => alert('Opening Video Tutorials...') },
    { icon: FileText, title: 'Documentation', description: 'Detailed technical documentation', color: '#10b981', action: () => alert('Opening Documentation...') },
    { icon: Mail, title: 'Contact Support', description: 'Get help from our support team', color: '#f59e0b', action: () => setShowContactModal(true) }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
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
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 min-h-screen max-w-[1400px] mx-auto bg-white">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-[#01070f] rounded-2xl flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <HelpCircle size={32} />
        </div>
        <div>
          <h1 className="font-['Poppins'] text-[32px] font-bold text-[#01070f] m-0 mb-1">Help & Support</h1>
          <p className="font-['Poppins'] text-sm text-[#6b7280] m-0">Find answers and get assistance</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 px-6 py-4 bg-[#f9fafb] border-2 border-[#e5e7eb] rounded-2xl">
          <Search size={20} className="text-[#9ca3af]" />
          <input 
            type="text" 
            placeholder="Search for help..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="flex-1 bg-transparent border-none outline-none text-[#01070f] font-['Poppins'] text-base placeholder:text-[#9ca3af]" 
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-12">
        {resources.map((resource, index) => (
          <div 
            key={index} 
            className="bg-[#01070f] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5" 
            onClick={resource.action}
          >
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" 
              style={{ backgroundColor: `${resource.color}33`, color: resource.color }}
            >
              <resource.icon size={28} />
            </div>
            <h3 className="font-['Poppins'] text-base font-semibold text-white m-0 mb-2">{resource.title}</h3>
            <p className="font-['Poppins'] text-[13px] text-white/60 m-0 leading-snug">{resource.description}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-6">
          <h2 className="font-['Poppins'] text-2xl font-bold text-[#01070f] m-0 mb-6">Frequently Asked Questions</h2>
          <div className="flex gap-2 flex-wrap bg-[#f9fafb] p-1.5 rounded-xl border-2 border-[#e5e7eb] w-fit">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`flex items-center gap-2 px-4 py-2.5 ${selectedCategory === cat.id ? 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]' : 'bg-transparent text-[#6b7280]'} border-none rounded-lg font-['Poppins'] text-sm font-semibold cursor-pointer transition-all duration-300`} 
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-white/20 rounded-[10px] text-xs font-semibold">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-[#01070f] rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5 mb-12">
          <div className="flex flex-col gap-3">
            {filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white/[0.03] rounded-xl overflow-hidden border-l-[3px] border-[#3b82f6] transition-all duration-300 hover:bg-white/[0.08]"
              >
                <button 
                  className="w-full flex justify-between items-center px-6 py-5 bg-transparent border-none text-white font-['Poppins'] text-[15px] font-semibold text-left cursor-pointer" 
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 flex-shrink-0 ml-4 ${expandedFaq === faq.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-5 font-['Poppins'] text-sm text-white/70 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {filteredFaqs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-15 px-5 text-center bg-[#01070f] rounded-2xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5">
            <HelpCircle size={48} className="text-white/20" />
            <p className="font-['Poppins'] text-base text-white/50 mt-4 mb-4">No results found for "{searchTerm}"</p>
            <button 
              className="px-6 py-2.5 bg-gradient-to-br from-[#10b981] to-[#059669] text-white border-none rounded-lg font-['Poppins'] text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]" 
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#01070f] rounded-3xl p-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5">
        <h3 className="font-['Poppins'] text-2xl font-bold text-white m-0 mb-2">Still need help?</h3>
        <p className="font-['Poppins'] text-sm text-white/70 m-0 mb-6">Our support team is available 24/7 to assist you</p>
        <div className="flex justify-center gap-8 mb-6 flex-wrap">
          <div className="flex items-center gap-2 text-white/80 font-['Poppins'] text-sm">
            <Clock size={20} className="text-white/60" />
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 font-['Poppins'] text-sm">
            <Phone size={20} className="text-white/60" />
            <span>+91 1800-XXX-XXXX</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 font-['Poppins'] text-sm">
            <Mail size={20} className="text-white/60" />
            <span>vaani.voice.assist@gmail.com</span>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <button 
            className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-br from-[#10b981] to-[#3b82f6] text-white border-none rounded-xl font-['Poppins'] text-[15px] font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)]" 
            onClick={() => setShowContactModal(true)}
          >
            <Mail size={18} />
            Email Support
          </button>
          <button className="flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl font-['Poppins'] text-[15px] font-semibold cursor-pointer transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5">
            <MessageCircle size={18} />
            Live Chat
          </button>
        </div>
      </div>

      {showContactModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-5" 
          onClick={() => !submitStatus && setShowContactModal(false)}
        >
          <div 
            className="bg-[#0a1628] rounded-2xl p-8 w-[90%] max-w-[600px] z-[1001] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 px-5 text-center">
                <CheckCircle size={64} className="text-[#10b981] mb-5" />
                <h3 className="text-white font-['Poppins'] text-2xl font-bold m-0 mb-3">Message Sent!</h3>
                <p className="text-white/70 font-['Poppins'] text-sm m-0">We'll get back to you within 24 hours</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white font-['Poppins'] text-2xl font-bold m-0">Contact Support</h2>
                  <button 
                    className="bg-white/10 border-none text-white w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 flex-shrink-0 hover:bg-white/20" 
                    onClick={() => setShowContactModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-5">
                    <label className="block text-white/80 font-['Poppins'] text-sm font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={contactForm.name} 
                      onChange={handleInputChange} 
                      placeholder="Your full name" 
                      required 
                      disabled={submitStatus === 'sending'} 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-['Poppins'] text-sm transition-all duration-300 box-border focus:outline-none focus:border-[#10b981] focus:bg-white/8 placeholder:text-white/40 disabled:opacity-60 disabled:cursor-not-allowed" 
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-white/80 font-['Poppins'] text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={contactForm.email} 
                      onChange={handleInputChange} 
                      placeholder="your.email@example.com" 
                      required 
                      disabled={submitStatus === 'sending'} 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-['Poppins'] text-sm transition-all duration-300 box-border focus:outline-none focus:border-[#10b981] focus:bg-white/8 placeholder:text-white/40 disabled:opacity-60 disabled:cursor-not-allowed" 
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-white/80 font-['Poppins'] text-sm font-medium mb-2">Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={contactForm.subject} 
                      onChange={handleInputChange} 
                      placeholder="Brief description of your issue" 
                      required 
                      disabled={submitStatus === 'sending'} 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-['Poppins'] text-sm transition-all duration-300 box-border focus:outline-none focus:border-[#10b981] focus:bg-white/8 placeholder:text-white/40 disabled:opacity-60 disabled:cursor-not-allowed" 
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-white/80 font-['Poppins'] text-sm font-medium mb-2">Message</label>
                    <textarea 
                      name="message" 
                      value={contactForm.message} 
                      onChange={handleInputChange} 
                      placeholder="Describe your issue in detail..." 
                      rows="5" 
                      required 
                      disabled={submitStatus === 'sending'} 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-['Poppins'] text-sm transition-all duration-300 box-border resize-vertical min-h-[120px] focus:outline-none focus:border-[#10b981] focus:bg-white/8 placeholder:text-white/40 disabled:opacity-60 disabled:cursor-not-allowed" 
                    />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button 
                      type="button" 
                      className="flex-1 px-6 py-3 rounded-lg font-['Poppins'] text-sm font-semibold cursor-pointer transition-all duration-300 border-none bg-white/10 text-white border border-white/10 hover:bg-white/15 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none" 
                      onClick={() => setShowContactModal(false)} 
                      disabled={submitStatus === 'sending'}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 px-6 py-3 rounded-lg font-['Poppins'] text-sm font-semibold cursor-pointer transition-all duration-300 border-none flex items-center justify-center gap-2 bg-gradient-to-br from-[#10b981] to-[#3b82f6] text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none" 
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
