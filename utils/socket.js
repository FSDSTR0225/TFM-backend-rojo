const { Server } = require("socket.io");
const express = require("express");
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: [process.env.SOCKET_URL || "http://localhost:5173"],
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