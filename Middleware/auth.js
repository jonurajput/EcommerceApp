const jwt=require("jsonwebtoken")
const UserSchema = require("../Models/UserSchema")



const authenticate=async (req,res,next)=>{
    try{
        
        
           const Authorization=req.headers.authorization
           if(!Authorization){
               return res.status(400).json({err:"you login"})
           }
           const token=await jwt.verify(Authorization,process.env.TOKEN_SECRET)
           if(!token){
               return res.status(400).json({err:"you must login"})
           }
           const userId=token.userId
           const user=await UserSchema.findOne({_id:userId})
           if(!user){
               return res.status(400).json({err:"you must login"}) 
           }
           req.user=user
           req.userid=user._id
           next()
    }catch(err){
       console.log(err);
    }
   
}

module.exports=authenticate;