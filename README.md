# 💬 Live Typing Chat App (Socket.IO + React)

A simple real-time chat app built with **React** on the frontend and **Node.js + Express + Socket.IO** on the backend.

Features:
- ✅ Real-time messaging
- ✍️ Typing indicator
- 🟢 Online users list
- 🚀 Socket.IO magic

---

## 📁 Project Structure

```
.
├── client/           # React Frontend
│   ├── App.js
│   ├── socket.js
│   └── ...
├── server/           # Node.js Backend
│   ├── server.js
│   └── .env
└── README.md
```

---

## ⚙️ Tech Stack

- **Frontend**: React, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO
- **Extras**: dotenv, cors

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

> Create a `.env` file in the `server/` folder:
```
PORT=5000
```

Run the server:
```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Update `socket.js` with your server URL (e.g., `http://localhost:5000`):
```js
// client/socket.js
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
export default socket;
```

Run the frontend:
```bash
npm start
```

---

## 🧠 How It Works

- Each client connects to the server via Socket.IO.
- Messages are broadcast to all users.
- Typing notifications are emitted and shown for 1 second.
- Online users are tracked using socket IDs and updated live.

---

## ✨ Upcoming Features

- [ ] Username support
- [ ] Message timestamps
- [ ] Private messaging (DMs)
- [ ] Emoji / File support

---

## 🧑‍💻 Author

Made with ❤️ by **you**  
Connect: [LinkedIn](#) | [GitHub](#) | [Portfolio](#)

---

## 📜 License

This project is open-source. Use it, break it, improve it! ⚡