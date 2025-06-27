const { Server } = require("socket.io");
const express = require("express");
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: [process.env.SOCKET_URL],
    credentials: true
}));

const io = new Server(server,{
    cors: {
        origin: [process.env.SOCKET_URL],
        methods: ["GET", "POST"]
    }
})

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};
io.on("connection",(socket)=>{
    console.log("Nuevo usuario conectado");

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    //emit
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("Usuario desconectado ",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})
module.exports = {io, server, app, getReceiverSocketId};