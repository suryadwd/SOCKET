const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');


app.use(cors());

const server = http.createServer(app);  //app to server convert

const io = new Server(server, {
  cors:{
    origin:"*",
    methods:["GET", "POST"],
  }
})

io.on("connection",(socket)=>{
  console.log("New user connected", socket.id);

  socket.on("send_message",(data) => {
    console.log("Messgae recieved", data);

    io.emit("receive_message", data); 
  })

  socket.on("typing", (data) => {
    console.log("Typing event", data);
    socket.broadcast.emit("typing", data); // send to all except sender
  })

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  })

})

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})