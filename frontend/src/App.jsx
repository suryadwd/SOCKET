import React, { useEffect, useState } from 'react';
import socket from './socket';

function App() {

  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    console.log('Connecting to socket...');

    socket.on('connect', () => {
      console.log('✅ Connected to server with ID:', socket.id);
    });

    socket.on('receive_message', (data) => {
      console.log('Message received from server:', data);
      setAllMessages( p => [...p, data]);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server with ID:', socket.id);
    }
    );

  }, []);

  const sendMessage = () => {
    const messageData = {
      id:socket.id,
      text: message,
    }
    socket.emit('send_message', messageData);
    setMessage('');
  }

  const handleEnterClick = (e) => {
    if(e.key === "Enter") sendMessage()
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🎉 React App Connected to WebSocket</h2>
      <h1>Your all messages are being displayed here</h1>
      {
        allMessages.map(((indx ) => {
          return (
            <div key={indx.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', width: '400px', borderRadius: '5px' }}>
              <strong>Message ID:</strong> {indx.id} <br />
              <strong>Message:</strong> {indx.text}
            </div>
          )
        }))
      }
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <input 
        type="text"
        value = {message} 
        onKeyDown={handleEnterClick}
        onChange={ e => setMessage(e.target.value)}
        placeholder="Type your message here..."
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}  
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
