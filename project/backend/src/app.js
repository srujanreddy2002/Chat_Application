const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socket = require('./utils/socket');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { errorHandler } = require('./utils/errorHandler');
const { PORT, DB_URI } = require('dotenv').config({ path: '../.env' });
;

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    socket.init(server);
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(err));
