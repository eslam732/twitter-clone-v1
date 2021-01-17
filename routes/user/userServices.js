const isAuth = require('../../helper/isAuth');

const router =require('express').Router();
const userServicesControllers=require('../../controllers/userServices');



router.put('/follow',isAuth,userServicesControllers.followUser);
router.post('/unfollow',isAuth,userServicesControllers.unFollow);
router.get('/getuserprofile',isAuth,userServicesControllers.getUserProfile);
router.get('/getpersonalprofile',isAuth,userServicesControllers.getPersonalProfile);
router.put('/followactions',isAuth,userServicesControllers.followRequestActions);

module.exports = router;
