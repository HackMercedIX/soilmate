import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Soil Mates</h1>
      </div>
      <div className="sidebar-item">+ New Chat</div>
      <div className="sidebar-item selected">Ask away any question...</div>
      <div className="sidebar-item">Persona Store</div>
    </div>
  );
}

export default Sidebar;
