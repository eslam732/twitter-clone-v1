const express =require('express');
const {body}=require('express-validator');

const authController=require('../controllers/auth');

const User=require('../models/user');

const router=express.Router();

router.put('/signup',[
    body('email').isEmail().withMessage('please Enter a valid email')
    .custom((value,{req})=>{
        return User.findOne({email:vlaue}).then(userDoc=>{
            if(userDoc){

                return Promise.reject('Email is allredy exist');

            }
        });
    }).normalizeEmail()
    ,
    body('password').trim().isLength()
],authController.signUp);

module.exports = router;