const { string } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({


    imageUrl:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    comments:[{
        type:String,
        creator:Schema.Types.ObjectId,
        ref:"User"

    }],
    likes:{
        numberOfLikes:{default:0,type:Number},
        usersIkes:[{
            type:Schema.Types.ObjectId,
            ref:"User"
        }]
    }
})

module.exports = mongoose.model('Post',postSchema);