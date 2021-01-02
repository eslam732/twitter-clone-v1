const bcrypt=require('bcryptjs');
const User=require('../models/user');
const { validationResult } = require('express-validator/check');




exports.signUp=async(req,res,next)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty){
    const error = new Error('validation failed');
    error.statusCode=422;
    error.data=errors.array();
    throw error;
}
    console.log('here',req.body.password);
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    try{
        const decryptedPassword=await bcrypt.hash(password,12);
        const user=new User({
            email:email,
            password:decryptedPassword,
            name:name
        });
        userResult=await user.save();
    
        res.status(201).json({message:'user created',usrId:userResult._id});
    
    
    }catch(error){
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
    
}