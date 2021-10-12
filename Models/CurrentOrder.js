const mongoose=require("mongoose")

const {ObjectId}=mongoose.Schema.Types

const currentorderSchema=new mongoose.Schema({
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
    address_city:{
        type:String,
        required:true
    },
    address_country:{
        type:String,
        required:true
    },
    address_line:
        {
            type:String,
            required:true
        },
        address_zip:{
            type:String,
            required:true
        },
        customer_name:{
            type:String,
            required:true
        },
    total:{
        type:Number, required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('currentorder',currentorderSchema)