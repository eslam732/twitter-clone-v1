const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String
    },
    tweetOfReply: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    imageUrl:{
        type:String
    },
    replyOnReply: {
          status:{type:Boolean,
            default:false},
       replyingOn:{ type: Schema.Types.ObjectId,
        ref: "Reply"}
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    replies:[{
        type:Schema.Types.ObjectId,
        ref:"Reply"
    }],
    replyingTo: [{
        type: String,
        required: true
    }],
    likes:{
        numberOfLikes:{default:0,type:Number},
        usersLikes:[{
            type:Schema.Types.ObjectId,
            ref:"User"
        }]
    },

    quotedTweets:{
        numberOfQuotes:{default:0,type:Number},
        quotedBy:[{
            type:Schema.Types.ObjectId,
            ref:"User"
        }],
        quotes:[
            {
                type:Schema.Types.ObjectId,
                ref:"Tweet"  
            }
        ]
    }


});

module.exports = mongoose.model('Reply', commentSchema);








// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;


// const {tweetSchema} = require('./tweet');
// // Same Schema as Tweet + main Tweet

// const replySchema = tweetSchema.clone();

// replySchema.add({
//     mainTweet: {
//         required: true,
//         type: Schema.Types.ObjectId,
//         ref: 'Tweet'
//     }
// });

// module.exports = mongoose.model('Reply', replySchema);