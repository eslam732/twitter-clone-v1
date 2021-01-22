const fs = require('fs');
const path = require('path');

const cloudinary = require('../helper/cloudinaryUpload');
const User = require('../models/user');
const MessageModel = require('../models/message');
const ChatModel = require('../models/chats');
const user = require('../models/user');


const sendMessage = async (req, res, next) => {

    const textMessage = req.body.textMessage;
    const reciverId = req.body.reciverId;
    const chatId = req.body.chatId;
    let chat;
    let message;

    if (!textMessage) {
        return res.status(400).json({ message: "textMessage is required" });
    }
    if (!chatId && !reciverId) {
        return res.status(400).json({ message: "chatId or reciverId are required" });
    }

    try {


        if (chatId) {
            const chat = await ChatModel.findById(chatId);
            if (!chat) {
                return res.status(400).json({ message: "chat not found" });
            }
            message = new MessageModel({
                message: textMessage,
                sender: req.userId,
                chatId: chatId
            });
            chat.messages.push(message._id);
            chat.save();
            message.save();
            return res.status(200).json({ message: message });


        }

        if (reciverId) {
            const currentUser = await User.findById(req.userId);
            const reciver = await User.findById(reciverId);
            if (!reciver) {
                return res.status(400).json({ message: "reciver not found" });
            }
            chat = new ChatModel({
                users: [req.userId, reciverId],

            })
            message = new MessageModel({
                message: textMessage,
                sender: req.userId,
                chatId: chat._id
            });
            chat.messages.push(message._id);
            res.status(200).json({ message: message });
            currentUser.chats.push(chat._id);
            reciver.chats.push(chat._id);
            currentUser.save();
            reciver.save();

            chat.save();
            message.save();



        }

    } catch (error) {
        console.log(error)
    }
}

const getMessages = async (req, res, next) => {
    const chatId = req.body.chatId;
    let chat;
    if (!chatId) {
        return res.status(400).json({ message: "chatId is required" })
    }
    try {
        caht = await ChatModel.findById(chatId).populate('messages');
        if (!caht) {
            return res.status(400).json({ message: "chat not found" })
        }

        res.status(200).json({ message: caht });

    } catch (error) {
        console.log(error)
    }
}


const getChatByUser = async (req, res, next) => {
    const reciverId = req.body.reciverId;
    if (!reciverId) {
        return res.status(400).json({ message: "reciverId is required" })
    }
    try {

        const reciver = await User.findById(reciverId);
        if (!reciver) {
            return res.status(400).json({ message: "reciver not found" })
        }
        //let chatExist=false;
        let chats = await ChatModel.find({ users: [(req.userId.toString()), reciverId] });
        console.log(reciverId.toString())
        if (chats.length === 0) {
            console.log('hhhhhhhhhhhhh')
            chats = await ChatModel.find({ users: [reciverId, (req.userId.toString())] });
        }
        console.log('chaaaa', chats);
        return res.status(200).json({ caht: chats })
    } catch (error) {
        console.log(error)
    }
}

const getAllChats = async (req, res, next) => {
    try {

        const chats = await User.findById(req.userId).populate('chats');
        return res.status(200).json({ chats: chats });

    } catch (error) {

    }
}

const createGroup = async (req, res, next) => {
    const users = req.body.users;
    try {

        const chat = new ChatModel({
            users: users,
            group:true,
            groupData:{admins:[req.userId]}

        });

        return res.status(201).json({chat:chat});
 
    }
    catch (error) {

    }
}



module.exports = {
    sendMessage,
    getMessages,
    getChatByUser,
    getAllChats,
    createGroup,
}