import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

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

  // Inject CSS
  useEffect(() => {
    const styleId = 'ai-voice-interaction-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes glow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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

      // Call Railway AI backend server
      const response = await fetch('https://vaani-ai-backend-production-8cab.up.railway.app/chat', {
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
      className={`relative overflow-hidden bg-[#01070f] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#8b5cf6]/10 before:to-[#3b82f6]/10 before:opacity-0 before:transition-opacity before:duration-300 ${isListening ? 'before:opacity-100 before:animate-[glow_2s_infinite]' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
            V
          </div>
          <div>
            <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold font-['Poppins'] m-0">VAANI AI Assistant</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-white/60 text-xs sm:text-sm">Online • AI-powered civic support</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500 hover:bg-purple-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
          <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Wave Visualization */}
      <div className="h-[80px] sm:h-[100px] lg:h-[120px] flex items-center justify-center mb-6 sm:mb-8 relative">
        <div className="flex items-center justify-center gap-0.5 sm:gap-1 h-full">
          {waveHeights.map((height, index) => (
            <motion.div
              key={index}
              className="w-0.5 sm:w-1 bg-gradient-to-b from-[#8b5cf6] to-[#3b82f6] rounded-sm transition-[height] duration-100"
              animate={{ height: `${height}px` }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Mic Button */}
      <div className="flex justify-center mb-6">
        <button
          className={`w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] lg:w-[120px] lg:h-[120px] rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] border-none text-white flex items-center justify-center cursor-pointer transition-all duration-300 relative shadow-[0_8px_24px_rgba(139,92,246,0.4)] hover:scale-105 hover:shadow-[0_12px_32px_rgba(139,92,246,0.6)] active:scale-95 before:content-[''] before:absolute before:-inset-2 before:rounded-full before:border-2 before:border-[#8b5cf6]/30 before:opacity-0 ${isListening ? 'animate-[breathe_2s_infinite] before:animate-[pulse-ring_2s_infinite]' : ''}`}
          onClick={handleMicClick}
        >
          {isListening ? <MicOff size={40} className="sm:w-11 sm:h-11 lg:w-12 lg:h-12" /> : <Mic size={40} className="sm:w-11 sm:h-11 lg:w-12 lg:h-12" />}
        </button>
      </div>

      {/* Status Text */}
      <div className="text-center px-4">
        <p className="text-white/70 text-sm sm:text-base font-medium mb-2 break-words">{getStatusText()}</p>
        <p className="text-white/40 text-xs sm:text-[13px]">
          {voiceState === 'idle' ? 'Ask me anything about government services' : ''}
        </p>
        {voiceState !== 'idle' && (
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#8b5cf6]/20 rounded-full mt-3 sm:mt-4">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-[pulse_2s_infinite]"></span>
            <span className="text-[#8b5cf6] text-xs sm:text-[13px] font-semibold capitalize">
              {voiceState}
            </span>
          </div>
        )}
      </div>

      {/* Mobile Action Buttons */}
      <div className="flex sm:hidden items-center justify-center gap-3 mt-6 pt-6 border-t border-white/10">
        <button className="w-12 h-12 rounded-xl bg-green-500 active:bg-green-600 flex items-center justify-center text-white transition-all duration-300 active:scale-95 shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button className="w-12 h-12 rounded-xl bg-purple-500 active:bg-purple-600 flex items-center justify-center text-white transition-all duration-300 active:scale-95 shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </button>
        <button className="w-12 h-12 rounded-xl bg-gray-700 active:bg-gray-600 flex items-center justify-center text-white transition-all duration-300 active:scale-95 shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default AIVoiceInteraction;
