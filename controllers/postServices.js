const Post=require('../models/post');
const User=require('../models/user');
const CommetModel=require('../models/comments');

exports.createComment=async(req,res,next)=>{

    const content=req.body.content;
    const postId=req.body.postId;
    

    try{
       
        if(content===undefined||postId===undefined){
            return res.status(422).json({message:"Make sure that the content is not empty and you provide a pot ID"});
        }
        let post =await Post.findById(postId);
        if(!post){
            return res.status(402).json({message:"Post not found"});
        }

        const comment=new CommetModel({
            content:content,
            postOfComment:postId,
            creator:req.userId
        });
        await comment.save();


        var user=await User.findById(req.userId);
await user.comments.push(comment);
await user.save();
await post.comments.push(comment);
await post.save();
res.status(201).json({message:"comment created"});
        
    }catch(error){
        return res.status(500).json({message:"server error"});
    }
}

exports.getPostComments=async(req,res,next)=>{
    const postId=req.body.postId;
    if(!postId){
        return res.status(422).json({message:'post id is not provided'})
    }

    try{
      
    
        post=await Post.findById(postId);
        if(!post){
            return res.status(422).json({message:'post was not found'})
        }
        comments=await CommetModel.find().where({postOfComment:postId})
        res.status(200).json({
            message:"post found",
            comments:comments
        })
    }catch(error){
        return res.status(500).json({message:'server error'})
    }
    
}