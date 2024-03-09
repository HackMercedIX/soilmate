import React from 'react';
import './Chat.css';

function Chat() {
  return (
    <div className="chat">
      <div className="chat-header">
        <h2>ChatGPT</h2>
      </div>
      <div className="chat-messages">
        {/* Message components will go here */}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message here..." />
      </div>
    </div>
  );
}

export default Chat;
