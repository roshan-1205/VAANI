import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, GraduationCap, Scale, HandHeart, TrendingUp, Users, Clock, Phone, X, Plus, Edit2, Trash2, BarChart3, Activity } from 'lucide-react';
import './Services.css';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Healthcare',
      icon: Heart,
      color: '#3b82f6',
      description: 'Medical assistance and health services',
      stats: { users: 3420, calls: 8234, satisfaction: 92, avgTime: '1.8s' },
      trend: '+12%',
      details: {
        activeVolunteers: 45,
        resolvedIssues: 7890,
        pendingIssues: 344,
        avgResponseTime: '1.8s',
        peakHours: '10 AM - 2 PM',
        topIssues: ['Medical Consultation', 'Prescription Help', 'Emergency Services']
      }
    },
    {
      id: 2,
      name: 'Education',
      icon: GraduationCap,
      color: '#10b981',
      description: 'Educational schemes and support',
      stats: { users: 2890, calls: 6543, satisfaction: 88, avgTime: '2.1s' },
      trend: '+8%',
      details: {
        activeVolunteers: 38,
        resolvedIssues: 6123,
        pendingIssues: 420,
        avgResponseTime: '2.1s',
        peakHours: '9 AM - 12 PM',
        topIssues: ['Scholarship Info', 'Admission Help', 'Course Guidance']
      }
    },
    {
      id: 3,
      name: 'Legal Aid',
      icon: Scale,
      color: '#8b5cf6',
      description: 'Legal assistance and guidance',
      stats: { users: 2340, calls: 5432, satisfaction: 85, avgTime: '2.4s' },
      trend: '+15%',
      details: {
        activeVolunteers: 32,
        resolvedIssues: 5012,
        pendingIssues: 420,
        avgResponseTime: '2.4s',
        peakHours: '11 AM - 3 PM',
        topIssues: ['Legal Consultation', 'Document Help', 'Court Procedures']
      }
    },
    {
      id: 4,
      name: 'Welfare',
      icon: HandHeart,
      color: '#f59e0b',
      description: 'Social welfare programs',
      stats: { users: 2780, calls: 7123, satisfaction: 90, avgTime: '1.9s' },
      trend: '+10%',
      details: {
        activeVolunteers: 42,
        resolvedIssues: 6789,
        pendingIssues: 334,
        avgResponseTime: '1.9s',
        peakHours: '10 AM - 1 PM',
        topIssues: ['Pension Schemes', 'Subsidy Info', 'Welfare Programs']
      }
    }
  ]);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    color: '#3b82f6'
  });

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  const handleAddService = (e) => {
    e.preventDefault();
    
    const iconOptions = [Heart, GraduationCap, Scale, HandHeart];
    const randomIcon = iconOptions[Math.floor(Math.random() * iconOptions.length)];
    
    const service = {
      id: services.length + 1,
      name: newService.name,
      icon: randomIcon,
      color: newService.color,
      description: newService.description,
      stats: { users: 0, calls: 0, satisfaction: 0, avgTime: '0s' },
      trend: '+0%',
      details: {
        activeVolunteers: 0,
        resolvedIssues: 0,
        pendingIssues: 0,
        avgResponseTime: '0s',
        peakHours: 'N/A',
        topIssues: []
      }
    };

    setServices([...services, service]);
    setShowAddServiceModal(false);
    setNewService({ name: '', description: '', color: '#3b82f6' });
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== serviceId));
      setShowDetailsModal(false);
    }
  };

  const totalUsers = services.reduce((sum, s) => sum + s.stats.users, 0);
  const totalCalls = services.reduce((sum, s) => sum + s.stats.calls, 0);
  const avgSatisfaction = Math.round(services.reduce((sum, s) => sum + s.stats.satisfaction, 0) / services.length);

  return (
    <div className="services-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Services</h1>
          <p>Manage and monitor service categories</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddServiceModal(true)}>
          <Plus size={18} />
          Add Service
        </button>
      </motion.div>

      {/* Overview Stats */}
      <div className="overview-stats">
        <motion.div
          className="overview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="overview-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="overview-value">{totalUsers.toLocaleString()}</div>
            <div className="overview-label">Total Users</div>
          </div>
        </motion.div>

        <motion.div
          className="overview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="overview-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
            <Phone size={24} />
          </div>
          <div>
            <div className="overview-value">{totalCalls.toLocaleString()}</div>
            <div className="overview-label">Total Calls</div>
          </div>
        </motion.div>

        <motion.div
          className="overview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="overview-icon" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
            <Heart size={24} />
          </div>
          <div>
            <div className="overview-value">{avgSatisfaction}%</div>
            <div className="overview-label">Avg Satisfaction</div>
          </div>
        </motion.div>

        <motion.div
          className="overview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overview-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
            <Activity size={24} />
          </div>
          <div>
            <div className="overview-value">{services.length}</div>
            <div className="overview-label">Active Services</div>
          </div>
        </motion.div>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="service-header">
              <div className="service-icon" style={{ background: `${service.color}20`, color: service.color }}>
                <service.icon size={32} />
              </div>
              <div className="service-trend" style={{ color: service.color }}>
                <TrendingUp size={16} />
                {service.trend}
              </div>
            </div>
            
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            
            <div className="service-stats-grid">
              <div className="service-stat">
                <Users size={18} />
                <div>
                  <span className="stat-value">{service.stats.users.toLocaleString()}</span>
                  <span className="stat-label">Users</span>
                </div>
              </div>
              
              <div className="service-stat">
                <Phone size={18} />
                <div>
                  <span className="stat-value">{service.stats.calls.toLocaleString()}</span>
                  <span className="stat-label">Calls</span>
                </div>
              </div>
              
              <div className="service-stat">
                <Heart size={18} />
                <div>
                  <span className="stat-value">{service.stats.satisfaction}%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
              
              <div className="service-stat">
                <Clock size={18} />
                <div>
                  <span className="stat-value">{service.stats.avgTime}</span>
                  <span className="stat-label">Avg Time</span>
                </div>
              </div>
            </div>
            
            <button 
              className="service-btn" 
              style={{ background: service.color }}
              onClick={() => handleViewDetails(service)}
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedService && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              className="modal service-details-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title-group">
                  <div 
                    className="service-icon-large" 
                    style={{ background: `${selectedService.color}20`, color: selectedService.color }}
                  >
                    <selectedService.icon size={32} />
                  </div>
                  <div>
                    <h2>{selectedService.name}</h2>
                    <p>{selectedService.description}</p>
                  </div>
                </div>
                <button className="modal-close" onClick={() => setShowDetailsModal(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="service-details-content">
                <div className="details-section">
                  <h4>Performance Metrics</h4>
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <Users size={20} style={{ color: selectedService.color }} />
                      <div>
                        <span className="metric-value">{selectedService.stats.users.toLocaleString()}</span>
                        <span className="metric-label">Total Users</span>
                      </div>
                    </div>
                    <div className="metric-item">
                      <Phone size={20} style={{ color: selectedService.color }} />
                      <div>
                        <span className="metric-value">{selectedService.stats.calls.toLocaleString()}</span>
                        <span className="metric-label">Total Calls</span>
                      </div>
                    </div>
                    <div className="metric-item">
                      <Heart size={20} style={{ color: selectedService.color }} />
                      <div>
                        <span className="metric-value">{selectedService.stats.satisfaction}%</span>
                        <span className="metric-label">Satisfaction Rate</span>
                      </div>
                    </div>
                    <div className="metric-item">
                      <Clock size={20} style={{ color: selectedService.color }} />
                      <div>
                        <span className="metric-value">{selectedService.stats.avgTime}</span>
                        <span className="metric-label">Avg Response Time</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Service Details</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Active Volunteers</label>
                      <span>{selectedService.details.activeVolunteers}</span>
                    </div>
                    <div className="info-item">
                      <label>Resolved Issues</label>
                      <span>{selectedService.details.resolvedIssues.toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                      <label>Pending Issues</label>
                      <span>{selectedService.details.pendingIssues}</span>
                    </div>
                    <div className="info-item">
                      <label>Peak Hours</label>
                      <span>{selectedService.details.peakHours}</span>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Top Issues</h4>
                  <div className="issues-list">
                    {selectedService.details.topIssues.map((issue, index) => (
                      <div key={index} className="issue-item">
                        <span className="issue-number">{index + 1}</span>
                        <span className="issue-name">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn-danger"
                    onClick={() => handleDeleteService(selectedService.id)}
                  >
                    <Trash2 size={18} />
                    Delete Service
                  </button>
                  <button className="btn-submit" style={{ background: selectedService.color }}>
                    <Edit2 size={18} />
                    Edit Service
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Service Modal */}
      <AnimatePresence>
        {showAddServiceModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddServiceModal(false)}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Add New Service</h2>
                <button className="modal-close" onClick={() => setShowAddServiceModal(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleAddService}>
                <div className="form-group">
                  <label>Service Name</label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="Enter service name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Enter service description"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Color Theme</label>
                  <div className="color-picker">
                    {['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'].map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`color-option ${newService.color === color ? 'selected' : ''}`}
                        style={{ background: color }}
                        onClick={() => setNewService({ ...newService, color })}
                      />
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowAddServiceModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    <Plus size={18} />
                    Add Service
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
