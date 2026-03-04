import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import './AIVoiceInteraction.css';

const AIVoiceInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [waveHeights, setWaveHeights] = useState(Array(20).fill(20));
  const [voiceState, setVoiceState] = useState('idle'); // idle, listening, processing, responding
  const [transcribedText, setTranscribedText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [error, setError] = useState('');
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Initialize Web Speech API
  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      const voices = synthRef.current.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
        console.log('Available voices:', voices.map(v => v.name));
      }
    };

    // Load voices immediately
    loadVoices();

    // Also listen for voiceschanged event (some browsers load voices async)
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'hi-IN'; // Set to Hindi by default, will auto-detect
      
      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setVoiceState('listening');
        setError('');
      };
      
      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcribed:', transcript);
        setTranscribedText(transcript);
        setIsListening(false);
        
        // Process with AI
        await processWithAI(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
        setVoiceState('idle');
      };
      
      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      setError('Speech recognition not supported in this browser. Please use Chrome or Edge.');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

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
    if (!recognitionRef.current) {
      setError('Speech recognition not available');
      return;
    }

    if (!isListening) {
      // Stop any ongoing speech before starting to listen
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
        setVoiceState('idle');
      }
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    try {
      // Cancel any ongoing speech
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
        console.log('Speech interrupted by user');
      }
      
      setError('');
      setTranscribedText('');
      setResponseText('');
      recognitionRef.current.start();
    } catch (err) {
      console.error('Failed to start recognition:', err);
      setError(`Failed to start: ${err.message}`);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const processWithAI = async (text) => {
    setVoiceState('processing');

    try {
      console.log('Sending to AI backend:', text);

      // Call local ai-backend server
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text
        }),
      });

      if (!response.ok) {
        throw new Error(`AI backend returned ${response.status}`);
      }

      const data = await response.json();
      console.log('AI response:', data);

      const aiResponse = data.content || data.response || 'No response received';
      setResponseText(aiResponse);
      setVoiceState('responding');

      // Speak the response
      speakText(aiResponse);

    } catch (err) {
      console.error('AI processing error:', err);
      const errorMsg = `AI Error: ${err.message}. Make sure ai-backend is running on port 5000.`;
      setError(errorMsg);
      setVoiceState('idle');
    }
  };

  const speakText = (text) => {
    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices
    const voices = synthRef.current.getVoices();
    
    // Detect if text is Hindi (contains Devanagari characters)
    const isHindi = /[\u0900-\u097F]/.test(text);
    
    // Select appropriate voice based on language
    let selectedVoice;
    
    if (isHindi) {
      // Select Hindi female voice
      selectedVoice = voices.find(voice => 
        voice.lang.startsWith('hi') && voice.name.includes('Female')
      ) || voices.find(voice => 
        voice.lang.startsWith('hi')
      ) || voices.find(voice => 
        voice.name.includes('Google हिन्दी')
      );
      
      utterance.lang = 'hi-IN';
      console.log('Using Hindi voice');
    } else {
      // Select English female voice
      selectedVoice = voices.find(voice => 
        voice.name.includes('Google US English Female') ||
        voice.name.includes('Microsoft Zira') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        (voice.name.includes('Female') && voice.lang.startsWith('en'))
      ) || voices.find(voice => voice.name.includes('female')) 
        || voices.find(voice => voice.gender === 'female');
      
      utterance.lang = 'en-US';
      console.log('Using English voice');
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log('Using voice:', selectedVoice.name);
    }

    // Voice settings for natural, sweet, and pleasant tone
    utterance.rate = 0.95; // Slightly slower for clarity and warmth
    utterance.pitch = 1.1; // Slightly higher for feminine, pleasant tone
    utterance.volume = 1.0; // Full volume

    utterance.onend = () => {
      console.log('Speech finished');
      setVoiceState('idle');
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setVoiceState('idle');
    };

    synthRef.current.speak(utterance);
  };

  const getStatusText = () => {
    if (error) return error;
    if (transcribedText && voiceState === 'processing') return `You said: "${transcribedText}"`;
    if (responseText && voiceState === 'responding') return responseText;
    
    switch(voiceState) {
      case 'listening': return 'Listening... (Speak now)';
      case 'processing': return 'Thinking...';
      case 'responding': return 'Speaking...';
      default: return 'Click to speak';
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
