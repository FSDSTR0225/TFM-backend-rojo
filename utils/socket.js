const { Server } = require("socket.io");
const express = require("express");
const http = require('http');

const app = express();
const server = http.createServer(app);



// Configurar orígenes permitidos para Socket.io - Incluir específicamente Netlify
const allowedOrigins = [
    "https://codepply.netlify.app", // Frontend en Netlify (PRODUCCIÓN)
    process.env.SOCKET_URL, // Variable de entorno
    "http://localhost:3000", // React development
    "http://localhost:5173", // Vite development
    "http://localhost:4173", // Vite preview
    "http://127.0.0.1:5173", // Vite alternativo
].filter(Boolean);

const io = new Server(server,{
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true
    }
})

function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

const userSocketMap = {};
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    //emit
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on("sendNotification", ({ senderName, receiverId, receiverName, type }) => {
        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log("Notificación enviada a:", receiverSocketId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("getNotification", {
                senderName,
                receiverName,
                type,
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})
module.exports = { io, server, app, getReceiverSocketId };