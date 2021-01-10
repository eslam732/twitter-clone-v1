const { string } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const quotedTweet=new Schema({
    quote:{
        type:String,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    likes:{
        numberOfLikes:{default:0,type:Number},
        usersLikes:[{
            type:Schema.Types.ObjectId,
            ref:"User"
        }]
    },
    originalPost:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }
},{timestamps:true});

module.exports = mongoose.model('Quote',quotedTweet);