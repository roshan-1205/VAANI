import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, PlayCircle, CheckCircle } from 'lucide-react';
import './PageCommon.css';

const Training = () => {
  const courses = [
    { id: 1, title: 'Healthcare Support Basics', progress: 100, status: 'completed' },
    { id: 2, title: 'Communication Skills', progress: 60, status: 'progress' },
    { id: 3, title: 'Legal Aid Fundamentals', progress: 0, status: 'not-started' },
    { id: 4, title: 'Welfare Programs Overview', progress: 30, status: 'progress' }
  ];

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Training</h1>
          <p>Complete training modules to enhance your skills</p>
        </div>
      </motion.div>

      <div className="courses-grid">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            className="course-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="course-icon">
              <GraduationCap size={32} />
            </div>
            <h3>{course.title}</h3>
            <div className="course-progress">
              <div className="progress-bar-small">
                <div 
                  className="progress-fill-small" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span>{course.progress}%</span>
            </div>
            <button className="course-btn">
              {course.status === 'completed' ? <CheckCircle size={16} /> : <PlayCircle size={16} />}
              {course.status === 'completed' ? 'Review' : course.status === 'progress' ? 'Continue' : 'Start'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Training;
