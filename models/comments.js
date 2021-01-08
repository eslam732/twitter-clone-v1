const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String
    },
    postOfComment: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    imageUrl:{
        type:String
    },
    replyOnComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    replyies:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }],
    replyingTo: [{
        type: String,
        required: true
    }]


});

module.exports = mongoose.model('Comment', commentSchema);