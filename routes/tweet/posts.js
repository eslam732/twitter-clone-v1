const express=require('express');

const postController=require('../../controllers/tweets');
const isAuth=require('../../helper/isAuth');
const uploadImage=require('../../helper/uploadImage');

const router=express.Router();

router.put('/createpost',isAuth,uploadImage.single('image'),postController.createTweet);
router.get('/getposts',isAuth,postController.getTweets);
router.delete('/deletepost',isAuth,postController.deleteTweet);
router.put('/quotetweet',isAuth,uploadImage.single('image'),postController.quoteTweet)

module.exports = router;