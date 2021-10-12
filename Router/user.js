const express=require("express");
const router=express.Router();
const UserSchema=require("../Models/UserSchema")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");

//signup
router.post("/user/signup",async (req,res)=>{
    
   
    const {name,email,password}=req.body
    

    if(!name || !email || !password){
        return res.status(404).json({err:"please fill all fields"})
    }
    const user=await UserSchema.findOne({email});
    if(user){
        return res.status(404).json({err:"user Already registered with this email"})
    }
    const hashpassword=await bcrypt.hash(password,12)
    const isExist=await new UserSchema({
        name,
        email,
        password:hashpassword
    }).save();
    
    if(isExist){
        return res.status(200).json({msg:"User created successfully"})
    }
})


//login route
router.post("/user/login",async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(404).json({err:"please fill all fields"})
    }
    const domatch=await UserSchema.findOne({email})
    if(!domatch){
        return res.status(404).json({err:"Invalid credentials"})
    }

    //token generation
    const token=await jwt.sign({userId:domatch._id},process.env.TOKEN_SECRET);

    res.cookie("my_token",token,{maxAge:90000,httpOnly:true})
    if(token){
        return res.status(200).json({user:{name:domatch.name,email:domatch.email,role:domatch.role},token})
    }
})

//logout route
router.get('/logout',(req,res)=>{
    console.log("cookie",req.cookies.my_token)
    res.clearCookie("my_token")
    res.status(200).json({msg:"user logout"})
})
module.exports=router;
