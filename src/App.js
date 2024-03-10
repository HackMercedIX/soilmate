import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
// import Header from './components/header/header';

function App() {
  return (
    <div className="App background">
      {/* <Header/> */}
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
