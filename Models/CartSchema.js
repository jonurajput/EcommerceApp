const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types

const cartSchema=new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"user",
        required:true
    },
    cartItems:[
        {
          product:{type:ObjectId,ref:"product"},
          quantity:{type:Number,default:1}
        }
    ]
})

module.exports=mongoose.model('cart',cartSchema)