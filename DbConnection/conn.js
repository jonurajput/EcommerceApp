const mongoose=require("mongoose");



const conn=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
       
    }).then(()=>{
        console.log("db connected successfully")
    }).catch(err=>console.log(err)
    )
}

module.exports=conn
