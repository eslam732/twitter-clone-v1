const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profilePictue: {
        type: String
    },
    bio: {
        type: String
    },
    city: {
        type: String
    },
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "USer"
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "USer"
        }
    ],

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],

    retweets: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }],
    likedPost:[
        {
            type:Schema.Types.ObjectId,
            ref:"Post"
        }
    ]

},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
