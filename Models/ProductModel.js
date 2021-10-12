const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const reqType={
    type:"String",
    required:true
}
const ProductSchema=mongoose.Schema({
   name:reqType,
   price:reqType,
   discount:reqType,
   description:reqType,
   category:reqType,
   mediaUrl:reqType,
   user:{
       type:ObjectId,
       ref:"user"
   }
})

module.exports=mongoose.model("product",ProductSchema)