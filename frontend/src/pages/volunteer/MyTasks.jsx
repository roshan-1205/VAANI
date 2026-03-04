import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle, Clock, AlertCircle, Plus, X, Calendar, User, Tag, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';

const MyTasks = () => {
  // Inject CSS
  useEffect(() => {
    const styleId = 'mytasks-page-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .my-tasks-page { padding: 32px; max-width: 1400px; margin: 0 auto; background: white; min-height: 100vh; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .page-header h1 { color: #01070f; font-size: 32px; font-weight: 700; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
        .page-header p { color: #6b7280; font-size: 14px; }
        .tasks-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px; }
        .stat-card { background: #01070f; padding: 24px; border-radius: 12px; text-align: center; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); transition: all 0.3s ease; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); }
        .stat-value { font-size: 36px; font-weight: 700; font-family: 'Montserrat', sans-serif; margin-bottom: 8px; }
        .stat-label { color: rgba(255, 255, 255, 0.6); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        .tasks-container { background: #01070f; border-radius: 12px; padding: 24px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); }
        .tasks-header { display: flex; justify-between; align-items: center; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
        .search-box { display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.05); padding: 12px 16px; border-radius: 10px; flex: 1; max-width: 400px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; }
        .search-box:focus-within { border-color: #10b981; background: rgba(255, 255, 255, 0.08); }
        .search-box svg { color: rgba(255, 255, 255, 0.5); }
        .search-box input { background: none; border: none; color: white; font-size: 14px; outline: none; flex: 1; }
        .search-box input::placeholder { color: rgba(255, 255, 255, 0.4); }
        .filter-controls { position: relative; }
        .btn-filter { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; color: white; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; position: relative; }
        .btn-filter:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2); }
        .btn-filter.active { background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; }
        .filter-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #10b981; border-radius: 50%; border: 2px solid #01070f; animation: pulse 2s infinite; }
        .filter-menu { position: absolute; top: calc(100% + 12px); right: 0; background: #0a1628; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; min-width: 280px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); z-index: 100; }
        .filter-section { margin-bottom: 20px; }
        .filter-section:last-of-type { margin-bottom: 16px; }
        .filter-section label { display: block; color: rgba(255, 255, 255, 0.7); font-size: 13px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .filter-section select { width: 100%; padding: 10px 14px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-size: 14px; cursor: pointer; transition: all 0.3s ease; }
        .filter-section select:focus { outline: none; border-color: #10b981; background: rgba(255, 255, 255, 0.08); }
        .btn-clear-filters { width: 100%; padding: 10px 14px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; color: #ef4444; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-clear-filters:hover { background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.5); }
        .tasks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .task-card { background: rgba(255, 255, 255, 0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; position: relative; overflow: hidden; }
        .task-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #10b981, #3b82f6); opacity: 0; transition: opacity 0.3s ease; }
        .task-card:hover { background: rgba(255, 255, 255, 0.06); transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); }
        .task-card:hover::before { opacity: 1; }
        .task-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .priority-badge { padding: 6px 12px; border-radius: 16px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .priority-badge.high { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .priority-badge.medium { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
        .priority-badge.low { background: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); }
        .task-actions { display: flex; align-items: center; gap: 10px; position: relative; }
        .task-due { color: rgba(255, 255, 255, 0.5); font-size: 12px; font-weight: 500; }
        .btn-more { background: rgba(255, 255, 255, 0.05); border: none; color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; }
        .btn-more:hover { background: rgba(255, 255, 255, 0.1); transform: scale(1.1); }
        .dropdown-menu { position: absolute; top: calc(100% + 8px); right: 0; background: #0a1628; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 8px; min-width: 180px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); z-index: 100; }
        .dropdown-menu button { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: none; border: none; color: white; font-size: 14px; font-weight: 500; text-align: left; cursor: pointer; border-radius: 8px; transition: all 0.2s ease; }
        .dropdown-menu button:hover { background: rgba(255, 255, 255, 0.1); }
        .dropdown-menu button.danger { color: #ef4444; }
        .dropdown-menu button.danger:hover { background: rgba(239, 68, 68, 0.1); }
        .task-card h3 { color: white; font-size: 18px; font-weight: 700; margin-bottom: 10px; font-family: 'Montserrat', sans-serif; line-height: 1.4; }
        .task-category { display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.6); font-size: 13px; margin-bottom: 20px; font-weight: 500; }
        .task-progress { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .progress-bar-small { flex: 1; height: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden; }
        .progress-fill-small { height: 100%; background: linear-gradient(90deg, #10b981, #3b82f6); border-radius: 4px; transition: width 0.5s ease; box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
        .progress-text { color: white; font-size: 13px; font-weight: 700; min-width: 45px; text-align: right; font-family: 'Montserrat', sans-serif; }
        .task-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
        .task-status { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; padding: 6px 12px; border-radius: 8px; }
        .task-status.completed { color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .task-status.progress { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .task-status.pending { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .btn-primary { display: flex; align-items: center; gap: 10px; padding: 14px 28px; background: linear-gradient(135deg, #10b981, #3b82f6); color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(16, 185, 129, 0.5); }
        .no-tasks { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; text-align: center; }
        .no-tasks svg { color: rgba(255, 255, 255, 0.2); }
        .no-tasks p { color: rgba(255, 255, 255, 0.5); font-size: 18px; margin-top: 20px; font-weight: 500; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: #0a1628; border-radius: 16px; padding: 32px; width: 90%; max-width: 500px; z-index: 1001; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); max-height: 90vh; overflow-y: auto; }
        .task-details-modal { max-width: 700px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
        .modal-header h2 { color: white; font-size: 26px; font-weight: 700; margin: 0; font-family: 'Montserrat', sans-serif; }
        .modal-close { background: rgba(255, 255, 255, 0.1); border: none; color: white; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; }
        .modal-close:hover { background: rgba(255, 255, 255, 0.2); transform: rotate(90deg); }
        .task-details-content { display: flex; flex-direction: column; gap: 24px; }
        .detail-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .status-badge { padding: 8px 16px; border-radius: 16px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-badge.completed { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .status-badge.progress { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
        .status-badge.pending { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .task-details-content h3 { color: white; font-size: 22px; font-weight: 700; margin: 0; font-family: 'Montserrat', sans-serif; line-height: 1.4; }
        .detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .detail-item { display: flex; align-items: flex-start; gap: 14px; padding: 18px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; }
        .detail-item:hover { background: rgba(255, 255, 255, 0.08); }
        .detail-item svg { color: rgba(255, 255, 255, 0.5); flex-shrink: 0; margin-top: 2px; }
        .detail-item div { display: flex; flex-direction: column; gap: 6px; }
        .detail-item label { color: rgba(255, 255, 255, 0.5); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .detail-item span { color: white; font-size: 15px; font-weight: 600; }
        .detail-section { padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1); }
        .detail-section h4 { color: white; font-size: 13px; font-weight: 700; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; }
        .detail-section p { color: rgba(255, 255, 255, 0.7); font-size: 15px; margin: 0; line-height: 1.7; }
        .form-group { margin-bottom: 24px; }
        .form-group label { display: block; color: rgba(255, 255, 255, 0.8); font-size: 14px; font-weight: 600; margin-bottom: 10px; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 14px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; color: white; font-size: 14px; transition: all 0.3s ease; box-sizing: border-box; font-family: inherit; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #10b981; background: rgba(255, 255, 255, 0.08); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
        .form-group input::placeholder, .form-group textarea::placeholder { color: rgba(255, 255, 255, 0.4); }
        .form-group textarea { resize: vertical; min-height: 120px; }
        .modal-actions { display: flex; gap: 12px; margin-top: 8px; }
        .btn-cancel, .btn-submit, .btn-secondary { flex: 1; padding: 14px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; border: none; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .btn-cancel { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.1); }
        .btn-cancel:hover { background: rgba(255, 255, 255, 0.15); }
        .btn-submit { background: linear-gradient(135deg, #10b981, #3b82f6); color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }
        .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(16, 185, 129, 0.5); }
        .btn-secondary { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); }
        .btn-secondary:hover { background: rgba(255, 255, 255, 0.15); transform: translateY(-2px); }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @media (max-width: 1200px) { .tasks-stats { grid-template-columns: repeat(2, 1fr); } .tasks-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); } }
        @media (max-width: 768px) { 
          .my-tasks-page { padding: 16px; } 
          .tasks-stats { grid-template-columns: 1fr; } 
          .tasks-header { flex-direction: column; align-items: stretch; } 
          .search-box { max-width: 100%; } 
          .tasks-grid { grid-template-columns: 1fr; } 
          .detail-grid { grid-template-columns: 1fr; } 
          .modal-actions { flex-direction: column; } 
          .btn-cancel, .btn-submit, .btn-secondary { width: 100%; } 
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

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close filter menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterMenu && !event.target.closest('.filter-controls')) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilterMenu]);
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Healthcare Support Call', category: 'Healthcare', priority: 'High', status: 'In Progress', dueDate: 'Today', progress: 60, assignedBy: 'Dr. Kumar', description: 'Assist patient with medical consultation and prescription guidance.' },
    { id: 2, title: 'Education Scheme Inquiry', category: 'Education', priority: 'Medium', status: 'Pending', dueDate: 'Tomorrow', progress: 0, assignedBy: 'Prof. Sharma', description: 'Help student understand scholarship application process.' },
    { id: 3, title: 'Legal Aid Documentation', category: 'Legal Aid', priority: 'High', status: 'In Progress', dueDate: 'Today', progress: 80, assignedBy: 'Adv. Patel', description: 'Review and verify legal documents for court submission.' },
    { id: 4, title: 'Welfare Program Registration', category: 'Welfare', priority: 'Low', status: 'Completed', dueDate: 'Yesterday', progress: 100, assignedBy: 'Mrs. Gupta', description: 'Complete registration for pension scheme application.' },
    { id: 5, title: 'Training Module Review', category: 'Training', priority: 'Medium', status: 'In Progress', dueDate: 'Tomorrow', progress: 45, assignedBy: 'Training Team', description: 'Review new training materials and provide feedback.' }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Healthcare',
    priority: 'Medium',
    dueDate: '',
    description: ''
  });

  const stats = [
    { label: 'Total Tasks', value: tasks.length.toString(), color: '#3b82f6' },
    { label: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length.toString(), color: '#f59e0b' },
    { label: 'Completed', value: tasks.filter(t => t.status === 'Completed').length.toString(), color: '#10b981' },
    { label: 'Pending', value: tasks.filter(t => t.status === 'Pending').length.toString(), color: '#ef4444' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <CheckCircle size={18} />;
      case 'In Progress': return <Clock size={18} />;
      default: return <AlertCircle size={18} />;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed': return 'completed';
      case 'In Progress': return 'progress';
      default: return 'pending';
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'Pending',
      progress: 0,
      assignedBy: 'Self-Assigned'
    };
    setTasks([...tasks, task]);
    setShowAddTaskModal(false);
    setNewTask({ title: '', category: 'Healthcare', priority: 'Medium', dueDate: '', description: '' });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== taskId));
      setActiveDropdown(null);
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
    setActiveDropdown(null);
  };

  const clearFilters = () => {
    setFilterStatus('all');
    setFilterPriority('all');
    setSearchTerm('');
  };

  return (
    <div className="my-tasks-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>My Tasks</h1>
          <p>Manage your assigned tasks and activities</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddTaskModal(true)}>
          <Plus size={18} />
          Add Task
        </button>
      </motion.div>

      <div className="tasks-stats">
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
          </motion.div>
        ))}
      </div>

      <motion.div
        className="tasks-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="tasks-header">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <button 
              className={`btn-filter ${showFilterMenu ? 'active' : ''}`}
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter size={18} />
              Filter
              {(filterStatus !== 'all' || filterPriority !== 'all') && (
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
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  
                  <div className="filter-section">
                    <label>Priority</label>
                    <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                      <option value="all">All Priorities</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
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

        <div className="tasks-grid">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              className="task-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="task-header">
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <div className="task-actions">
                  <span className="task-due">{task.dueDate}</span>
                  <button 
                    className="btn-more"
                    onClick={() => setActiveDropdown(activeDropdown === task.id ? null : task.id)}
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === task.id && (
                      <motion.div
                        className="dropdown-menu"
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      >
                        <button onClick={() => handleViewTask(task)}>
                          <Eye size={16} />
                          View Details
                        </button>
                        <button>
                          <Edit2 size={16} />
                          Edit Task
                        </button>
                        <button className="danger" onClick={() => handleDeleteTask(task.id)}>
                          <Trash2 size={16} />
                          Delete Task
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <h3>{task.title}</h3>
              <p className="task-category">
                <Tag size={14} />
                {task.category}
              </p>
              
              <div className="task-progress">
                <div className="progress-bar-small">
                  <div 
                    className="progress-fill-small" 
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{task.progress}%</span>
              </div>
              
              <div className="task-footer">
                <div className={`task-status ${getStatusClass(task.status)}`}>
                  {getStatusIcon(task.status)}
                  {task.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="no-tasks">
            <AlertCircle size={48} />
            <p>No tasks found</p>
          </div>
        )}
      </motion.div>

      {/* Task Details Modal */}
      <AnimatePresence>
        {showTaskDetails && selectedTask && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTaskDetails(false)}
          >
            <motion.div
              className="modal task-details-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Task Details</h2>
                <button className="modal-close" onClick={() => setShowTaskDetails(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="task-details-content">
                <div className="detail-row">
                  <span className={`priority-badge ${selectedTask.priority.toLowerCase()}`}>
                    {selectedTask.priority} Priority
                  </span>
                  <span className={`status-badge ${getStatusClass(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                </div>
                
                <h3>{selectedTask.title}</h3>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <Tag size={18} />
                    <div>
                      <label>Category</label>
                      <span>{selectedTask.category}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <Calendar size={18} />
                    <div>
                      <label>Due Date</label>
                      <span>{selectedTask.dueDate}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <User size={18} />
                    <div>
                      <label>Assigned By</label>
                      <span>{selectedTask.assignedBy}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <CheckCircle size={18} />
                    <div>
                      <label>Progress</label>
                      <span>{selectedTask.progress}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Description</h4>
                  <p>{selectedTask.description}</p>
                </div>
                
                <div className="modal-actions">
                  <button className="btn-secondary">
                    <Edit2 size={18} />
                    Edit Task
                  </button>
                  <button className="btn-primary">
                    <CheckCircle size={18} />
                    Mark Complete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTaskModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddTaskModal(false)}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Add New Task</h2>
                <button className="modal-close" onClick={() => setShowAddTaskModal(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleAddTask}>
                <div className="form-group">
                  <label>Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Legal Aid">Legal Aid</option>
                    <option value="Welfare">Welfare</option>
                    <option value="Training">Training</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description"
                    rows="4"
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowAddTaskModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    <Plus size={18} />
                    Add Task
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

export default MyTasks;
