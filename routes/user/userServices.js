const isAuth = require('../../helper/isAuth');

const router =require('express').Router();
const userServicesControllers=require('../../controllers/userServices');



router.put('/follow',isAuth,userServicesControllers.followUser);
router.post('/unfollow',isAuth,userServicesControllers.unFollow);


module.exports = router;
