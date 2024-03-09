// Chat.js

import React, { useState } from 'react';
import ChatInput from './ChatInput'; // Make sure to import ChatInput
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);

  const onSendMessage = (newMessage) => {
    if (newMessage.trim()) {
      // Here we add an object instead of a string to include who sent the message
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <h2>SoilMate</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          // Here we add a conditional class based on who sent the message
          <div key={index} className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default Chat;

