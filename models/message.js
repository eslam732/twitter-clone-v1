const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String
    ,
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reciver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    imageUrl: {
        type: String
    },
    messageOnimage: String,
    chatId:{
        type: Schema.Types.ObjectId,
        ref: "Chat"
        
    }
}, { timestamps: true });


module.exports = mongoose.model('Message',messageSchema);