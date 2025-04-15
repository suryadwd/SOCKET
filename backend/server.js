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

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  })

})

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})