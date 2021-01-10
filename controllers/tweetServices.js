const Post = require('../models/tweet');
const User = require('../models/user');
const CommetModel = require('../models/reply');
const cloudinary = require('../helper/cloudinaryUpload');


const createComment = async (req, res, next) => {

    const content = req.body.content;
    const replyingTo = req.body.replyingTo;
    const tweetId = req.body.tweetId;
    console.log('ttttttttttttttt',tweetId)
    const replyId = req.body.replyId;
    var imageC = '';

    try {

        if (content === undefined || replyingTo === undefined) {

            return res.status(422).json({ message: "Make sure that the content is not empty and replying to someOne" });
        }
        if (tweetId === undefined && replyId === undefined) {
            return res.status(422).json({ message: "need an id for the tweet or the comment" });

        }
        let tweet = await Post.findById(tweetId);
        let replyOnReply = await CommetModel.findById(replyId);
        if (!tweet && !replyOnReply) {
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
        let reply;
        if (tweet) {
            reply = new CommetModel({
                content: content,
                tweetOfReply: tweetID,
                creator: req.userId,
                imageUrl: imageC,
                replyingTo: replyingTo
            });
        }

        if (replyOnReply) {
            reply = new CommetModel({
                content: content,
                replyOnReply: replyId,
                creator: req.userId,
                imageUrl: imageC,
                replyingTo: replyingTo
            });

        }
        res.status(201).json({ message: "comment created", comment: reply });
        await reply.save();


        
        if (tweet) {
            await tweet.replies.push(reply);
            await tweet.save();
        }
        if (replyOnReply){
            await replyOnReply.replies.push(reply);
            await replyOnReply.save();
        }


    } catch (error) {
        return res.status(500).json({ message: "server error" });
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
        comments = await CommetModel.find().where({ postOfComment: postId })
        res.status(200).json({
            message: "post found",
            comments: comments
        })
    } catch (error) {
        return res.status(500).json({ message: 'server error' })
    }

}

const getReplyies=async(req,res,next)=>{
    const tweetId = req.body.tweetId;
    if (!tweetId) {
        return res.status(422).json({ message: 'tweet id is not provided' })
    }

    try {


        comment = await CommetModel.findById(tweetId);
        if (!comment) {
            return res.status(422).json({ message: 'comment was not found' })
        }
        comments = await CommetModel.find().populate('replyies',{content:1}).sort({createdAt:-1}).where({ replyOnComment: tweetId })
        res.status(200).json({
            message: "post found",
            comments: comments
        })
    } catch (error) {
        return res.status(500).json({ message: 'server error' })
    }
}
const likePost=(req,res,next)=>{
    const tweetId=req.body.tweetId;
    const commentId=req.body.commentId;
    const quoteId=req.body.quoteId;





}


module.exports = {
    createComment,
    getPostComments,
    getReplyies
}