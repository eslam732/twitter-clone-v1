const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
const authHeader=req.get('Authorization');

if(!authHeader){
    return res.status(401).json({
        message:"Not authorized"
    });
}

const token=authHeader.split(' ')[1];
let decodedToken;
try{
  decodedToken=jwt.decode(token, process.env.TOKEN_SECRET);
}catch(error){
    return res.status(500).json({
        message:"Something Went Wrong"
    });
};

if(!decodedToken){
    return res.status(401).json({
        message:"not authorized"
    });
    
}
req.userId=decodedToken.usrId;

next();
}

