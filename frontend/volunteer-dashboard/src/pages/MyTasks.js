import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle, Clock, AlertCircle, Plus, X, Calendar, User, Tag, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';
import './MyTasks.css';

const MyTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
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
