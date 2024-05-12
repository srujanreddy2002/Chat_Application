const Message = require('../models/Message');
const User = require('../models/User');
const { generateResponse } = require('../services/chatService');

exports.sendMessage = async (req, res) => {
  try {
    const { sender, recipient, content } = req.body;
    const senderUser = await User.findById(sender);
    const recipientUser = await User.findById(recipient);
    
    if (senderUser.status === 'BUSY') {
      const response = await generateResponse(content);
      await Message.create({ sender, recipient, content: response });
      return res.status(200).json({ message: 'User is busy', response });
    }
    
    const message = await Message.create({ sender, recipient, content });
    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
