/**
 * Example: How to integrate Voice Assistant in your components
 * 
 * This file shows different ways to use the voice assistant
 * throughout your application.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceCommandAssistant from '../components/VoiceCommandAssistant';

// ============================================
// Example 1: Basic Integration
// ============================================
export function BasicIntegration() {
  return (
    <div className="page-container">
      <h1>My Page</h1>
      
      {/* Simply add the component */}
      <VoiceCommandAssistant />
      
      <div className="content">
        {/* Your page content */}
      </div>
    </div>
  );
}

// ============================================
// Example 2: With Custom Event Listeners
// ============================================
export function CustomEventIntegration() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for voice-triggered logout
    const handleVoiceLogout = () => {
      console.log('Voice logout triggered');
      // Perform logout logic
      localStorage.removeItem('token');
      navigate('/login');
    };

    // Listen for voice-triggered volunteer call
    const handleVolunteerCall = () => {
      console.log('Volunteer call triggered');
      // Open volunteer modal or initiate call
      window.open('tel:+911234567890');
    };

    window.addEventListener('voice-logout', handleVoiceLogout);
    window.addEventListener('call-volunteer', handleVolunteerCall);

    return () => {
      window.removeEventListener('voice-logout', handleVoiceLogout);
      window.removeEventListener('call-volunteer', handleVolunteerCall);
    };
  }, [navigate]);

  return (
    <div>
      <VoiceCommandAssistant />
    </div>
  );
}

// ============================================
// Example 3: Conditional Rendering
// ============================================
export function ConditionalIntegration({ userRole }) {
  // Only show voice assistant for certain roles
  const showVoiceAssistant = userRole === 'user' || userRole === 'admin';

  return (
    <div>
      {showVoiceAssistant && <VoiceCommandAssistant />}
    </div>
  );
}

// ============================================
// Example 4: Floating Voice Button
// ============================================
export function FloatingVoiceButton() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <VoiceCommandAssistant />
    </div>
  );
}

// ============================================
// Example 5: Custom Voice Command Handler
// ============================================
export function CustomCommandHandler() {
  useEffect(() => {
    // Add custom command handling
    const handleCustomCommand = async (command) => {
      const lowerCommand = command.toLowerCase();

      // Custom command: "show statistics"
      if (lowerCommand.includes('show statistics')) {
        // Navigate to statistics page
        window.location.href = '/statistics';
      }

      // Custom command: "export data"
      if (lowerCommand.includes('export data')) {
        // Trigger data export
        console.log('Exporting data...');
      }
    };

    // You can extend the voice assistant with custom logic
    window.addEventListener('voice-command-received', (e) => {
      handleCustomCommand(e.detail.command);
    });

    return () => {
      window.removeEventListener('voice-command-received', handleCustomCommand);
    };
  }, []);

  return <VoiceCommandAssistant />;
}

// ============================================
// Example 6: Voice Assistant with Context
// ============================================
export function ContextAwareVoiceAssistant({ currentPage, userData }) {
  useEffect(() => {
    // Send context to voice assistant
    const context = {
      page: currentPage,
      user: userData.name,
      role: userData.role
    };

    // Store context for voice assistant to use
    sessionStorage.setItem('voiceContext', JSON.stringify(context));
  }, [currentPage, userData]);

  return <VoiceCommandAssistant />;
}

// ============================================
// Example 7: Programmatic Voice Control
// ============================================
export function ProgrammaticControl() {
  const startListening = () => {
    // Trigger voice assistant programmatically
    const micButton = document.querySelector('.mic-button');
    if (micButton) {
      micButton.click();
    }
  };

  return (
    <div>
      <button onClick={startListening}>
        Start Voice Assistant
      </button>
      <VoiceCommandAssistant />
    </div>
  );
}

// ============================================
// Example 8: Voice Assistant in Modal
// ============================================
export function VoiceAssistantModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">×</button>
        <VoiceCommandAssistant />
      </div>
    </div>
  );
}

// ============================================
// Example 9: Multi-Language Voice Assistant
// ============================================
export function MultiLanguageVoiceAssistant({ preferredLanguage }) {
  useEffect(() => {
    // Set preferred language for voice assistant
    localStorage.setItem('voiceLanguage', preferredLanguage);
  }, [preferredLanguage]);

  return <VoiceCommandAssistant />;
}

// ============================================
// Example 10: Voice Assistant with Analytics
// ============================================
export function VoiceAssistantWithAnalytics() {
  useEffect(() => {
    // Track voice command usage
    const trackVoiceCommand = (command) => {
      // Send to analytics
      console.log('Voice command used:', command);
      
      // Example: Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', 'voice_command', {
          command: command,
          timestamp: new Date().toISOString()
        });
      }
    };

    window.addEventListener('voice-command-received', (e) => {
      trackVoiceCommand(e.detail.command);
    });

    return () => {
      window.removeEventListener('voice-command-received', trackVoiceCommand);
    };
  }, []);

  return <VoiceCommandAssistant />;
}

// ============================================
// Usage in App.jsx
// ============================================
/*
import VoiceCommandAssistant from './components/VoiceCommandAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={
          <div>
            <Dashboard />
            <VoiceCommandAssistant />
          </div>
        } />
      </Routes>
    </Router>
  );
}
*/

// ============================================
// Custom Styling Example
// ============================================
/*
// In your CSS file:
.voice-command-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

// Compact version
.voice-command-container.compact {
  width: 80px;
}

.voice-command-container.compact .voice-command-card {
  padding: 1rem;
}

// Dark theme
.voice-command-container.dark .voice-command-card {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}
*/

export default {
  BasicIntegration,
  CustomEventIntegration,
  ConditionalIntegration,
  FloatingVoiceButton,
  CustomCommandHandler,
  ContextAwareVoiceAssistant,
  ProgrammaticControl,
  VoiceAssistantModal,
  MultiLanguageVoiceAssistant,
  VoiceAssistantWithAnalytics
};
