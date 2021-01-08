const express=require('express');

const postController=require('../controllers/post');
const isAuth=require('../helper/isAuth');
const uploadImage=require('../helper/uploadImage');

const router=express.Router();

router.put('/createpost',isAuth,uploadImage.single('image'),postController.createPost);
router.get('/getposts',isAuth,postController.getPosts);
router.delete('/deletepost',isAuth,postController.deletePost);

module.exports = router;