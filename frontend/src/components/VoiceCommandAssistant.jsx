import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import './VoiceCommandAssistant.css';

const VoiceCommandAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Speech Recognition with improved settings
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Improved settings for better accuracy
      recognitionRef.current.continuous = false; // Stop after each command for better accuracy
      recognitionRef.current.interimResults = false; // Only final results
      recognitionRef.current.lang = 'hi-IN'; // Hindi-India for better Hinglish support
      recognitionRef.current.maxAlternatives = 3; // Get multiple alternatives
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let alternatives = [];
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript = event.results[i][0].transcript;
            
            // Collect alternatives for better matching
            for (let j = 0; j < Math.min(3, event.results[i].length); j++) {
              alternatives.push(event.results[i][j].transcript);
            }
          }
        }
        
        if (finalTranscript) {
          console.log('🎤 Recognized:', finalTranscript);
          console.log('📝 Alternatives:', alternatives);
          setTranscript(finalTranscript);
          processCommand(finalTranscript);
          setIsListening(false); // Stop listening after command
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          setError('कोई आवाज़ नहीं सुनाई दी। कृपया फिर से कोशिश करें।');
        } else if (event.error === 'audio-capture') {
          setError('माइक्रोफ़ोन एक्सेस नहीं मिला। कृपया permission दें।');
        } else {
          setError(`Recognition error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      synthRef.current.cancel();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setError('');
      setTranscript('');
      setResponse('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text) => {
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    synthRef.current.cancel();
    setIsSpeaking(false);
  };

  const processCommand = async (command) => {
    setIsProcessing(true);
    const lowerCommand = command.toLowerCase().trim();

    console.log('🎤 Voice Command:', command);

    try {
      // Send to AI backend for processing
      const response = await fetch('https://vaani-ai-backend-production-8cab.up.railway.app/voice-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          command: command, // Send original command, not lowercase
          userId: localStorage.getItem('userId') || 'anonymous'
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('📥 Response:', data);

      // Check if it's an action command
      if (data.type === 'action') {
        executeAction(data);
      } else {
        // Regular conversational response
        setResponse(data.content);
        speak(data.content);
      }
    } catch (err) {
      console.error('Command processing error:', err);
      const fallbackResponse = "Main aapki baat samajh nahi payi. Kripya dobara try karein.";
      setResponse(fallbackResponse);
      speak(fallbackResponse);
    } finally {
      setIsProcessing(false);
    }
  };

  const executeAction = (actionData) => {
    const { action, parameters } = actionData;
    
    let confirmationMessage = '';

    switch (action) {
      case 'navigate_home':
        navigate('/');
        confirmationMessage = 'Navigating to home page';
        break;
      
      case 'navigate_back':
        navigate(-1);
        confirmationMessage = 'Going back';
        break;
      
      case 'navigate_forward':
        navigate(1);
        confirmationMessage = 'Going forward';
        break;
      
      case 'open_dashboard':
        navigate('/user-dashboard');
        confirmationMessage = 'Opening dashboard';
        break;
      
      case 'change_dashboard_section':
        const section = parameters.section;
        navigate(`/user-dashboard/${section}`);
        confirmationMessage = `Opening ${section} section`;
        break;
      
      case 'open_report_issue':
        navigate('/report-issue');
        confirmationMessage = 'Opening report issue page';
        break;
      
      case 'open_track_complaint':
        navigate('/track-complaint');
        confirmationMessage = 'Opening complaint tracking';
        break;
      
      case 'call_volunteer':
        // Trigger volunteer call functionality
        window.dispatchEvent(new CustomEvent('call-volunteer'));
        confirmationMessage = 'Connecting to volunteer support';
        break;
      
      case 'logout_user':
        // Trigger logout
        window.dispatchEvent(new CustomEvent('voice-logout'));
        confirmationMessage = 'Logging you out';
        break;
      
      default:
        confirmationMessage = 'Action not recognized';
    }

    setResponse(confirmationMessage);
    speak(confirmationMessage);
  };

  return (
    <div className="voice-command-container">
      <div className="voice-command-card">
        <div className="voice-header">
          <h3>🎤 Vaani Voice Assistant</h3>
          <p className="voice-subtitle">Say a command or ask a question</p>
        </div>

        <div className="voice-controls">
          <button
            onClick={toggleListening}
            className={`mic-button ${isListening ? 'listening' : ''}`}
            disabled={isProcessing}
          >
            {isListening ? <Mic size={32} /> : <MicOff size={32} />}
          </button>

          {isSpeaking && (
            <button onClick={stopSpeaking} className="speaker-button">
              <VolumeX size={24} />
            </button>
          )}
        </div>

        {isListening && (
          <div className="listening-indicator">
            <div className="pulse-ring"></div>
            <span>Listening...</span>
          </div>
        )}

        {isProcessing && (
          <div className="processing-indicator">
            <div className="spinner"></div>
            <span>Processing command...</span>
          </div>
        )}

        {transcript && (
          <div className="transcript-box">
            <strong>You said:</strong>
            <p>{transcript}</p>
          </div>
        )}

        {response && (
          <div className="response-box">
            <strong>Vaani:</strong>
            <p>{response}</p>
            {isSpeaking && <Volume2 className="speaking-icon" size={20} />}
          </div>
        )}

        {error && (
          <div className="error-box">
            <p>{error}</p>
          </div>
        )}

        <div className="voice-commands-help">
          <details>
            <summary>Example Commands</summary>
            <ul>
              <li>"Go to home"</li>
              <li>"Open dashboard"</li>
              <li>"Report an issue"</li>
              <li>"Track my complaint"</li>
              <li>"Call volunteer"</li>
              <li>"Go back"</li>
              <li>"Logout"</li>
              <li>"What is Vaani?"</li>
              <li>"How do I report a problem?"</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandAssistant;
