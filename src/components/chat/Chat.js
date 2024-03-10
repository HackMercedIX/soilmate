import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput'; // Ensure this path is correct for your project structure
import './Chat.css'; // Confirm this matches your project structure as well

function Chat() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref for auto-scrolling to the latest message

  const onSendMessage = (newMessage) => {
    if (newMessage.trim()) {
      // First, add the user's message to the chat
      setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);
      
      // Then, send the message to the Flask backend
      fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'message': newMessage }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("API Response:", data); // Log the response data to the browser's console
        // Add the response message from Flask to the chat
        setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'bot' }]);
      });
      //.catch(error => {
      //  console.error('Error:', error);
        // Optionally, add an error message to the chat for feedback
      //  setMessages(prevMessages => [...prevMessages, { text: "Error connecting to the bot.", sender: 'bot' }]);
      //});
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-header">
        <h2>SoilMate</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Invisible element to auto-scroll to */}
      </div>
      <ChatInput onSendMessage={onSendMessage} />
    </div> 
  );
}

export default Chat;
