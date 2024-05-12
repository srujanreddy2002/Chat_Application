import React, { useState, useEffect } from 'react';
import Message from './Message';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from backend
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3000/chat/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
