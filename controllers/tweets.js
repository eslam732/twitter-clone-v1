
const fs = require('fs');
const path = require('path');
const Post = require('../models/tweet');
const User = require('../models/user');
const cloudinary = require('../helper/cloudinaryUpload');
const { error } = require('console');
// var cloudinary=require('cloudinary').v2;
// cloudinary.config({
// cloud_name:'eaa04168',
// api_key:'272569683349881',
// api_secret:'Cdqg4M48LO5NrKHU3c-wcXZ669A'

// });


const createTweet = async (req, res, next) => {

    const content = req.body.content;
    //var imageUrl='';
    var imageC = '';

    var result;
    if (content === undefined) {
        return res.status(400).json({
            message: "content cant be empty"
        });
    }

    if (req.file) {
        //imageUrl = req.file.path;
        //result= await cloudinary.uploader.upload(req.file.path);
        //console.log("ressssssssss",result);
        result = await cloudinary.uploadImageToCloudinary(req.file.path);
        //console.log('rrrrrrrr',result);
        imageC = result.url;

    }
    try {


        var post = new Post({
            content: content,
            imageUrl: imageC,
            creator: req.userId
        });
        // console.log('iiiiiiiiiiiiiii',req.file.filename)

        await post.save();
        // console.debug('pppppppp',req.file.path)
        if (req.file) fs.unlinkSync(req.file.path);



         res.status(201).json({
            message: "Post created",
            post: post,

        });
        let user=await User.findById(req.userId);
        user.tweets.push(post._id);
        user.save()

    } catch (error) {
        return res.status(500).json({ message: error });
    }


}


const quoteTweet = async (req, res, next) => {

    const content = req.body.content;
    const originalTweetId = req.body.originalTweetId;
    var imageC = '';
    var result;
    let exist = true;
    if (!content || !originalTweetId) {
        return res.status(400).json({ message: "content is required and the id for the original tweet" });
    };

    

    try {
        const originalTweet = await Post.findById(originalTweetId);
   // console.log(originalTweet)
    if (!originalTweet) exist = false;
    //onsole.log(originalTweet)

    if (req.file) {
        //imageUrl = req.file.path;
        //result= await cloudinary.uploader.upload(req.file.path);
        //console.log("ressssssssss",result);
        result = await cloudinary.uploadImageToCloudinary(req.file.path);
        //console.log('rrrrrrrr',result);
        imageC = result.url;

    }

        var quote = new Post({
            content: content,
            quoted:{status:true,originalTweet:originalTweetId},
           
            creator: req.userId,
            imageUrl: imageC,
        });
        if (req.file) fs.unlinkSync(req.file.path);
        
        quote.save();
        //console.log(quote)
        if (exist) {
            
            originalTweet.quotedTweets.numberOfQuotes++;
            // console.log( originalTweet.quotedTweets.numberOfQuotes++)

            originalTweet.quotedTweets.quotedBy.push(req.userId);
            originalTweet.save();
        }
        let currentUser= await User.findById(req.userId);
        //console.log('here',currentUser._id)
        currentUser.tweets.push(quote._id);
        return res.status(201).json({ message: "created", quote: quote, post: originalTweet })

    } catch (error) {
          console.log(error)
        return res.status(201).json({ message: error })

    }


}

const getTweets = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItmes;
    var tweets;
    try {
        var userTweets = await User.findById(req.userId).populate([{
            path: "followings", select: "tweets",
            options: { sort: { 'createdAt': -1 }, skip: (currentPage - 1) * perPage,
             limit: perPage ,
            populate:{path:"followings.tweets"}}
        }]);
        totalItmes = await Post.find().countDocuments();

        tweets = await Post.find().where().populate('creator', { name: 1 }).sort({ createdAt: -1 }).skip((currentPage - 1) * perPage).limit(perPage);

        res.status(200).json({ message: "tweets", tweets: tweets, totalItmes: userTweets });

    } catch (error) {



    }
}






const deleteTweet = async (req, res, next) => {
    const tweetId = req.body.tweetId;
    console.log('post id ', tweetId)
    try {
        var tweetResult = await Post.findById(tweetId);

        if (!tweetResult) {
            return res.status(404).json({
                message: "Post was not Found"
            });
        }

        if (tweetResult.creator.toString() !== req.userId.toString()) {

            return res.status(405).json({
                message: "Not allowed"
            });
        }

        await Post.findByIdAndRemove(tweetId);

        return res.status(202).json({
            message: "Deleted"
        })

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }



}


module.exports={
    createTweet,
    quoteTweet,
    deleteTweet,
    getTweets,
}