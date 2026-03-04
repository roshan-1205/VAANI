import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, X } from 'lucide-react';

const CallingInterface = ({ isOpen, onClose, onCallEnd }) => {
  const [callStatus, setCallStatus] = useState('connecting'); // connecting, connected, ended
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const timerRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (!isOpen) return;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = async (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        
        if (event.results[current].isFinal) {
          setTranscript(transcriptText);
          await processWithAI(transcriptText);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        if (callStatus === 'connected' && !isMuted) {
          recognition.start(); // Restart if call is still active
        } else {
          setIsListening(false);
        }
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
  }, [isOpen, callStatus, isMuted]);

  // Simulate connection and start call
  useEffect(() => {
    if (!isOpen) return;

    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
      speakText('नमस्ते! मैं VAANI हूं। मैं आपकी कैसे मदद कर सकती हूं?');
      
      // Start speech recognition
      if (recognitionRef.current && !isMuted) {
        recognitionRef.current.start();
      }
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, [isOpen]);

  // Call duration timer
  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [callStatus]);

  const processWithAI = async (text) => {
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          userId: sessionStorage.getItem('userId') || 'user',
          sessionId: sessionStorage.getItem('userId') || 'user'
        }),
      });

      if (!response.ok) {
        throw new Error(`AI backend returned ${response.status}`);
      }

      const data = await response.json();
      const aiResponseText = data.content || data.response || 'Sorry, I could not process your request.';
      
      setAiResponse(aiResponseText);
      speakText(aiResponseText);

    } catch (err) {
      console.error('AI processing error:', err);
      const errorMsg = 'मुझे कुछ technical problem हो रही है।';
      setAiResponse(errorMsg);
      speakText(errorMsg);
    }
  };

  const speakText = (text) => {
    if (!isSpeakerOn) return;
    
    synthRef.current.cancel();

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

    synthRef.current.speak(utterance);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      // Muting - stop recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      // Unmuting - start recognition
      if (recognitionRef.current && callStatus === 'connected') {
        recognitionRef.current.start();
      }
    }
  };

  const handleSpeakerToggle = () => {
    setIsSpeakerOn(!isSpeakerOn);
    if (isSpeakerOn) {
      synthRef.current.cancel();
    }
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimeout(() => {
      onCallEnd?.();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-[#01070f] via-[#0a1628] to-[#01070f] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
          >
            <X size={20} />
          </button>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <motion.div
                animate={callStatus === 'connected' ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-montserrat text-5xl font-bold shadow-2xl"
              >
                V
              </motion.div>
              
              {/* Pulse rings */}
              {callStatus === 'connected' && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-purple-500/30 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 bg-blue-500/30 rounded-full"
                  />
                </>
              )}
            </div>

            <h2 className="text-white text-2xl font-bold mb-2">VAANI AI Assistant</h2>
            
            {/* Call Status */}
            <div className="flex items-center gap-2 mb-2">
              {callStatus === 'connecting' && (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-500 text-sm font-medium">Connecting...</span>
                </>
              )}
              {callStatus === 'connected' && (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-500 text-sm font-medium">{formatDuration(callDuration)}</span>
                </>
              )}
              {callStatus === 'ended' && (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-500 text-sm font-medium">Call Ended</span>
                </>
              )}
            </div>

            {/* Transcript Display */}
            {callStatus === 'connected' && (
              <div className="w-full mt-6 p-4 bg-white/5 border border-white/10 rounded-xl min-h-[120px] max-h-[200px] overflow-y-auto">
                {transcript && (
                  <div className="mb-3">
                    <p className="text-white/50 text-xs mb-1">You:</p>
                    <p className="text-white text-sm">{transcript}</p>
                  </div>
                )}
                {aiResponse && (
                  <div>
                    <p className="text-purple-400 text-xs mb-1">VAANI:</p>
                    <p className="text-white/80 text-sm">{aiResponse}</p>
                  </div>
                )}
                {!transcript && !aiResponse && (
                  <p className="text-white/40 text-sm text-center mt-8">
                    {isMuted ? 'Microphone is muted' : 'Listening...'}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="flex justify-center items-center gap-6">
            {callStatus === 'connected' && (
              <>
                <button
                  onClick={handleMuteToggle}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isMuted
                      ? 'bg-red-500/20 text-red-500 border-2 border-red-500/50'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>

                <button
                  onClick={handleSpeakerToggle}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    !isSpeakerOn
                      ? 'bg-red-500/20 text-red-500 border-2 border-red-500/50'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  title={isSpeakerOn ? 'Mute Speaker' : 'Unmute Speaker'}
                >
                  {isSpeakerOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
                </button>
              </>
            )}

            <button
              onClick={handleEndCall}
              disabled={callStatus === 'ended'}
              className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              title="End Call"
            >
              <PhoneOff size={28} />
            </button>
          </div>

          {/* Listening Indicator */}
          {callStatus === 'connected' && isListening && !isMuted && (
            <div className="flex justify-center items-center gap-1 mt-6">
              <motion.div
                animate={{ height: [8, 16, 8] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-1 bg-purple-500 rounded-full"
              />
              <motion.div
                animate={{ height: [8, 20, 8] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                className="w-1 bg-blue-500 rounded-full"
              />
              <motion.div
                animate={{ height: [8, 16, 8] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                className="w-1 bg-cyan-500 rounded-full"
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CallingInterface;
