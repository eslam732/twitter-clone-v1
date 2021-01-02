const express =require('express');
const {body}=require('express-validator/check');

const authController=require('../controllers/auth');

const User=require('../models/user');

const router=express.Router();

router.put('/signup',[
    body('email').isEmail().withMessage('please Enter a valid email').custom((value,{req,res})=>{
        return User.findOne({email:vlaue}).then(userDoc=>{
            if(userDoc){return res.status(400).json({message:'error'});}
            
        });
    }).normalizeEmail()
    ,
    body('password').trim().isLength({min:5}),
],authController.signUp);

module.exports = router;