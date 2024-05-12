import React from 'react';

const Message = ({ message }) => {
  return (
    <div>
      <p>{message.sender}: {message.content}</p>
    </div>
  );
};

export default Message;
