require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

// Don't forget correct paths relative to this file
const authRoutes = require('./Routes/authRoutes');
const questionRoutes = require('./Routes/questionRoutes');
const answerRoutes = require('./Routes/answerRoutes');
app.use(cors({
  origin: 'https://peer-learning-cyan.vercel.app/',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);



const mongoose = require('mongoose');

// 
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
  });

