const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Initialize Firebase Admin
admin.initializeApp();

// Create Express app
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'VAANI Backend is running!' });
});

// AI Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message, language } = req.body;
    
    // Simple response for now
    // You can integrate AWS Bedrock here later
    const response = {
      reply: `Received: ${message}`,
      language: language || 'en',
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Voice processing endpoint
app.post('/voice', async (req, res) => {
  try {
    const { audioData } = req.body;
    
    // Voice processing logic here
    res.json({ 
      success: true,
      message: 'Voice processed successfully'
    });
  } catch (error) {
    console.error('Voice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User management endpoints
app.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(userDoc.data());
  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Complaints endpoints
app.post('/complaints', async (req, res) => {
  try {
    const complaintData = req.body;
    const docRef = await admin.firestore().collection('complaints').add({
      ...complaintData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending'
    });
    
    res.json({ 
      success: true, 
      complaintId: docRef.id 
    });
  } catch (error) {
    console.error('Complaint creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/complaints/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await admin.firestore()
      .collection('complaints')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const complaints = [];
    snapshot.forEach(doc => {
      complaints.push({ id: doc.id, ...doc.data() });
    });
    
    res.json(complaints);
  } catch (error) {
    console.error('Complaints fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the API
exports.api = functions.https.onRequest(app);
