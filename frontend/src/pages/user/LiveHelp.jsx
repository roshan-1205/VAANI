import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Send, Paperclip, Mic, MicOff, MoreVertical, X, Volume2, VolumeX, Trash2, Copy, Check } from 'lucide-react';
import CallingInterface from '../../components/user/CallingInterface';

const LiveHelp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: 'Hello! I am VAANI, your AI assistant. How can I help you today?',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      avatar: 'V'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [error, setError] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [showCallingInterface, setShowCallingInterface] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const menuRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setError('');
      };
      
      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        
        // Auto-send the transcribed message
        await handleSendMessage(null, transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech error: ${event.error}`);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not available');
      return;
    }

    if (!isListening) {
      try {
        if (synthRef.current.speaking) {
          synthRef.current.cancel();
        }
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start recognition:', err);
        setError(`Failed to start: ${err.message}`);
      }
    } else {
      recognitionRef.current.stop();
    }
  };

  const speakText = (text) => {
    if (!autoSpeak) return;
    
    synthRef.current.cancel();
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthRef.current.getVoices();
    
    const isHindi = /[\u0900-\u097F]/.test(text);
    
    let selectedVoice;
    if (isHindi) {
      selectedVoice = voices.find(voice => 
        voice.lang.startsWith('hi') && voice.name.includes('Female')
      ) || voices.find(voice => voice.lang.startsWith('hi'));
      utterance.lang = 'hi-IN';
    } else {
      selectedVoice = voices.find(voice => 
        voice.name.includes('Google US English Female') ||
        voice.name.includes('Microsoft Zira') ||
        (voice.name.includes('Female') && voice.lang.startsWith('en'))
      );
      utterance.lang = 'en-US';
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'agent',
        text: 'Hello! I am VAANI, your AI assistant. How can I help you today?',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'V'
      }
    ]);
    setShowMenu(false);
    
    // Clear conversation on backend
    fetch('http://localhost:5000/clear-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionStorage.getItem('userId') || 'user'
      })
    }).catch(err => console.error('Failed to clear conversation:', err));
  };

  const copyMessage = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (e, transcribedText = null) => {
    if (e) e.preventDefault();
    
    const messageText = transcribedText || inputMessage;
    if (!messageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      avatar: 'U'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    setError('');

    try {
      // Call AI backend
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          userId: sessionStorage.getItem('userId') || 'user',
          sessionId: sessionStorage.getItem('userId') || 'user'
        }),
      });

      if (!response.ok) {
        throw new Error(`AI backend returned ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.content || data.response || 'Sorry, I could not process your request.';

      setIsTyping(false);
      
      const agentResponse = {
        id: messages.length + 2,
        sender: 'agent',
        text: aiResponse,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'V'
      };
      
      setMessages(prev => [...prev, agentResponse]);
      
      // Speak the response
      speakText(aiResponse);

    } catch (err) {
      console.error('AI processing error:', err);
      setIsTyping(false);
      
      const errorResponse = {
        id: messages.length + 2,
        sender: 'agent',
        text: 'Sorry, I\'m having trouble connecting. Please make sure the AI backend is running on port 5000.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'V'
      };
      
      setMessages(prev => [...prev, errorResponse]);
      setError('Connection error. Make sure ai-backend is running.');
    }
  };

  const quickResponses = [
    { text: 'How do I file a complaint?', icon: '📝' },
    { text: 'What is my complaint status?', icon: '📊' },
    { text: 'Water supply issue', icon: '💧' },
    { text: 'Road repair needed', icon: '🛣️' },
    { text: 'No electricity', icon: '⚡' },
    { text: 'Garbage not collected', icon: '🗑️' }
  ];

  return (
    <div className="p-4 sm:p-6 min-h-screen w-full flex flex-col gap-4 sm:gap-6 pb-20 sm:pb-8">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-[#01070f] to-[#0a1628] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg border border-white/5 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-montserrat text-lg sm:text-xl font-bold shadow-lg">
              <span>V</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-[#01070f] rounded-full animate-pulse"></div>
            {isSpeaking && (
              <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <Volume2 size={10} className="sm:w-3 sm:h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-montserrat text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1 truncate">VAANI AI Assistant</h3>
            <p className="font-poppins text-xs sm:text-sm text-white/60 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
              <span className="truncate">Online • AI-powered civic support</span>
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 sm:gap-3 relative w-full sm:w-auto justify-end" ref={menuRef}>
          <button 
            onClick={() => setShowCallingInterface(true)}
            className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 active:scale-95 rounded-xl text-white flex items-center justify-center hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
            title="Start voice call"
          >
            <Phone size={18} className="sm:w-5 sm:h-5" />
          </button>
          <button 
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-white flex items-center justify-center hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ${
              autoSpeak ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-white/10'
            }`}
            title={autoSpeak ? 'Voice enabled' : 'Voice disabled'}
          >
            {autoSpeak ? <Volume2 size={18} className="sm:w-5 sm:h-5" /> : <VolumeX size={18} className="sm:w-5 sm:h-5" />}
          </button>
          
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 sm:w-11 sm:h-11 bg-white/10 rounded-xl text-white flex items-center justify-center hover:bg-white/15 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            <MoreVertical size={18} className="sm:w-5 sm:h-5" />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute top-12 sm:top-14 right-0 bg-[#01070f] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[180px] sm:min-w-[200px]"
              >
                <button
                  onClick={clearChat}
                  className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center gap-3 text-sm sm:text-base"
                >
                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Clear Chat
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        className="bg-[#01070f] rounded-xl sm:rounded-2xl flex flex-col shadow-lg border border-white/5 flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-3 sm:gap-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-white/5" style={{ maxHeight: '500px', minHeight: '300px' }}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex gap-2 sm:gap-3 items-start group ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-montserrat text-xs sm:text-sm font-bold flex-shrink-0 shadow-lg ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-br from-purple-500 to-blue-500'
              }`}>
                {message.avatar}
              </div>
              <div className={`flex flex-col gap-1 sm:gap-2 max-w-[75%] sm:max-w-[70%] ${message.sender === 'user' ? 'items-end' : ''}`}>
                <div className={`relative px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl font-poppins text-sm sm:text-[15px] leading-relaxed shadow-md ${
                  message.sender === 'agent' 
                    ? 'bg-gradient-to-br from-white/10 to-white/5 text-white border border-white/10' 
                    : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                }`}>
                  {message.text}
                  <button
                    onClick={() => copyMessage(message.text, message.id)}
                    className={`absolute -top-2 ${message.sender === 'user' ? '-left-2' : '-right-2'} w-6 h-6 sm:w-7 sm:h-7 bg-[#01070f] border border-white/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/10`}
                    title="Copy message"
                  >
                    {copiedId === message.id ? (
                      <Check size={12} className="sm:w-[14px] sm:h-[14px] text-green-500" />
                    ) : (
                      <Copy size={12} className="sm:w-[14px] sm:h-[14px] text-white/70" />
                    )}
                  </button>
                </div>
                <span className="font-poppins text-[10px] sm:text-[11px] text-white/40 px-2">{message.time}</span>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              className="flex gap-2 sm:gap-3 items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-montserrat text-xs sm:text-sm font-bold flex-shrink-0 shadow-lg">V</div>
              <div className="flex gap-1.5 sm:gap-2 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs sm:text-sm"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />
              <span className="flex-1">{error}</span>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form className="flex items-center gap-2 sm:gap-3 p-3 sm:p-5 border-t border-white/10 bg-gradient-to-r from-white/5 to-transparent" onSubmit={handleSendMessage}>
          <button 
            type="button" 
            className="hidden sm:flex w-10 h-10 sm:w-11 sm:h-11 bg-white/5 rounded-xl text-white/60 items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-300"
            title="Attach file"
          >
            <Paperclip size={18} className="sm:w-5 sm:h-5" />
          </button>
          <input
            type="text"
            placeholder={isListening ? "Listening..." : "Type your message..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-3 sm:px-5 py-2.5 sm:py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-poppins text-sm sm:text-[15px] focus:outline-none focus:border-purple-500 focus:bg-white/8 placeholder:text-white/40 transition-all duration-300"
            disabled={isListening}
          />
          <button 
            type="button" 
            onClick={handleVoiceInput}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-white flex items-center justify-center transition-all duration-300 shadow-lg ${
              isListening 
                ? 'bg-gradient-to-br from-red-500 to-pink-500 animate-pulse scale-110' 
                : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-white/80 hover:from-purple-500 hover:to-blue-500 hover:text-white hover:scale-105 active:scale-95'
            }`}
            title={isListening ? "Listening..." : "Voice input"}
          >
            {isListening ? <MicOff size={18} className="sm:w-5 sm:h-5" /> : <Mic size={18} className="sm:w-5 sm:h-5" />}
          </button>
          <button 
            type="submit" 
            disabled={!inputMessage.trim() || isListening}
            className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl text-white flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(139,92,246,0.5)] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <Send size={18} className="sm:w-5 sm:h-5" />
          </button>
        </form>
      </motion.div>

      {/* Quick Responses */}
      <motion.div
        className="bg-gradient-to-br from-[#01070f] to-[#0a1628] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="font-montserrat text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-1 sm:w-1.5 h-5 sm:h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></span>
          Quick Responses
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {quickResponses.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setInputMessage(item.text)}
              className="px-3 sm:px-4 py-3 sm:py-3.5 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl text-white/80 font-poppins text-xs sm:text-sm text-left hover:from-purple-500/20 hover:to-blue-500/20 hover:border-purple-500/50 hover:text-white hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-2 sm:gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl sm:text-2xl flex-shrink-0">{item.icon}</span>
              <span className="flex-1 truncate">{item.text}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Calling Interface */}
      <CallingInterface 
        isOpen={showCallingInterface}
        onClose={() => setShowCallingInterface(false)}
        onCallEnd={() => {
          console.log('Call ended');
        }}
      />
    </div>
  );
};

export default LiveHelp;
