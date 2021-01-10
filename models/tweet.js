const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema=new Schema({
    content:{
        type: String,
        required: true
    },

    creator:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    likes: {
        type: Number,
        default: 0,
    },

    retweets: {
        type: Number,
        default: 0,
    },

    replies:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Reply'
        }
    ],

    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    retweetedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    imageUrl: {
        type: String
    }
},
{ timestamps: true })


module.exports.tweetSchema = tweetSchema;
module.exports = mongoose.model('Tweet',tweetSchema);