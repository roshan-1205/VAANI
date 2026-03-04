import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Amplify } from 'aws-amplify'
// import outputs from '../amplify_outputs.json'
import App from './App.jsx'
import './index.css'

// Configure Amplify (commented out for now)
// Amplify.configure(outputs)

// console.log('✅ Amplify configured')
// console.log('Voice API URL:', outputs.custom?.voiceApiUrl)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
