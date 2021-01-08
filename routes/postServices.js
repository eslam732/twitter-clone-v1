const express =require('express');
const router=express.Router();
const isAuth=require('../helper/isAuth');

const postServices=require('../controllers/postServices');


router.put('/createcomment',isAuth,postServices.createComment);
router.get('/getpostcomments',isAuth,postServices.getPostComments);

module.exports = router;