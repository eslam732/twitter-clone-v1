
const fs = require('fs');
const path = require('path');
const Post=require('../models/tweet');
const User=require('../models/user');
const cloudinary=require('../helper/cloudinaryUpload');
// var cloudinary=require('cloudinary').v2;
// cloudinary.config({
// cloud_name:'eaa04168',
// api_key:'272569683349881',
// api_secret:'Cdqg4M48LO5NrKHU3c-wcXZ669A'

// });


exports.createTweet=async(req,res,next)=>{

const content=req.body.content;
//var imageUrl='';
var imageC='';

var result;
if(content===undefined){
    return res.status(400).json({
        message:"content cant be empty"
    });
}

if(req.file) {
    //imageUrl = req.file.path;
//result= await cloudinary.uploader.upload(req.file.path);
//console.log("ressssssssss",result);
result=await cloudinary.uploadImageToCloudinary(req.file.path);
//console.log('rrrrrrrr',result);
imageC=result.url;

}
try{
  
    
   var post= new Post({
   content:content,
   imageUrl:imageC,
   creator:req.userId
     });
    // console.log('iiiiiiiiiiiiiii',req.file.filename)
      
     await post.save();
    // console.debug('pppppppp',req.file.path)
    if(req.file)fs.unlinkSync(req.file.path);

 

return res.status(201).json({
    message:"Post created",
    post:post,

})

}catch(error){
return res.status(500).json({message:error});
}


}
exports.getTweets=async(req,res,next)=>{
const currentPage=req.query.page||1;
const perPage=2;
let totalItmes;
var tweets;
try
{
 totalItmes=await Post.find().countDocuments();
 
tweets=await Post.find().populate('creator',{name:1}).sort({createdAt:-1}).skip((currentPage-1)*perPage).limit(perPage);

res.status(200).json({message:"tweets",tweets:tweets,totalItmes:totalItmes});

}catch(error){



}
}

exports.deleteTweet=async(req,res,next)=>{
const tweetId=req.body.tweetId;
console.log('post id ',tweetId)
try{
    var tweetResult=await Post.findById(tweetId);
    
    if(!tweetResult){
        return res.status(404).json({
            message:"Post was not Found"
        });
    }

    if(tweetResult.creator.toString()!==req.userId.toString()){
        
        return res.status(405).json({
            message:"Not allowed"
        });
    }
  
   await Post.findByIdAndRemove(tweetId);
    
    return res.status(202).json({
        message:"Deleted"
    })

}catch(error){
    res.status(500).json({
        message:error
    });
}



}