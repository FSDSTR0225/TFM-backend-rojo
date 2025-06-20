const { Server } = require("socket.io");
const express = require("express");
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
    }
})

const connectedUsers = new Map();

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;

    if(userId){
        connectedUsers.set(userId, socket.id);
         io.emit("getOnlineUsers", Array.from(connectedUsers.keys()));
    }
    console.log("Nuevo usuario conectado");
    socket.on("disconnect", () => {
        connectedUsers.delete(socket.id);
        console.log("Usuario desconectado ",socket.id);
         io.emit("getOnlineUsers", Array.from(connectedUsers.keys()));
    });
    socket.on("chat message", (msg) => {
        const receiverSocketId = connectedUsers.get(msg.receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("chat message", msg);
        }
    })
})
module.exports = {io, server, app};