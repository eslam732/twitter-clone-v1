const Post = require('../models/tweet');
const User = require('../models/user');
const CommetModel = require('../models/reply');
const cloudinary = require('../helper/cloudinaryUpload');


const createComment = async (req, res, next) => {

    const content = req.body.content;
    const replyingTo = req.body.replyingTo;
    const tweetId = req.body.tweetId;

    const replyId = req.body.replyId;
    var imageC = '';
    let tweet;
    let repliedReply;

    try {

        if (content === undefined || replyingTo === undefined) {

            return res.status(422).json({ message: "Make sure that the content is not empty and replying to someOne" });
        }
        if (tweetId === undefined && replyId === undefined) {
            return res.status(422).json({ message: "need an id for the tweet or the comment" });

        }

        if (tweetId) tweet = await Post.findById(tweetId);

        if (replyId) repliedReply = await CommetModel.findById(replyId);
        
        if (!tweet && !repliedReply) {
            return res.status(402).json({ message: "Post or reply was not found" });
        }
        if (req.file) {
            //imageUrl = req.file.path;
            //result= await cloudinary.uploader.upload(req.file.path);
            //console.log("ressssssssss",result);
            result = await cloudinary.uploadImageToCloudinary(req.file.path);
            //console.log('rrrrrrrr',result);
            imageC = result.url;

        }
        var reply;

        if (tweet) {
            // console.log('ttttttttttttttt',tweet)
            reply = new CommetModel({
                content: content,
                tweetOfReply: tweetId,
                creator: req.userId,
                imageUrl: imageC,
                replyingTo: replyingTo
            });
        }

        if (repliedReply) {
            reply = new CommetModel({
                content: content,
                replyOnReply: replyId,
                creator: req.userId,
                imageUrl: imageC,
                replyingTo: replyingTo
            });

        }

        await reply.save();


        console.log('repliedReply',req.userId)
        if (tweet) {
            await tweet.replies.push(reply);
            await tweet.save();
        }
        if (repliedReply) {
            await repliedReply.replies.push(reply);
            await repliedReply.save();
        }
        res.status(201).json({ message: "comment created", comment: reply });


    } catch (error) {  console.log(error);
        return res.status(500).json({ message: "server error" ,error:error});
      
    }
}

const getPostComments = async (req, res, next) => {
    const postId = req.body.postId;
    if (!postId) {
        return res.status(422).json({ message: 'post id is not provided' })
    }

    try {


        post = await Post.findById(postId);
        if (!post) {
            return res.status(422).json({ message: 'post was not found' })
        }
        comments = await CommetModel.find().where({ tweetOfReply: postId })
        res.status(200).json({
            message: "post found",
            comments: comments
        })
    } catch (error) {
        return res.status(500).json({ message: 'server error' })
    }

}

const getReplyies = async (req, res, next) => {
    const tweetId = req.body.tweetId;
    if (!tweetId) {
        return res.status(422).json({ message: 'tweet id is not provided' })
    }

    try {


       var comment = await CommetModel.findById(tweetId);
        if (!comment) {
            return res.status(422).json({ message: 'comment was not found' })
        }
       var comments = await CommetModel.find().populate('replies', { content: 1 }).sort({ createdAt: -1 }).where({ replyOnReply: tweetId })
        res.status(200).json({
            message: "post found",
            comments: comments
        })
    } catch (error) {
        return res.status(500).json({ message: 'server error' })
    }
}
const likePost =async (req, res, next) => {
    const tweetId = req.body.tweetId;
    const commentId = req.body.commentId;
    const quoteId = req.body.quoteId;
 
   if(!tweetId&&!commentId&&!quoteId){
   return res.status(200).json({
        message: "tweet id is required"
        
    });}
    
    try{
        
let tweet,comment,reply;
if(tweetId){
   
tweet=await Post.findById(tweetId);
//console.log("twwww",tweet)
if(!tweet)
{
return res.status(404).json({message:"tweet was not found"});
}

let exist=tweet.likedBy;
var flag=(exist.indexOf(req.userId.toString()))+1;
console.log('exxx',flag)
if(flag){
    
    tweet.likes--
    tweet.likedBy.pull(req.userId) 
}
else{
    tweet.likes++,
    tweet.likedBy.push(req.userId)
}



tweet.save()
return res.status(201).json({tweet:tweet})


}
if(commentId){
   
    comment=await CommetModel.findById(commentId);
    //console.log("twwww",tweet)
    if(!comment)
    {
    return res.status(404).json({message:"comment was not found"});
    }
    
    let exist=comment.likes.usersLikes;
    var flag=(exist.indexOf(req.userId.toString()))+1;
    
    if(flag){
        
        comment.likes.numberOfLikes--
        comment.likes.usersLikes.pull(req.userId) 
    }
   
    else{
        comment.likes.numberOfLikes++,
      comment.likes. usersLikes.push(req.userId)
    }
    
    
    
    comment.save()
    return res.status(201).json({comment:comment})
    
    
    }

    }catch(ereror){

    }
   }






module.exports = {
    createComment,
    getPostComments,
    getReplyies,
    likePost
}