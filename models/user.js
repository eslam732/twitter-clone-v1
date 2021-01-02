const { ObjectId } = require('bson');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
     type:String,
     required:true
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }],
    
    retweets:[{
        type:Schema.Types.ObjectId,
        ref:'Retweet'
    }],
    

});

module.exports=mongoose.model('User',userSchema);
