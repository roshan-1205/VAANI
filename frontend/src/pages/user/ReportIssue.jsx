import { useState } from 'react';
import { AlertCircle, Upload, Send, X, CheckCircle2 } from 'lucide-react';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    category: '',
    priority: 'medium',
    title: '',
    description: '',
    location: '',
    contactMethod: 'email'
  });
  
  const [attachments, setAttachments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const refNum = `ISS-${Math.floor(Math.random() * 10000)}`;
    setReferenceNumber(refNum);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        category: '',
        priority: 'medium',
        title: '',
        description: '',
        location: '',
        contactMethod: 'email'
      });
      setAttachments([]);
      setReferenceNumber('');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="p-8 min-h-screen max-w-[900px] mx-auto bg-white">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-[100px] h-[100px] mb-6 bg-[#10b981] rounded-full flex items-center justify-center">
            <CheckCircle2 size={60} className="text-white" />
          </div>
          <h2 className="font-['Poppins'] text-[32px] font-bold text-[#01070f] m-0 mb-3">Issue Reported Successfully!</h2>
          <p className="font-['Poppins'] text-base text-[#6b7280] m-0 mb-2">Your issue has been submitted. Our team will review it shortly.</p>
          <div className="mt-6 px-6 py-3 bg-[#8b5cf6]/10 rounded-xl">
            <p className="font-['Poppins'] text-sm text-[#6b7280] m-0 mb-1">Reference Number</p>
            <p className="font-['Poppins'] text-2xl font-bold text-[#8b5cf6] m-0">#{referenceNumber}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen max-w-[900px] mx-auto bg-white">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-[#01070f] rounded-2xl flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <AlertCircle size={32} />
        </div>
        <div>
          <h1 className="font-['Poppins'] text-[32px] font-bold text-[#01070f] m-0 mb-1">Report an Issue</h1>
          <p className="font-['Poppins'] text-sm text-[#6b7280] m-0">Submit a new service request or report a problem</p>
        </div>
      </div>

      <form
        className="bg-[#01070f] rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-['Poppins'] text-sm font-semibold text-white mb-2">Category *</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleInputChange} 
              required 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-['Poppins'] text-sm transition-all duration-300 focus:outline-none focus:border-[#10b981] focus:bg-white/8 cursor-pointer"
            >
              <option value="" className="bg-[#01070f] text-white">Select a category</option>
              <option value="healthcare" className="bg-[#01070f] text-white">Healthcare</option>
              <option value="legal" className="bg-[#01070f] text-white">Legal Aid</option>
              <option value="education" className="bg-[#01070f] text-white">Education</option>
              <option value="welfare" className="bg-[#01070f] text-white">Welfare Services</option>
              <option value="infrastructure" className="bg-[#01070f] text-white">Infrastructure</option>
              <option value="other" className="bg-[#01070f] text-white">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-['Poppins'] text-sm font-semibold text-white mb-2">Priority *</label>
            <select 
              name="priority" 
              value={formData.priority} 
              onChange={handleInputChange} 
              required 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-['Poppins'] text-sm transition-all duration-300 focus:outline-none focus:border-[#10b981] focus:bg-white/8 cursor-pointer"
            >
              <option value="low" className="bg-[#01070f] text-white">Low</option>
              <option value="medium" className="bg-[#01070f] text-white">Medium</option>
              <option value="high" className="bg-[#01070f] text-white">High</option>
              <option value="urgent" className="bg-[#01070f] text-white">Urgent</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-['Poppins'] text-sm font-semibold text-white mb-2">Issue Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Brief description of the issue"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-['Poppins'] text-sm transition-all duration-300 focus:outline-none focus:border-[#10b981] focus:bg-white/8 placeholder:text-white/40"
          />
        </div>

        <div className="mb-6">
          <label className="block font-['Poppins'] text-sm font-semibold text-white mb-2">Detailed Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide detailed information about the issue..."
            rows="6"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-['Poppins'] text-sm transition-all duration-300 focus:outline-none focus:border-[#10b981] focus:bg-white/8 resize-vertical min-h-[120px] placeholder:text-white/40"
          />
        </div>

        <div className="mb-6">
          <label className="block font-['Poppins'] text-sm font-semibold text-white mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Where did this issue occur?"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-['Poppins'] text-sm transition-all duration-300 focus:outline-none focus:border-[#10b981] focus:bg-white/8 placeholder:text-white/40"
          />
        </div>

        <div className="mb-6">
          <label className="block font-['Poppins'] text-sm font-semibold text-white mb-2">Preferred Contact Method *</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer font-['Poppins'] text-sm text-white/80 hover:text-white transition-colors">
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={formData.contactMethod === 'email'}
                onChange={handleInputChange}
                className="w-4 h-4 cursor-pointer accent-[#10b981]"
              />
              <span>Email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-['Poppins'] text-sm text-white/80 hover:text-white transition-colors">
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={formData.contactMethod === 'phone'}
                onChange={handleInputChange}
                className="w-4 h-4 cursor-pointer accent-[#10b981]"
              />
              <span>Phone</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-['Poppins'] text-sm text-white/80 hover:text-white transition-colors">
              <input
                type="radio"
                name="contactMethod"
                value="sms"
                checked={formData.contactMethod === 'sms'}
                onChange={handleInputChange}
                className="w-4 h-4 cursor-pointer accent-[#10b981]"
              />
              <span>SMS</span>
            </label>
          </div>
        </div>

        <div className="mb-8">
          <label className="block font-['Poppins'] text-sm font-semibold text-white mb-2">Attachments</label>
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:border-[#10b981] hover:bg-[#10b981]/5">
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Upload size={24} className="text-white/60" />
              </div>
              <div>
                <span className="font-['Poppins'] text-[15px] font-medium text-white block mb-1">Click to upload files or drag and drop</span>
                <span className="font-['Poppins'] text-xs text-white/50">PDF, PNG, JPG up to 10MB</span>
              </div>
            </label>
          </div>
          
          {attachments.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex justify-between items-center px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-['Poppins'] text-[13px] text-white">
                  <span className="flex-1 truncate">{file.name}</span>
                  <span className="text-white/50 text-xs mx-3">{(file.size / 1024).toFixed(1)} KB</span>
                  <button 
                    type="button" 
                    onClick={() => removeAttachment(index)} 
                    className="bg-[#ef4444]/20 border-none text-[#ef4444] w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#ef4444]/30 flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-br from-[#10b981] to-[#059669] border-none rounded-xl text-white font-['Poppins'] text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)]"
        >
          <Send size={18} />
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
