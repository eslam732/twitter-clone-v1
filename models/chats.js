
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    group: {
        type: Boolean,
        default: false
    },
    groupData: {
        admins: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        image: {
            type: String,
            default: null
        },
       
       


    }
    ,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]

});

module.exports = mongoose.model('Chat', chatSchema);