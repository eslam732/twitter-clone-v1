const User = require('../models/user');



exports.followUser=async(req,res,next)=>{

    const followedUserId=req.body.followedUserId;

    if(!followedUserId){
        return res.status(400).json({message:'Id is required'});
    }

    try{
    
        const currentUser=await User.findById(req.userId);
        
        const follwoedUser= await User.findById(followedUserId);
        
        if(!follwoedUser||!currentUser){
            return res.status(404).json({message:"user wasa not found"});
        }
        console.log('here',req.userId)
         currentUser.followings.push(followedUserId);
         follwoedUser.followers.push(req.userId);
       currentUser.save();
       follwoedUser.save();
        res.status(201).json({message:"succeed",followUser:follwoedUser})
    }catch(error){
  console.log('error',error)
    }
}


exports.unFollow=async(req,res,next)=>{

const unFollowedId=req.body.unFollowedId;
if(!unFollowedId){
    return res.status(402).json({message:"User ID is required"});
}

try{

    let unFollowedUser=await User.findById(unFollowedId);
    let currentUser=await User.findById(req.userId);
    if(!unFollowedUser||!currentUser){
        return res.status(402).json({message:"user was not found"});
    }
    unFollowedUser.followers.pull(req.userId);
    currentUser.followings.pull(unFollowedId);
    res.status(200).json({message:"unfollowed"});
    unFollowedUser.save();
    currentUser.save();

    
}catch(error){
    console.log(error);
}


}