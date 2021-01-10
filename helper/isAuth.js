const jwt=require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const token = req.get('auth-token');

    // Check if the header doesnt even exist
    if(!token){
        return res.status(401).json({msg: 'Access-denied'});
    }

    // Here There is a token
    // But let's check if it's correct

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({err:'invalid Token'});
    }    
}