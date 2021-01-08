const bcrypt = require('bcryptjs');
const User = require('../models/user');
//const { body, validationResult, check } = require('express-validator/check');
const emailValidator = require("email-validator");
const jwt=require('jsonwebtoken');



exports.signUp = async (req, res, next) => {
  
    const email = req.body.email;
    const password = req.body.password;
    
    const name = req.body.name;
   // const regChecker=RegExp('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
  const emailCheck=await emailValidator.validate(email);
  if(!emailCheck){
      return res.status(422).json({
message:"please enter a valid Email"
      });
  }
  const us = await User.findOne({ email: req.body.email })

    
    if (us) {
        return res.status(422).json({
            message: "email is allready exist"
        })
    }
if(password.length<5){
    return res.status(422).json({
        message:"please enter a Strong Password"
              });
}
    
    
 // console.log('here', req.body.password);
  
    try {
        const decryptedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: decryptedPassword,
            name: name
        });
        userResult = await user.save();

        res.status(201).json({ message: 'user created', usrId: userResult._id });


    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.logIn=async(req,res,next)=>{

    const email=req.body.email;
    const password=req.body.password;
    
    const emailCheck=await emailValidator.validate(email);
    if(!emailCheck){
        return res.status(422).json({
  message:"please enter a valid Email"
        });
    }
    if(password===undefined){
        return res.status(422).json({
            message:"please enter a the password"
                  });
    }
    const user=await User.findOne({email:email});
    if(!user){
        return res.status(404).json({message:'email was not Founde'});  
    };
  const checkPassword=await bcrypt.compare(password,user.password);
  if(!checkPassword){
    return res.status(404).json({message:'inncorect Password'});   
  }
const token=jwt.sign({
    email:user.email,
    usrId:user._id.toString()
},
'mySecret',


);
return res.status(200).json({token:token,userId:user._id.toString()});
}