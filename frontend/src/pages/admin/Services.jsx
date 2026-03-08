import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, GraduationCap, Scale, HandHeart, TrendingUp, Users, Clock, Phone, X, Plus, Edit2, Trash2, BarChart3, Activity } from 'lucide-react';

const Services = () => {
  // Inject CSS
  useEffect(() => {
    const styleId = 'services-page-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .services-page { padding: 32px; max-width: 1400px; margin: 0 auto; background: #e2e2e2; min-height: 100vh; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .page-header h1 { color: black; font-size: 32px; font-weight: 700; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
        .page-header p { color: rgba(0, 0, 0, 0.6); font-size: 14px; }
        .btn-primary { display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-primary:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); }
        .overview-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
        .overview-card { background: #01070f; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); }
        .overview-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .overview-value { color: white; font-size: 28px; font-weight: 700; font-family: 'Montserrat', sans-serif; margin-bottom: 4px; }
        .overview-label { color: rgba(255, 255, 255, 0.6); font-size: 13px; }
        .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .service-card { background: #01070f; padding: 32px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); }
        .service-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .service-icon { width: 64px; height: 64px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .service-trend { display: flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 600; }
        .service-card h3 { color: white; font-size: 24px; font-weight: 700; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
        .service-card p { color: rgba(255, 255, 255, 0.6); font-size: 14px; margin-bottom: 24px; }
        .service-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
        .service-stat { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; transition: background 0.3s ease; }
        .service-stat:hover { background: rgba(255, 255, 255, 0.08); }
        .service-stat svg { color: rgba(255, 255, 255, 0.5); flex-shrink: 0; }
        .service-stat div { display: flex; flex-direction: column; gap: 2px; }
        .stat-value { color: white; font-size: 18px; font-weight: 700; font-family: 'Montserrat', sans-serif; }
        .stat-label { color: rgba(255, 255, 255, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
        .service-btn { width: 100%; padding: 12px; border: none; border-radius: 8px; color: white; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .service-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: #0a1628; border-radius: 16px; padding: 32px; width: 90%; max-width: 500px; z-index: 1001; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); max-height: 90vh; overflow-y: auto; }
        .service-details-modal { max-width: 700px; }
        .modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .modal-title-group { display: flex; align-items: center; gap: 16px; flex: 1; }
        .service-icon-large { width: 64px; height: 64px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .modal-header h2 { color: white; font-size: 24px; font-weight: 700; margin: 0 0 4px 0; font-family: 'Montserrat', sans-serif; }
        .modal-header p { color: rgba(255, 255, 255, 0.6); font-size: 14px; margin: 0; }
        .modal-close { background: rgba(255, 255, 255, 0.1); border: none; color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; flex-shrink: 0; }
        .modal-close:hover { background: rgba(255, 255, 255, 0.2); }
        .service-details-content { display: flex; flex-direction: column; gap: 24px; }
        .details-section { padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; }
        .details-section h4 { color: white; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'Montserrat', sans-serif; }
        .metrics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .metric-item { display: flex; align-items: center; gap: 12px; padding: 16px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; }
        .metric-item svg { flex-shrink: 0; }
        .metric-value { display: block; color: white; font-size: 20px; font-weight: 700; font-family: 'Montserrat', sans-serif; margin-bottom: 4px; }
        .metric-label { display: block; color: rgba(255, 255, 255, 0.5); font-size: 12px; }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .info-item { display: flex; flex-direction: column; gap: 6px; }
        .info-item label { color: rgba(255, 255, 255, 0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-item span { color: white; font-size: 16px; font-weight: 600; }
        .issues-list { display: flex; flex-direction: column; gap: 12px; }
        .issue-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; }
        .issue-number { width: 28px; height: 28px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; color: white; font-size: 13px; font-weight: 600; flex-shrink: 0; }
        .issue-name { color: white; font-size: 14px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; color: rgba(255, 255, 255, 0.8); font-size: 14px; font-weight: 500; margin-bottom: 8px; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-size: 14px; transition: all 0.3s ease; box-sizing: border-box; font-family: inherit; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #3b82f6; background: rgba(255, 255, 255, 0.08); }
        .form-group input::placeholder, .form-group textarea::placeholder { color: rgba(255, 255, 255, 0.4); }
        .form-group textarea { resize: vertical; min-height: 80px; }
        .color-picker { display: flex; gap: 12px; }
        .color-option { width: 40px; height: 40px; border-radius: 8px; border: 2px solid transparent; cursor: pointer; transition: all 0.2s ease; }
        .color-option:hover { transform: scale(1.1); }
        .color-option.selected { border-color: white; box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2); }
        .modal-actions { display: flex; gap: 12px; margin-top: 8px; }
        .btn-cancel, .btn-submit, .btn-danger { flex: 1; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-cancel { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.1); }
        .btn-cancel:hover { background: rgba(255, 255, 255, 0.15); }
        .btn-submit { background: #3b82f6; color: white; }
        .btn-submit:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); }
        .btn-danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .btn-danger:hover { background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.5); }
        @media (max-width: 1200px) { .overview-stats { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .services-page { padding: 16px; }
          .page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .btn-primary { width: 100%; justify-content: center; }
          .overview-stats { grid-template-columns: 1fr; }
          .services-grid { grid-template-columns: 1fr; }
          .metrics-grid, .info-grid { grid-template-columns: 1fr; }
          .modal-title-group { flex-direction: column; align-items: flex-start; }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);
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
