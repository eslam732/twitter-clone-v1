const express=require('express');
const isAuth=require('../../helper/isAuth');
const messageController=require('../../controllers/messages');
const router=express.Router();

router.post('/sendmessage',isAuth,messageController.sendMessage);
router.get('/getmessage',isAuth,messageController.getMessages);
router.get('/getchat',isAuth,messageController.getChatByUser);

module.exports = router;