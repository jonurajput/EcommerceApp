const express=require("express")
const mongoose=require("mongoose")
const router=express.Router();
const cartSchema=require("../Models/CartSchema")
const authenticate=require("../Middleware/auth")

//get all cart product
router.get("/api/cart/getItem",authenticate,async (req,res)=>{
 try{
    const id=req.userid
      const cart=await cartSchema.findOne({user:id}).populate("cartItems.product")
     
      if(!cart){
          return res.status(404).json({err:"you must login"})
     }
      return res.status(200).json({cart})
 }catch(err){
  console.log(err,"jhjhj")
}
})

// add product to cart
router.post("/api/addProduct",authenticate,async (req,res)=>{

    try{
        const cart=await cartSchema.findOne({user:req.userid})

        if(cart){
            const isItem=cart.cartItems.find(c=>c.product.toString()===req.body.cartItems.product.toString())
            console.log(isItem)
            if(isItem){
                await cartSchema.findOneAndUpdate({"user":req.userid,"cartItems.product":req.body.cartItems.product},{
                    "$inc":{
                        "cartItems.$.quantity":req.body.cartItems.quantity
                    }
                })
                    res.json({msg:"already presents"})
            }else{
                await cartSchema.findOneAndUpdate({user:req.userid},{
                    "$push":{
                        "cartItems":req.body.cartItems
                    }
                })
              res.status(200).json({msg:"added to cart"})
            }
          
        }else{
            const cart=await new cartSchema({
                user:req.userid,
                cartItems:[req.body.cartItems]
            }).save();
            res.json({msg:"cart created",cart})
        }
       
    }catch(err){
        console.log(err)
    }
    
})

// remove product from cart
router.post("/api/removeProduct",authenticate,async (req,res)=>{
    const {productId}=req.body;

    const cart=await cartSchema.findOneAndUpdate({"user":req.userid},{
        $pull:{
            cartItems:{product:productId}
        }
    },{new:true}).populate("cartItems.product");
console.log(cart)
    res.status(200).json({cart})
})
module.exports=router;