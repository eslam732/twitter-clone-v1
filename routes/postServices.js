const express =require('express');
const router=express.Router();
const isAuth=require('../helper/isAuth');

const postServices=require('../controllers/tweetServices');
const uploadImage=require('../helper/uploadImage');


router.put('/createcomment',isAuth,uploadImage.single('image'),postServices.createComment);
router.get('/getpostcomments',isAuth,postServices.getPostComments);
router.get('/getreplyies',isAuth,postServices.getReplyies);
router.post('/like',isAuth,postServices.likePost)
module.exports = router;