const mongoose=require("mongoose")
const { default: Stripe } = require("stripe")
const {ObjectId}=mongoose.Schema.Types

const orderSchema=new mongoose.Schema({
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
    ],
    email:{
        type:String,
        required:true
    },
    total:{
        type:Number, required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('order',orderSchema)