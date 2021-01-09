const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt=require('jsonwebtoken');


const signup = async (req, res, next) => {
    // Required
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const fullname = req.body.fullname;
    // Optional
    const bio = req.body.bio || null;
    const city = req.body.city || null;
    const profilePictue = req.body.profilePictue || null;

    try {
        // Check If user already exists
        const userExists = await User.findOne({email: email});
        if (userExists) {
            return res.status(400).json({
                error: 'This Email already Exists, Try another one'
            });
        }

        // Here User doesn't exist and ready to be created ...

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Save the new User
        const user = new User({
            username,
            email,
            fullname,
            bio,
            city,
            profilePictue,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.status(201).json({
            msg: 'user created successfully :)',
            userId: savedUser._id
        });        
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }    
}


const login = async(req,res,next)=>{

    const email = req.body.email;
    const password = req.body.password;

    try {
        // First Check if user exists
        const user = await User.findOne({email: email});
        
        if(!user){
            return res.status(400).json({
                error: 'This email Doesn\'t Exist'
            });
        }
        // Here User exist
        // Let's Check password
        const isCorrect = await bcrypt.compare(password, user.password);
    
        if (!isCorrect) {
            return res.status(400).json({
                error: 'Password isn\'t correct'
            });
        }
        
        // Here Everything is Okay :)
        // Let's create a Token 
        const token = jwt.sign({
            email: user.email,
            username: user.username,
            _id: user._id
        },process.env.TOKEN_SECRET);
    
        //Send token to the Client in the response header
        res.header('auth-token', token);
        return res.status(200).json({msg: 'Logged in'});
        
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }   
}

module.exports = {
    login,
    signup
}