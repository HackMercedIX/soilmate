// ChatInput.js
import React, { useState } from 'react';
import './Chat.css'; // Ensure this path is correct for your CSS styles

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendClick = () => {
    onSendMessage(message);
    setMessage(''); // Clear the input field after sending
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    // Log the key press for debugging (optional, can be removed in production)
    console.log(event.key); 
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default action to avoid submitting a form
      handleSendClick();
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="text-input"
      />
      <button onClick={handleSendClick} className="send-button">
        Send
      </button>
    </div>
  );
}

export default ChatInput;
