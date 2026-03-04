import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Send, Paperclip, Mic, MicOff, MoreVertical, X, Volume2, VolumeX, Trash2, Copy, Check } from 'lucide-react';
import CallingInterface from '../../components/user/CallingInterface';

const LiveHelp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: 'à¤¨à¤®à¤¸à¥à¤¤à¥‡! à¤®à¥ˆà¤‚ VAANI à¤¹à¥‚à¤‚, à¤†à¤ªà¤•à¥€ AI assistantà¥¤ à¤®à¥ˆà¤‚ à¤†à¤ªà¤•à¥€ à¤•à¥ˆà¤¸à¥‡ à¤®à¤¦à¤¦ à¤•à¤° à¤¸à¤•à¤¤à¥€ à¤¹à¥‚à¤‚?',
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
        text: 'à¤¨à¤®à¤¸à¥à¤¤à¥‡! à¤®à¥ˆà¤‚ VAANI à¤¹à¥‚à¤‚, à¤†à¤ªà¤•à¥€ AI assistantà¥¤ à¤®à¥ˆà¤‚ à¤†à¤ªà¤•à¥€ à¤•à¥ˆà¤¸à¥‡ à¤®à¤¦à¤¦ à¤•à¤° à¤¸à¤•à¤¤à¥€ à¤¹à¥‚à¤‚?',
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
    { text: 'à¤¶à¤¿à¤•à¤¾à¤¯à¤¤ à¤•à¥ˆà¤¸à¥‡ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚?', icon: 'ðŸ“' },
    { text: 'à¤®à¥‡à¤°à¥€ à¤¶à¤¿à¤•à¤¾à¤¯à¤¤ à¤•à¤¾ status à¤•à¥à¤¯à¤¾ à¤¹à¥ˆ?', icon: 'ðŸ“Š' },
    { text: 'à¤ªà¤¾à¤¨à¥€ à¤•à¥€ à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤¹à¥ˆ', icon: 'ðŸ’§' },
    { text: 'à¤¸à¤¡à¤¼à¤• à¤•à¥€ à¤®à¤°à¤®à¥à¤®à¤¤ à¤šà¤¾à¤¹à¤¿à¤', icon: 'ðŸ›£ï¸' },
    { text: 'à¤¬à¤¿à¤œà¤²à¥€ à¤¨à¤¹à¥€à¤‚ à¤† à¤°à¤¹à¥€', icon: 'âš¡' },
    { text: 'à¤•à¤šà¤°à¤¾ à¤¨à¤¹à¥€à¤‚ à¤‰à¤ à¤¾à¤¯à¤¾ à¤œà¤¾ à¤°à¤¹à¤¾', icon: 'ðŸ—‘ï¸' }
  ];

  return (
    <div className="p-6 min-h-screen max-w-[1400px] mx-auto flex flex-col gap-6 md:p-4 pb-8">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-[#01070f] to-[#0a1628] rounded-2xl p-6 flex justify-between items-center shadow-lg border border-white/5 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-montserrat text-xl font-bold shadow-lg">
              <span>V</span>
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#01070f] rounded-full animate-pulse"></div>
            {isSpeaking && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <Volume2 size={12} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-montserrat text-xl font-bold text-white mb-1">VAANI AI Assistant</h3>
            <p className="font-poppins text-sm text-white/60 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online â€¢ AI-powered civic support
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 relative" ref={menuRef}>
          <button 
            onClick={() => setShowCallingInterface(true)}
            className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-white flex items-center justify-center hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
            title="Start voice call"
          >
            <Phone size={20} />
          </button>
          <button 
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`w-11 h-11 rounded-xl text-white flex items-center justify-center hover:-translate-y-0.5 transition-all duration-300 ${
              autoSpeak ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-white/10'
            }`}
            title={autoSpeak ? 'Voice enabled' : 'Voice disabled'}
          >
            {autoSpeak ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-11 h-11 bg-white/10 rounded-xl text-white flex items-center justify-center hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-300"
          >
            <MoreVertical size={20} />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute top-14 right-0 bg-[#01070f] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[200px]"
              >
                <button
                  onClick={clearChat}
                  className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center gap-3"
                >
                  <Trash2 size={18} />
                  Clear Chat
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        className="bg-[#01070f] rounded-2xl flex flex-col shadow-lg border border-white/5 flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-white/5" style={{ maxHeight: '600px' }}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex gap-3 items-start group ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-montserrat text-sm font-bold flex-shrink-0 shadow-lg ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-br from-purple-500 to-blue-500'
              }`}>
                {message.avatar}
              </div>
              <div className={`flex flex-col gap-2 max-w-[70%] ${message.sender === 'user' ? 'items-end' : ''}`}>
                <div className={`relative px-5 py-3.5 rounded-2xl font-poppins text-[15px] leading-relaxed shadow-md ${
                  message.sender === 'agent' 
                    ? 'bg-gradient-to-br from-white/10 to-white/5 text-white border border-white/10' 
                    : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                }`}>
                  {message.text}
                  <button
                    onClick={() => copyMessage(message.text, message.id)}
                    className={`absolute -top-2 ${message.sender === 'user' ? '-left-2' : '-right-2'} w-7 h-7 bg-[#01070f] border border-white/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/10`}
                    title="Copy message"
                  >
                    {copiedId === message.id ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <Copy size={14} className="text-white/70" />
                    )}
                  </button>
                </div>
                <span className="font-poppins text-[11px] text-white/40 px-2">{message.time}</span>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              className="flex gap-3 items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-montserrat text-sm font-bold flex-shrink-0 shadow-lg">V</div>
              <div className="flex gap-2 px-5 py-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10">
                <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
            >
              <X size={18} />
              {error}
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form className="flex items-center gap-3 p-5 border-t border-white/10 bg-gradient-to-r from-white/5 to-transparent" onSubmit={handleSendMessage}>
          <button 
            type="button" 
            className="w-11 h-11 bg-white/5 rounded-xl text-white/60 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-300"
            title="Attach file"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            placeholder={isListening ? "à¤¸à¥à¤¨ à¤°à¤¹à¤¾ à¤¹à¥‚à¤‚..." : "à¤…à¤ªà¤¨à¤¾ message type à¤•à¤°à¥‡à¤‚ à¤¯à¤¾ voice use à¤•à¤°à¥‡à¤‚..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-poppins text-[15px] focus:outline-none focus:border-purple-500 focus:bg-white/8 placeholder:text-white/40 transition-all duration-300"
            disabled={isListening}
          />
          <button 
            type="button" 
            onClick={handleVoiceInput}
            className={`w-11 h-11 rounded-xl text-white flex items-center justify-center transition-all duration-300 shadow-lg ${
              isListening 
                ? 'bg-gradient-to-br from-red-500 to-pink-500 animate-pulse scale-110' 
                : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-white/80 hover:from-purple-500 hover:to-blue-500 hover:text-white hover:scale-105'
            }`}
            title={isListening ? "Listening..." : "Voice input"}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button 
            type="submit" 
            disabled={!inputMessage.trim() || isListening}
            className="w-11 h-11 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl text-white flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(139,92,246,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <Send size={20} />
          </button>
        </form>
      </motion.div>

      {/* Quick Responses */}
      <motion.div
        className="bg-gradient-to-br from-[#01070f] to-[#0a1628] rounded-2xl p-6 shadow-lg border border-white/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="font-montserrat text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></span>
          Quick Responses
        </h4>
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
          {quickResponses.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setInputMessage(item.text)}
              className="px-4 py-3.5 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl text-white/80 font-poppins text-sm text-left hover:from-purple-500/20 hover:to-blue-500/20 hover:border-purple-500/50 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="flex-1">{item.text}</span>
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
