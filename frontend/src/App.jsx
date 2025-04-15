import React, { useEffect, useState } from 'react';
import socket from './socket';


function App() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    console.log('Connecting to socket...');

    socket.on('connect', () => {
      console.log('Connected to server with ID:', socket.id);
    });

    socket.on('receive_message', (data) => {
      console.log('Message received from server:', data);
      setAllMessages((prev) => [...prev, data]);
    });

    socket.on('typing', (data) => {
      setTyping(`${data} is typing...`);
      setTimeout(() => {setTyping("")}, 1000);
    });

    socket.on("update_user_list", (users) => {
      console.log("Online users:", users);
      setOnlineUsers(users);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server with ID:', socket.id);
    });

  }, []);

  const sendMessage = () => {
    const messageData = {
      id: socket.id,
      text: message,
    };
    socket.emit('send_message', messageData);
    setMessage('');
  };

  const handleEnterClick = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleTyping = () => {
    socket.emit("typing", `User ${socket.id}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2> React App Connected to WebSocket</h2>
      <h1> Chat Messages</h1>

      {
        onlineUsers.length > 0 && (
          <div style={{ marginTop: '30px' }}>
       <h3>🟢 Online Users ({onlineUsers.length})</h3>
         <ul>
       {onlineUsers.map((id, i) => (
       <li key={i}>{id}</li>
        ))}
         </ul>
      </div>
        )
      }

      {allMessages.map((msg, index) => (
        <div key={index} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', width: '400px', borderRadius: '5px' }}>
          <strong>Message ID:</strong> {msg.id} <br />
          <strong>Message:</strong> {msg.text}
        </div>
      ))}

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            handleEnterClick(e);
            handleTyping();
          }}
          placeholder="Type your message here..."
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 15px', marginLeft: '10px' }}>
          Send
        </button>
      </div>

      {typing && <p style={{ color: 'gray', fontStyle: 'italic' }}>{typing}</p>}
    </div>
  );
}

export default App;
