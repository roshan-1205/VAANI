import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Upload, Send, X } from 'lucide-react';
import './ReportIssue.css';

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
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="report-issue-page">
        <motion.div
          className="success-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="success-icon">
            <svg viewBox="0 0 50 50" fill="none">
              <circle cx="25" cy="25" r="25" fill="#10b981" />
              <path d="M15 25L22 32L35 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Issue Reported Successfully!</h2>
          <p>Your issue has been submitted. Our team will review it shortly.</p>
          <p className="reference-number">Reference: #ISS-{Math.floor(Math.random() * 10000)}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="report-issue-page">
      <motion.div
        className="report-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-icon">
          <AlertCircle size={32} />
        </div>
        <div>
          <h1>Report an Issue</h1>
          <p>Submit a new service request or report a problem</p>
        </div>
      </motion.div>

      <motion.form
        className="report-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="form-grid">
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="">Select a category</option>
              <option value="healthcare">Healthcare</option>
              <option value="legal">Legal Aid</option>
              <option value="education">Education</option>
              <option value="welfare">Welfare Services</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority *</label>
            <select name="priority" value={formData.priority} onChange={handleInputChange} required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Issue Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Brief description of the issue"
            required
          />
        </div>

        <div className="form-group">
          <label>Detailed Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide detailed information about the issue..."
            rows="6"
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Where did this issue occur?"
          />
        </div>

        <div className="form-group">
          <label>Preferred Contact Method *</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={formData.contactMethod === 'email'}
                onChange={handleInputChange}
              />
              <span>Email</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={formData.contactMethod === 'phone'}
                onChange={handleInputChange}
              />
              <span>Phone</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="contactMethod"
                value="sms"
                checked={formData.contactMethod === 'sms'}
                onChange={handleInputChange}
              />
              <span>SMS</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Attachments</label>
          <div className="upload-area">
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="upload-label">
              <Upload size={24} />
              <span>Click to upload files or drag and drop</span>
              <span className="upload-hint">PDF, PNG, JPG up to 10MB</span>
            </label>
          </div>
          
          {attachments.length > 0 && (
            <div className="attachments-list">
              {attachments.map((file, index) => (
                <div key={index} className="attachment-item">
                  <span>{file.name}</span>
                  <button type="button" onClick={() => removeAttachment(index)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          <Send size={18} />
          Submit Issue
        </button>
      </motion.form>
    </div>
  );
};

export default ReportIssue;
