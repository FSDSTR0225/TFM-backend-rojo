const Message = require("../models/message");
const cloudinary = require('../utils/cloudinaryService');
const User = require("../models/userModel");
const { getReceiverSocketId, io } = require("../utils/socket");

module.exports = {
    getUsers: async (req, res) => {
        try {
            const userLogged = req.user.id;
            
            const messages = await Message.find({
                $or: [
                    { senderId: userLogged },
                    { receiverId: userLogged }
                ]
            });

            const userIds = new Set();
            messages.forEach((message) => {
                if (message.senderId !== userLogged) {
                    userIds.add(message.senderId);
                }
                if (message.receiverId !== userLogged) {
                    userIds.add(message.receiverId);
                }
            });

            const filteredUsers = await User.find({ _id: { $in: Array.from(userIds), $ne: userLogged } }).select("-password");
            res.status(200).json(filteredUsers);
        } catch (error) {
            console.log("Error al obtener los usuarios:", error);
            res.status(500).json({ message: "Error interno en el servidor" });
        }
    },
    getMessages: async (req, res) => {
        try {
            const { id } = req.params;
            const userlogged = req.user.id;

            const messages = await Message.find({
                $or: [
                    { senderId: userlogged, receiverId: id },
                    { senderId: id, receiverId: userlogged }
                ]
            })
            res.status(200).json(messages);
        } catch (error) {
            console.log("Error al obtener los mensajes:", error);
            res.status(500).json({ message: "Error interno en el servidor" });
        }
    },
    sendMessage: async (req, res) => {
        try {
            const { text, image } = req.body;
            const { id: receiverId } = req.params;
            const senderId = req.user.id;
            let imageUrl;
            if(image){
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                text,
                image:imageUrl
            });

            await newMessage.save();

            //RealTime Funcionality goes here => socket.io
            const senderUser = await User.findById(senderId).select("-password");
            const receiverUser = await User.findById(receiverId).select("-password");

            const receiverSocketId = getReceiverSocketId(receiverId);
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage", {
                    ...newMessage.toObject(),
                    sender: senderUser,
                });
                io.to(receiverSocketId).emit("getNotification", {
                    senderId: senderId,
                    senderName: senderUser.name,
                    receiverId: receiverId,
                    receiverName: receiverUser.name,
                    type: 1,
                    user: {
                        _id: senderUser._id,
                        name: senderUser.name,
                        role: senderUser.role,
                        roles: senderUser.roles,
                        avatar: senderUser.avatar,
                        email: senderUser.email
                    }
            });
            } 

            res.status(201).json(newMessage);
        } catch (error) {
            console.log("Error al enviar el mensaje:", error);
            res.status(500).json({ message: "Error interno en el servidor" });
        }
    }
}