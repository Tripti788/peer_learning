require('dotenv').config();

const express = require('express')
const app = express();
const cors = require('cors');
const port = 3000



const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/questions',questionRoutes);
app.use('/api/answers',answerRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(err => console.error(err));
