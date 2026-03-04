import { useState } from 'react';
import { loginWithEmail } from '../services/authService';

function TestLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const handleTest = async (e) => {
    e.preventDefault();
    
    console.log('🧪 Testing login...');
    
    try {
      const res = await loginWithEmail(email, password);
      console.log('✅ Result:', res);
      setResult(res);
      
      if (res.success && res.role === 'user') {
        console.log('🎯 User role detected! Redirecting in 2 seconds...');
        setTimeout(() => {
          console.log('🚀 Redirecting to http://localhost:3000');
          window.location.href = 'http://localhost:3000';
        }, 2000);
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setResult({ error: err.message });
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>🧪 Login Test Page</h1>
      
      <form onSubmit={handleTest} style={{ marginTop: '30px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          />
        </div>
        
        <button 
          type="submit"
          style={{ 
            padding: '12px 30px', 
            background: '#0F172A', 
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Test Login
        </button>
      </form>
      
      {result && (
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: result.error ? '#fee' : '#efe',
          borderRadius: '8px'
        }}>
          <h3>Result:</h3>
          <pre style={{ fontSize: '14px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📋 Checklist:</h3>
        <ol>
          <li>User dashboard running on <code>localhost:3000</code>?</li>
          <li>Firebase Authentication enabled?</li>
          <li>Firestore database created?</li>
          <li>User role set to "user" in Firestore?</li>
        </ol>
      </div>
    </div>
  );
}

export default TestLogin;
