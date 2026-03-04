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
      className={`relative overflow-hidden bg-[#01070f] rounded-3xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#8b5cf6]/10 before:to-[#3b82f6]/10 before:opacity-0 before:transition-opacity before:duration-300 ${isListening ? 'before:opacity-100 before:animate-[glow_2s_infinite]' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="h-[120px] flex items-center justify-center mb-8 relative">
        <div className="flex items-center justify-center gap-1 h-full">
          {waveHeights.map((height, index) => (
            <motion.div
              key={index}
              className="w-1 bg-gradient-to-b from-[#8b5cf6] to-[#3b82f6] rounded-sm transition-[height] duration-100"
              animate={{ height: `${height}px` }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          className={`w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] border-none text-white flex items-center justify-center cursor-pointer transition-all duration-300 relative shadow-[0_8px_24px_rgba(139,92,246,0.4)] hover:scale-105 hover:shadow-[0_12px_32px_rgba(139,92,246,0.6)] before:content-[''] before:absolute before:-inset-2 before:rounded-full before:border-2 before:border-[#8b5cf6]/30 before:opacity-0 ${isListening ? 'animate-[breathe_2s_infinite] before:animate-[pulse-ring_2s_infinite]' : ''}`}
          onClick={handleMicClick}
        >
          {isListening ? <MicOff size={48} /> : <Mic size={48} />}
        </button>
      </div>

      <div className="text-center">
        <p className="text-white/70 text-base font-medium mb-2">{getStatusText()}</p>
        <p className="text-white/40 text-[13px]">
          {voiceState === 'idle' ? 'Ask me anything about government services' : ''}
        </p>
        {voiceState !== 'idle' && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b5cf6]/20 rounded-full mt-4">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-[pulse_2s_infinite]"></span>
            <span className="text-[#8b5cf6] text-[13px] font-semibold capitalize">
              {voiceState}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIVoiceInteraction;
