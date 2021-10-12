const mongoose=require("mongoose")

const reqStr={
    type:"String",
    required:true
}
const userSchema=mongoose.Schema({
    name:reqStr,
    email:reqStr,
    password:reqStr,
    role:{
        type:String,
        required:true,
        default:"user",
        enum:["user","admin","root"]
    }
},{
    timestamps:true
})


module.exports=mongoose.model("user",userSchema)