import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import './LiveHelp.css';

const LiveHelp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: 'Hello! I\'m here to help you. How can I assist you today?',
      time: '10:30 AM',
      avatar: 'S'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      avatar: 'A'
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse = {
        id: messages.length + 2,
        sender: 'agent',
        text: 'Thank you for your message. Let me help you with that. Our team is reviewing your request.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'S'
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  return (
    <div className="live-help-page">
      <motion.div
        className="chat-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="agent-info">
          <div className="agent-avatar">
            <span>S</span>
            <div className="online-indicator"></div>
          </div>
          <div>
            <h3>Support Agent</h3>
            <p>Online - Typically replies instantly</p>
          </div>
        </div>
        
        <div className="chat-actions">
          <button className="action-btn">
            <Phone size={20} />
          </button>
          <button className="action-btn">
            <Video size={20} />
          </button>
          <button className="action-btn">
            <MoreVertical size={20} />
          </button>
        </div>
      </motion.div>

      <motion.div
        className="chat-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="messages-area">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`message ${message.sender}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {message.sender === 'agent' && (
                <div className="message-avatar">{message.avatar}</div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {message.text}
                </div>
                <span className="message-time">{message.time}</span>
              </div>
              {message.sender === 'user' && (
                <div className="message-avatar">{message.avatar}</div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              className="message agent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="message-avatar">S</div>
              <div className="message-content">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form className="message-input-area" onSubmit={handleSendMessage}>
          <button type="button" className="input-action-btn">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="button" className="input-action-btn">
            <Smile size={20} />
          </button>
          <button type="submit" className="send-btn">
            <Send size={20} />
          </button>
        </form>
      </motion.div>

      <motion.div
        className="quick-responses"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h4>Quick Responses</h4>
        <div className="quick-response-buttons">
          {['Check application status', 'Schedule appointment', 'Document verification', 'General inquiry'].map((text, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(text)}
              className="quick-response-btn"
            >
              {text}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LiveHelp;
