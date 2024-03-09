import React, { useState } from 'react';
import './Chat.css';

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendClick = () => {
    onSendMessage(message);
    setMessage(''); // Clear the input field
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here..."
        className="text-input" // Refer to the class in your CSS
      />
      <button onClick={handleSendClick} className="send-button">
        Send
      </button>
    </div>
  );
}

export default ChatInput;
