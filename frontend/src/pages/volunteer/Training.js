import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, PlayCircle, CheckCircle, Clock, BookOpen, Award } from 'lucide-react';

const Training = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .training-container {
        padding: 32px;
        max-width: 1400px;
        margin: 0 auto;
        background: white;
        min-height: 100vh;
      }

      .training-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      .training-header h1 {
        color: #01070f;
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 8px;
        font-family: 'Montserrat', sans-serif;
      }

      .training-header p {
        color: #6b7280;
        font-size: 14px;
      }

      .training-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }

      .stat-card-training {
        background: #01070f;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
      }

      .stat-card-training:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
      }

      .stat-card-training .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
      }

      .stat-card-training .stat-value {
        color: white;
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 8px;
        font-family: 'Montserrat', sans-serif;
      }

      .stat-card-training .stat-label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .category-filters {
        display: flex;
        gap: 12px;
        margin-bottom: 32px;
        background: #f9fafb;
        padding: 8px;
        border-radius: 16px;
        border: 2px solid #e5e7eb;
        flex-wrap: wrap;
        justify-content: center;
      }

      .category-btn {
        padding: 12px 28px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        background: transparent;
        color: #6b7280;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
      }

      .category-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }

      .category-btn.active {
        color: white;
        box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
        transform: translateY(-2px);
      }

      .category-btn.active::before {
        opacity: 1;
      }

      .category-btn:not(.active):hover {
        background: white;
        color: #01070f;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transform: translateY(-1px);
      }

      .category-btn:active {
        transform: translateY(0);
      }

      .courses-grid-new {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
      }

      .course-card-new {
        background: #01070f;
        padding: 28px;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .course-card-new::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .course-card-new:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 64px rgba(0, 0, 0, 0.6);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .course-card-new:hover::before {
        opacity: 1;
      }

      .course-icon-new {
        width: 72px;
        height: 72px;
        margin: 0 auto 20px;
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .course-card-new.completed .course-icon-new {
        background: rgba(59, 130, 246, 0.2);
        color: #3b82f6;
      }

      .course-card-new.progress .course-icon-new {
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
      }

      .course-status-badge {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 6px 12px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .course-status-badge.completed {
        background: rgba(59, 130, 246, 0.15);
        color: #3b82f6;
      }

      .course-status-badge.progress {
        background: rgba(245, 158, 11, 0.15);
        color: #f59e0b;
      }

      .course-status-badge.not-started {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.6);
      }

      .course-card-new h3 {
        color: white;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
        text-align: center;
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .course-description {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
        text-align: center;
        margin-bottom: 20px;
        line-height: 1.6;
      }

      .course-progress-new {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
      }

      .progress-bar-new {
        flex: 1;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-fill-new {
        height: 100%;
        background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
        border-radius: 4px;
        transition: width 0.5s ease;
      }

      .progress-text {
        color: white;
        font-size: 14px;
        font-weight: 600;
        min-width: 45px;
        text-align: right;
      }

      .course-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
      }

      .course-meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
      }

      .course-btn-new {
        width: 100%;
        padding: 14px;
        background: rgba(16, 185, 129, 0.2);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 12px;
        color: #10b981;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s ease;
      }

      .course-btn-new:hover {
        background: rgba(16, 185, 129, 0.3);
        transform: translateY(-2px);
      }

      .course-card-new.completed .course-btn-new {
        background: rgba(59, 130, 246, 0.2);
        border-color: rgba(59, 130, 246, 0.3);
        color: #3b82f6;
      }

      .course-card-new.completed .course-btn-new:hover {
        background: rgba(59, 130, 246, 0.3);
      }

      @media (max-width: 1200px) {
        .training-stats {
          grid-template-columns: repeat(2, 1fr);
        }

        .courses-grid-new {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
      }

      @media (max-width: 768px) {
        .training-container {
          padding: 16px;
        }

        .training-stats {
          grid-template-columns: 1fr;
        }

        .category-filters {
          flex-wrap: wrap;
        }

        .courses-grid-new {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const stats = [
    { icon: BookOpen, label: 'Total Courses', value: '12', color: '#3b82f6' },
    { icon: CheckCircle, label: 'Completed', value: '4', color: '#10b981' },
    { icon: Clock, label: 'In Progress', value: '3', color: '#f59e0b' },
    { icon: Award, label: 'Certificates', value: '4', color: '#8b5cf6' }
  ];

  const courses = [
    { 
      id: 1, 
      title: 'Healthcare Support Basics', 
      description: 'Learn fundamental healthcare support skills and patient communication',
      progress: 100, 
      status: 'completed',
      duration: '4 hours',
      lessons: '12 lessons'
    },
    { 
      id: 2, 
      title: 'Communication Skills', 
      description: 'Master effective communication techniques for volunteer work',
      progress: 60, 
      status: 'progress',
      duration: '3 hours',
      lessons: '10 lessons'
    },
    { 
      id: 3, 
      title: 'Legal Aid Fundamentals', 
      description: 'Understanding basic legal concepts and documentation',
      progress: 0, 
      status: 'not-started',
      duration: '5 hours',
      lessons: '15 lessons'
    },
    { 
      id: 4, 
      title: 'Welfare Programs Overview', 
      description: 'Comprehensive guide to government welfare programs',
      progress: 30, 
      status: 'progress',
      duration: '4 hours',
      lessons: '12 lessons'
    },
    { 
      id: 5, 
      title: 'Emergency Response Training', 
      description: 'Critical skills for handling emergency situations',
      progress: 100, 
      status: 'completed',
      duration: '6 hours',
      lessons: '18 lessons'
    },
    { 
      id: 6, 
      title: 'Cultural Sensitivity', 
      description: 'Working effectively with diverse communities',
      progress: 0, 
      status: 'not-started',
      duration: '2 hours',
      lessons: '8 lessons'
    }
  ];

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(c => c.status === activeCategory);

  return (
    <div className="training-container">
      <motion.div
        className="training-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1>Training</h1>
          <p>Complete training modules to enhance your skills</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="training-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card-training"
          >
            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Category Filters */}
      <motion.div
        className="category-filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <button 
          className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Courses
        </button>
        <button 
          className={`category-btn ${activeCategory === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveCategory('completed')}
        >
          Completed
        </button>
        <button 
          className={`category-btn ${activeCategory === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveCategory('progress')}
        >
          In Progress
        </button>
        <button 
          className={`category-btn ${activeCategory === 'not-started' ? 'active' : ''}`}
          onClick={() => setActiveCategory('not-started')}
        >
          Not Started
        </button>
      </motion.div>

      {/* Courses Grid */}
      <motion.div 
        className="courses-grid-new"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {filteredCourses.map((course, index) => (
          <div
            key={course.id}
            className={`course-card-new ${course.status}`}
          >
            <div className={`course-status-badge ${course.status}`}>
              {course.status === 'completed' ? 'Completed' : course.status === 'progress' ? 'In Progress' : 'Not Started'}
            </div>
            <div className="course-icon-new">
              <GraduationCap size={36} />
            </div>
            <h3>{course.title}</h3>
            <div className="course-description">{course.description}</div>
            <div className="course-meta">
              <div className="course-meta-item">
                <Clock size={14} />
                {course.duration}
              </div>
              <div className="course-meta-item">
                <BookOpen size={14} />
                {course.lessons}
              </div>
            </div>
            <div className="course-progress-new">
              <div className="progress-bar-new">
                <div 
                  className="progress-fill-new" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{course.progress}%</span>
            </div>
            <button className="course-btn-new">
              {course.status === 'completed' ? (
                <>
                  <CheckCircle size={18} />
                  Review Course
                </>
              ) : course.status === 'progress' ? (
                <>
                  <PlayCircle size={18} />
                  Continue Learning
                </>
              ) : (
                <>
                  <PlayCircle size={18} />
                  Start Course
                </>
              )}
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Training;
