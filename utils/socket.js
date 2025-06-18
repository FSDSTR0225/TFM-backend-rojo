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
io.on("connection",(socket)=>{
    console.log("Nuevo usuario conectado");
    socket.on("disconnect", () => {
        console.log("Usuario desconectado ",socket.id);
    });
})
module.exports = {io, server, app};