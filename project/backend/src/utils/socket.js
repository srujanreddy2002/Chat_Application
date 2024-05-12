const socketio = require('socket.io');
const User = require('../models/User');

let io;

exports.init = (server) => {
  io = socketio(server);
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('setOnlineStatus', async (userId, status) => {
      try {
        await User.findByIdAndUpdate(userId, { status });
        io.emit('onlineStatusChanged', { userId, status });
      } catch (error) {
        console.error('Error setting online status:', error.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
};

exports.getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
