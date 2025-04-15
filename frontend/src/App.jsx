import React, { useEffect } from 'react';
import socket from './socket';

function App() {
  useEffect(() => {
    console.log('Connecting to socket...');

    socket.on('connect', () => {
      console.log('✅ Connected to server with ID:', socket.id);
    });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🎉 React App Connected to WebSocket</h2>
      <p>Check the browser console and server terminal.</p>
    </div>
  );
}

export default App;
