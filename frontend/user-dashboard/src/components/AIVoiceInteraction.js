import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import './AIVoiceInteraction.css';

const AIVoiceInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [waveHeights, setWaveHeights] = useState(Array(20).fill(20));
  const [voiceState, setVoiceState] = useState('idle'); // idle, listening, processing, responding

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setWaveHeights(prev => 
          prev.map(() => Math.random() * 80 + 20)
        );
      }, 100);
      return () => clearInterval(interval);
    } else {
      setWaveHeights(Array(20).fill(20));
    }
  }, [isListening]);

  const handleMicClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setVoiceState('listening');
      // Simulate processing after 3 seconds
      setTimeout(() => {
        setVoiceState('processing');
        setTimeout(() => {
          setVoiceState('responding');
          setTimeout(() => {
            setVoiceState('idle');
            setIsListening(false);
          }, 2000);
        }, 1500);
      }, 3000);
    } else {
      setVoiceState('idle');
    }
  };

  const getStatusText = () => {
    switch(voiceState) {
      case 'listening': return 'Listening...';
      case 'processing': return 'Processing your request...';
      case 'responding': return 'Here\'s what I found...';
      default: return 'Tap to speak';
    }
  };

  return (
    <motion.div
      className={`ai-voice-container ${isListening ? 'listening' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="waveform-container">
        <div className="waveform">
          {waveHeights.map((height, index) => (
            <motion.div
              key={index}
              className="wave-bar"
              animate={{ height: `${height}px` }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
      </div>

      <div className="mic-button-container">
        <button
          className={`mic-button ${isListening ? 'listening' : ''}`}
          onClick={handleMicClick}
        >
          {isListening ? <MicOff size={48} /> : <Mic size={48} />}
        </button>
      </div>

      <div className="voice-status">
        <p className="voice-status-text">{getStatusText()}</p>
        <p className="voice-status-hint">
          {voiceState === 'idle' ? 'Ask me anything about government services' : ''}
        </p>
        {voiceState !== 'idle' && (
          <div className="voice-state-indicator">
            <span className="state-dot"></span>
            <span style={{ color: '#8b5cf6', fontSize: '13px', fontWeight: 600 }}>
              {voiceState.charAt(0).toUpperCase() + voiceState.slice(1)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIVoiceInteraction;
