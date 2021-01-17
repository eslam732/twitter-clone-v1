// const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePictue: {
        type: String
    },
    private:{
type:Boolean,
default:false
    },
    recivedRequestedFollows:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    sentFollowRequests:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    bio: {
        type: String
    },
    city: {
        type: String
    },
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    tweets:[{
        type:Schema.Types.ObjectId,
        ref:"Tweet"
    }],
    reTweets:[{
        type:Schema.Types.ObjectId,
        ref:"Tweet"
    }],
    replies:[{
        type:Schema.Types.ObjectId,
        ref:"Reply"
    }],
    
    
    likes:[
        {
            type:Schema.Types.ObjectId,
            ref:"Tweet"
        }
    ]

},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
