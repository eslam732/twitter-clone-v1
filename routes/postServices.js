const express =require('express');
const router=express.Router();
const isAuth=require('../helper/isAuth');

const postServices=require('../controllers/postServices');
const uploadImage=require('../helper/uploadImage');


router.put('/createcomment',isAuth,uploadImage.single('image'),postServices.createComment);
router.get('/getpostcomments',isAuth,postServices.getPostComments);

module.exports = router;