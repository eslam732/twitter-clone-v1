
const fs = require('fs');
const path = require('path');
const Post=require('../models/post');
const User=require('../models/user');

var cloudinary=require('cloudinary').v2;
cloudinary.config({
cloud_name:'eaa04168',
api_key:'272569683349881',
api_secret:'Cdqg4M48LO5NrKHU3c-wcXZ669A'

});


exports.createPost=async(req,res,next)=>{

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
result= await cloudinary.uploader.upload(req.file.path);
//console.log("ressssssssss",result);
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
var user=await User.findById(req.userId);
await user.posts.push(post);
 
await user.save();
return res.status(201).json({
    message:"Post created",
    post:post,

})

}catch(error){
return res.status(500).json({message:error});
}


}
exports.getPosts=async(req,res,next)=>{
const currentPage=req.query.page||1;
const perPage=2;
let totalItmes;
var posts;
try
{
 totalItmes=await Post.find().countDocuments();
 
posts=await Post.find().populate('creator',{name:1}).sort({createdAt:-1}).skip((currentPage-1)*perPage).limit(perPage);

res.status(200).json({message:"posts",posts:posts,totalItmes:totalItmes});

}catch(error){



}
}

exports.deletePost=async(req,res,next)=>{
const postId=req.body.postId;
console.log('post id ',postId)
try{
    var postResult=await Post.findById(postId);
    console.log('pppppppppppp',postResult)
    if(!postResult){
        return res.status(404).json({
            message:"Post was not Found"
        });
    }

    if(postResult.creator.toString()!==req.userId.toString()){
        console.log('reqidddddddddddddddddddddddd',req.userId)
        console.log('postddddddddddddddddddddddd',postResult.creator)
        return res.status(405).json({
            message:"Not allowed"
        });
    }
   console.log('heeeeeeeeeeeeeeee')
    deletedPost=await Post.findByIdAndRemove(postId);
    currentUser=await User.findById(req.userId);
    currentUser.posts.pull( postId);
    await currentUser.save();
    return res.status(202).json({
        message:"Deleted"
    })

}catch(error){
    res.status(500).json({
        message:error
    });
}



}