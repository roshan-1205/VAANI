import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, UserPlus, MoreVertical, Mail, Phone, MapPin, X, Edit2, Trash2, Eye, ChevronDown, Check } from 'lucide-react';


const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [users, setUsers] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh.k@example.com', phone: '+91 98765 43210', location: 'Delhi', status: 'Active', calls: 45, lastActive: '2 hours ago', avatar: 'R', color: '#3b82f6' },
    { id: 2, name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 98765 43211', location: 'Mumbai', status: 'Active', calls: 32, lastActive: '5 hours ago', avatar: 'P', color: '#8b5cf6' },
    { id: 3, name: 'Amit Patel', email: 'amit.p@example.com', phone: '+91 98765 43212', location: 'Ahmedabad', status: 'Inactive', calls: 28, lastActive: '2 days ago', avatar: 'A', color: '#10b981' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha.r@example.com', phone: '+91 98765 43213', location: 'Hyderabad', status: 'Active', calls: 51, lastActive: '1 hour ago', avatar: 'S', color: '#f59e0b' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.s@example.com', phone: '+91 98765 43214', location: 'Jaipur', status: 'Active', calls: 38, lastActive: '3 hours ago', avatar: 'V', color: '#ef4444' },
    { id: 6, name: 'Anjali Gupta', email: 'anjali.g@example.com', phone: '+91 98765 43215', location: 'Kolkata', status: 'Active', calls: 42, lastActive: '4 hours ago', avatar: 'A', color: '#06b6d4' },
    { id: 7, name: 'Rahul Verma', email: 'rahul.v@example.com', phone: '+91 98765 43216', location: 'Bangalore', status: 'Inactive', calls: 19, lastActive: '1 week ago', avatar: 'R', color: '#8b5cf6' },
    { id: 8, name: 'Deepika Nair', email: 'deepika.n@example.com', phone: '+91 98765 43217', location: 'Chennai', status: 'Active', calls: 47, lastActive: '30 min ago', avatar: 'D', color: '#10b981' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'Active'
  });

  const stats = [
    { label: 'Total Users', value: users.length.toString(), change: '+12%', color: '#3b82f6' },
    { label: 'Active Today', value: users.filter(u => u.status === 'Active').length.toString(), change: '+8%', color: '#10b981' },
    { label: 'New This Week', value: '342', change: '+24%', color: '#8b5cf6' },
    { label: 'Avg Calls/User', value: '3.8', change: '+5%', color: '#f59e0b' }
  ];

  // Get unique locations for filter
  const locations = ['all', ...new Set(users.map(u => u.location))];

  // Filter and sort users
  let filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesLocation = filterLocation === 'all' || user.location === filterLocation;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Sort users
  filteredUsers.sort((a, b) => {
    let aVal, bVal;
    
    switch(sortBy) {
      case 'name':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'calls':
        aVal = a.calls;
        bVal = b.calls;
        break;
      case 'location':
        aVal = a.location.toLowerCase();
        bVal = b.location.toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleExport = () => {
    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Location', 'Status', 'Calls', 'Last Active'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => 
        [user.id, user.name, user.email, user.phone, user.location, user.status, user.calls, user.lastActive].join(',')
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `users-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      location: newUser.location,
      status: newUser.status,
      calls: 0,
      lastActive: 'Just now',
      avatar: newUser.name.charAt(0).toUpperCase(),
      color: randomColor
    };

    setUsers([...users, user]);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', phone: '', location: '', status: 'Active' });
  };

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
      setActiveDropdown(null);
      setShowFilterMenu(false);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
    setActiveDropdown(null);
    setShowFilterMenu(false);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setFilterStatus('all');
    setFilterLocation('all');
    setSearchTerm('');
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      const isFilterButton = target.closest('.btn-filter');
      const isFilterMenu = target.closest('.filter-menu');
      const isDropdownButton = target.closest('.btn-more');
      const isDropdownMenu = target.closest('.dropdown-menu');

      if (!isFilterButton && !isFilterMenu) {
        setShowFilterMenu(false);
      }
      
      if (!isDropdownButton && !isDropdownMenu) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="users-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Users</h1>
          <p>Manage and monitor user accounts</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleExport}>
            <Download size={18} />
            Export
          </button>
          <button className="btn-primary" onClick={() => setShowAddUserModal(true)}>
            <UserPlus size={18} />
            Add User
          </button>
        </div>
      </motion.div>

      <div className="users-stats">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-change">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="users-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="table-header">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <button 
              className={`btn-filter ${showFilterMenu ? 'active' : ''}`}
              onClick={() => {
                setShowFilterMenu(!showFilterMenu);
                setActiveDropdown(null); // Close any open dropdown
              }}
            >
              <Filter size={18} />
              Filter
              {(filterStatus !== 'all' || filterLocation !== 'all') && (
                <span className="filter-badge"></span>
              )}
            </button>
            
            <AnimatePresence>
              {showFilterMenu && (
                <motion.div
                  className="filter-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="filter-section">
                    <label>Status</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div className="filter-section">
                    <label>Location</label>
                    <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>
                          {loc === 'all' ? 'All Locations' : loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button className="btn-clear-filters" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="sortable">
                  User
                  {sortBy === 'name' && (
                    <ChevronDown 
                      size={14} 
                      className={`sort-icon ${sortOrder === 'desc' ? 'rotated' : ''}`}
                    />
                  )}
                </th>
                <th>Contact</th>
                <th onClick={() => handleSort('location')} className="sortable">
                  Location
                  {sortBy === 'location' && (
                    <ChevronDown 
                      size={14} 
                      className={`sort-icon ${sortOrder === 'desc' ? 'rotated' : ''}`}
                    />
                  )}
                </th>
                <th>Status</th>
                <th onClick={() => handleSort('calls')} className="sortable">
                  Calls
                  {sortBy === 'calls' && (
                    <ChevronDown 
                      size={14} 
                      className={`sort-icon ${sortOrder === 'desc' ? 'rotated' : ''}`}
                    />
                  )}
                </th>
                <th>Last Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar" style={{ background: user.color }}>
                        {user.avatar}
                      </div>
                      <div className="user-info">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-item">
                        <Mail size={14} />
                        {user.email}
                      </div>
                      <div className="contact-item">
                        <Phone size={14} />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="location-cell">
                      <MapPin size={14} />
                      {user.location}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <span className="calls-count">{user.calls}</span>
                  </td>
                  <td>
                    <span className="last-active">{user.lastActive}</span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button 
                        className="btn-more"
                        onClick={() => {
                          setActiveDropdown(activeDropdown === user.id ? null : user.id);
                          setShowFilterMenu(false); // Close filter menu
                        }}
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === user.id && (
                          <motion.div
                            className="dropdown-menu"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.15 }}
                          >
                            <button onClick={() => handleViewUser(user)}>
                              <Eye size={16} />
                              View Details
                            </button>
                            <button>
                              <Edit2 size={16} />
                              Edit User
                            </button>
                            <button 
                              className="danger"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 size={16} />
                              Delete User
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* User Details Modal */}
      <AnimatePresence>
        {showUserDetails && selectedUser && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUserDetails(false)}
          >
            <motion.div
              className="modal user-details-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>User Details</h2>
                <button className="modal-close" onClick={() => setShowUserDetails(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="user-details-content">
                <div className="user-details-header">
                  <div className="user-avatar-large" style={{ background: selectedUser.color }}>
                    {selectedUser.avatar}
                  </div>
                  <div className="user-details-info">
                    <h3>{selectedUser.name}</h3>
                    <span className={`status-badge ${selectedUser.status.toLowerCase()}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
                
                <div className="details-grid">
                  <div className="detail-item">
                    <Mail size={18} />
                    <div>
                      <label>Email</label>
                      <span>{selectedUser.email}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <Phone size={18} />
                    <div>
                      <label>Phone</label>
                      <span>{selectedUser.phone}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <MapPin size={18} />
                    <div>
                      <label>Location</label>
                      <span>{selectedUser.location}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <Phone size={18} />
                    <div>
                      <label>Total Calls</label>
                      <span className="calls-highlight">{selectedUser.calls}</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Activity</h4>
                  <p>Last active: {selectedUser.lastActive}</p>
                </div>
                
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setShowUserDetails(false)}>
                    Close
                  </button>
                  <button className="btn-submit">
                    <Edit2 size={18} />
                    Edit User
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddUserModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddUserModal(false)}
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
                <h2>Add New User</h2>
                <button className="modal-close" onClick={() => setShowAddUserModal(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleAddUser}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="user@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newUser.location}
                    onChange={handleInputChange}
                    placeholder="City name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={newUser.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowAddUserModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    <UserPlus size={18} />
                    Add User
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

export default Users;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
.users-page { padding: 32px; background: #0a1628; min-height: calc(100vh - 80px); }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
.page-header h1 { font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 700; color: white; margin: 0 0 8px 0; }
.page-header p { font-family: 'Poppins', sans-serif; font-size: 14px; color: rgba(255, 255, 255, 0.6); margin: 0; }
.header-actions { display: flex; gap: 12px; }
.btn-primary, .btn-secondary { display: flex; align-items: center; gap: 8px; padding: 12px 24px; border: none; border-radius: 12px; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.btn-primary { background: #10b981; color: white; }
.btn-primary:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3); }
.btn-secondary { background: rgba(255, 255, 255, 0.1); color: white; }
.btn-secondary:hover { background: rgba(255, 255, 255, 0.15); transform: translateY(-2px); }

.users-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
@media (max-width: 1024px) { .users-stats { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .users-stats { grid-template-columns: 1fr; } }
.stat-card { background: #01070f; padding: 24px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); }
.stat-value { font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
.stat-label { font-family: 'Poppins', sans-serif; font-size: 14px; color: rgba(255, 255, 255, 0.6); margin-bottom: 8px; }
.stat-change { font-family: 'Poppins', sans-serif; font-size: 13px; color: #10b981; font-weight: 600; }

.users-table-container { background: #01070f; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden; }
.table-header { display: flex; justify-content: space-between; align-items: center; padding: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); gap: 16px; flex-wrap: wrap; }
.search-box { display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.05); padding: 12px 16px; border-radius: 12px; flex: 1; min-width: 250px; border: 1px solid rgba(255, 255, 255, 0.1); }
.search-box svg { color: rgba(255, 255, 255, 0.5); flex-shrink: 0; }
.search-box input { background: transparent; border: none; outline: none; color: white; font-family: 'Poppins', sans-serif; font-size: 14px; width: 100%; }
.search-box input::placeholder { color: rgba(255, 255, 255, 0.4); }

.filter-controls { position: relative; }
.btn-filter { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; color: white; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; position: relative; }
.btn-filter:hover, .btn-filter.active { background: rgba(255, 255, 255, 0.1); }
.filter-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #10b981; border-radius: 50%; }
.filter-menu { position: absolute; top: calc(100% + 8px); right: 0; background: #01070f; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; min-width: 250px; z-index: 100; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
.filter-section { margin-bottom: 16px; }
.filter-section:last-of-type { margin-bottom: 12px; }
.filter-section label { display: block; font-family: 'Poppins', sans-serif; font-size: 13px; color: rgba(255, 255, 255, 0.7); margin-bottom: 8px; font-weight: 500; }
.filter-section select { width: 100%; padding: 10px 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-family: 'Poppins', sans-serif; font-size: 14px; cursor: pointer; }
.filter-section select option { background: #01070f; }
.btn-clear-filters { width: 100%; padding: 10px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; color: #ef4444; font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; }
.btn-clear-filters:hover { background: rgba(239, 68, 68, 0.2); }

.users-table { overflow-x: auto; }
.users-table table { width: 100%; border-collapse: collapse; }
.users-table thead { background: rgba(255, 255, 255, 0.03); }
.users-table th { padding: 16px 24px; text-align: left; font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
.users-table th.sortable { cursor: pointer; user-select: none; position: relative; }
.users-table th.sortable:hover { color: white; }
.sort-icon { display: inline-block; margin-left: 4px; transition: transform 0.3s ease; }
.sort-icon.rotated { transform: rotate(180deg); }
.users-table tbody tr { border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.2s ease; }
.users-table tbody tr:hover { background: rgba(255, 255, 255, 0.03); }
.users-table td { padding: 20px 24px; font-family: 'Poppins', sans-serif; font-size: 14px; color: rgba(255, 255, 255, 0.9); }

.user-cell { display: flex; align-items: center; gap: 12px; }
.user-avatar { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px; flex-shrink: 0; }
.user-info { display: flex; flex-direction: column; gap: 4px; }
.user-name { font-weight: 600; color: white; }
.user-email { font-size: 13px; color: rgba(255, 255, 255, 0.5); }

.contact-cell { display: flex; flex-direction: column; gap: 6px; }
.contact-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255, 255, 255, 0.7); }
.contact-item svg { color: rgba(255, 255, 255, 0.4); flex-shrink: 0; }

.location-cell { display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.7); }
.location-cell svg { color: rgba(255, 255, 255, 0.4); }

.status-badge { padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: capitalize; }
.status-badge.active { background: rgba(16, 185, 129, 0.2); color: #10b981; }
.status-badge.inactive { background: rgba(239, 68, 68, 0.2); color: #ef4444; }

.calls-count { font-weight: 600; color: #8b5cf6; }
.last-active { color: rgba(255, 255, 255, 0.5); font-size: 13px; }

.actions-cell { position: relative; }
.btn-more { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.05); border: none; border-radius: 8px; color: rgba(255, 255, 255, 0.7); cursor: pointer; transition: all 0.2s ease; }
.btn-more:hover { background: rgba(255, 255, 255, 0.1); color: white; }
.dropdown-menu { position: absolute; top: calc(100% + 4px); right: 0; background: #01070f; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px; min-width: 180px; z-index: 100; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
.dropdown-menu button { width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: transparent; border: none; border-radius: 8px; color: white; font-family: 'Poppins', sans-serif; font-size: 14px; text-align: left; cursor: pointer; transition: all 0.2s ease; }
.dropdown-menu button:hover { background: rgba(255, 255, 255, 0.05); }
.dropdown-menu button.danger { color: #ef4444; }
.dropdown-menu button.danger:hover { background: rgba(239, 68, 68, 0.1); }

.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.modal { background: #01070f; border-radius: 20px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; border: 1px solid rgba(255, 255, 255, 0.1); }
.user-details-modal { max-width: 600px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.modal-header h2 { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0; }
.modal-close { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.05); border: none; border-radius: 10px; color: rgba(255, 255, 255, 0.7); cursor: pointer; transition: all 0.2s ease; }
.modal-close:hover { background: rgba(255, 255, 255, 0.1); color: white; }

.user-details-content { padding: 24px; }
.user-details-header { display: flex; align-items: center; gap: 20px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.user-avatar-large { width: 80px; height: 80px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 32px; flex-shrink: 0; }
.user-details-info h3 { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 12px 0; }
.details-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px; }
@media (max-width: 640px) { .details-grid { grid-template-columns: 1fr; } }
.detail-item { display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: rgba(255, 255, 255, 0.03); border-radius: 12px; }
.detail-item svg { color: #8b5cf6; margin-top: 2px; flex-shrink: 0; }
.detail-item label { display: block; font-family: 'Poppins', sans-serif; font-size: 12px; color: rgba(255, 255, 255, 0.5); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.detail-item span { font-family: 'Poppins', sans-serif; font-size: 14px; color: white; font-weight: 500; }
.calls-highlight { color: #8b5cf6; font-weight: 700; font-size: 18px; }
.detail-section { margin-bottom: 24px; padding: 16px; background: rgba(255, 255, 255, 0.03); border-radius: 12px; }
.detail-section h4 { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 600; color: white; margin: 0 0 8px 0; }
.detail-section p { font-family: 'Poppins', sans-serif; font-size: 14px; color: rgba(255, 255, 255, 0.7); margin: 0; }

.modal form { padding: 24px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: white; margin-bottom: 8px; }
.form-group input, .form-group select { width: 100%; padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; color: white; font-family: 'Poppins', sans-serif; font-size: 14px; transition: all 0.3s ease; }
.form-group input:focus, .form-group select:focus { outline: none; border-color: #10b981; background: rgba(255, 255, 255, 0.08); }
.form-group select { cursor: pointer; }
.form-group select option { background: #01070f; }

.modal-actions { display: flex; gap: 12px; padding: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
.btn-cancel, .btn-submit { flex: 1; padding: 12px 24px; border: none; border-radius: 12px; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-cancel { background: rgba(255, 255, 255, 0.05); color: white; }
.btn-cancel:hover { background: rgba(255, 255, 255, 0.1); }
.btn-submit { background: #10b981; color: white; }
.btn-submit:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3); }

@media (max-width: 768px) {
  .users-page { padding: 16px; }
  .page-header { flex-direction: column; gap: 16px; }
  .header-actions { width: 100%; }
  .header-actions button { flex: 1; justify-content: center; }
  .table-header { flex-direction: column; align-items: stretch; }
  .search-box { min-width: 100%; }
  .users-table { font-size: 12px; }
  .users-table th, .users-table td { padding: 12px 16px; }
  .user-cell { flex-direction: column; align-items: flex-start; }
  .modal-actions { flex-direction: column; }
  .btn-cancel, .btn-submit { width: 100%; }
}
`;
if (!document.getElementById('users-styles')) {
  styleSheet.id = 'users-styles';
  document.head.appendChild(styleSheet);
}