const User = require('../models/user');



const followUser=async(req,res,next)=>{

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
        if(!follwoedUser.private){
            currentUser.followings.push(followedUserId);
            follwoedUser.followers.push(req.userId);
          currentUser.save();
          follwoedUser.save();
         return res.status(201).json({message:"followed",followUser:follwoedUser})
        }
        if(follwoedUser.private){
            currentUser.sentFollowRequests.push(followedUserId);
            follwoedUser.recivedRequestedFollows.push(req.userId);
            currentUser.save();
            follwoedUser.save();
            return res.status(201).json({message:"requested"})

        }
        
        
    }catch(error){
  console.log('error',error)
    }
}


const unFollow=async(req,res,next)=>{

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


const getUserProfile=async(req,res,next)=>{
  
    const userId=req.body.userId;
    if(!userId){
        return res.status(402).json({message:"userId is required"});
    }

    try{
     var userProfile=await User.findById(userId);
     if(!userProfile){
         return res.status(404).json({message:"User not found"});
     }
     res.status(200).json({message:"found",user:userProfile});

    }catch(error){
console.log(error)
return res.status(404).json({error:error})
    }
}


const getPersonalProfile=async(req,res,next)=>{
let userProfile;

try{
    console.log('here 1')
userProfile=await User.findById(req.userId).populate('tweets');
res.status(200).json({message:"found",user:userProfile});
}catch(error){
console.log(error)
}

}

const followRequestActions=async(req,res,next)=>{

    const acceptedFollowId=req.body.acceptedFollowId;
    const accept=req.body.accept;
    if(accept===undefined){
        return res.status(400).json({message:"accept is required"});
    }
    if(!acceptedFollowId){
        return res.status(400).json({message:"Id is required"});
    }
    try{
        const acceptedFollow=await User.findById(acceptedFollowId);
        if(!acceptedFollow){
            return res.status(400).json({message:"user not Found"});

        }
        const currentUser=await User.findById(req.userId);

        if(accept){
            acceptedFollow.followings.push(req.userId); 
            currentUser.followers.push(acceptedFollowId);
                   }
        acceptedFollow.sentFollowRequests.pull(req.userId)
        currentUser.recivedRequestedFollows.pull(acceptedFollowId);
        acceptedFollow.save();
        currentUser.save();

        return res.status(201).json({message:"succeed",acceptedFollow:acceptedFollow});
    }catch(error){

    }
    

}

module.exports={
followUser,
unFollow,
getUserProfile,
getPersonalProfile,
followRequestActions
}