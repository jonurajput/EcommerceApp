const express=require("express")
const auth=require("../Middleware/auth")
const router=express.Router();
const Stripe=require("stripe")
const {v4 : uuidv4} = require('uuid')
const cartSchema=require("../Models/CartSchema")
const orderSchema=require("../Models/Order")
const currentorderSchema=require("../Models/CurrentOrder")

const stripe=Stripe(process.env.STRIPE_SERCET)
router.post("/api/payment",auth,async (req,res)=>{
      const paymentInfo=req.body.paymentInfo
      try{
           const cart=await cartSchema.findOne({user:req.userid}).populate("cartItems.product")
           
           var totalprice=0;
           cart.cartItems.forEach(i=> {
            const price = parseInt(i.product.price)
            const discount = parseInt(i.product.discount)
            const actualprice = parseInt(price - (price * discount / 100))
            const quantity = i.quantity
            const eachProducttotal = actualprice * quantity
           totalprice = totalprice + eachProducttotal
           });
         
           const previousCustomer=await stripe.customers.list({
               email:paymentInfo.email
           });
           const isExistingCustomer=previousCustomer.data.length >0
           var newcustomer="";
           if(!isExistingCustomer){
               newcustomer=await stripe.customers.create({
                   email:paymentInfo.email,
                   source:paymentInfo.id
               })
           }
           await stripe.charges.create({
               currency:"INR",
               amount:totalprice * 100,
               receipt_email:paymentInfo.email,
               customer:isExistingCustomer ? previousCustomer.data[0].id : newcustomer.id,
               description:`you purchased a product | ${paymentInfo.email}`
           },{
               idempotencyKey:uuidv4()
           })
         
           // create current order Schema
           try{
                const getOrderSchema=await currentorderSchema.findOne({user:req.userid})
                if(getOrderSchema){
                await currentorderSchema.findOneAndUpdate({user:req.userid},{
                    $set:{
                        cartItems:cart.cartItems,
                        email:paymentInfo.email,
                        address_city:paymentInfo.card.address_city,
                        address_country:paymentInfo.card.address_city,
                        address_line:paymentInfo.card.address_line1,
                        address_zip:paymentInfo.card.address_zip,
                        customer_name:paymentInfo.card.name , 
                        total:totalprice

                    }
                })
                }else{
                    await new currentorderSchema({
                        user:req.userid,
                        email:paymentInfo.email,
                        address_city:paymentInfo.card.address_city,
                        address_country:paymentInfo.card.address_city,
                        address_line:paymentInfo.card.address_line1,
                        address_zip:paymentInfo.card.address_zip,
                        customer_name:paymentInfo.card.name , 
                        total:totalprice,
                        cartItems:cart.cartItems
                    }).save()
                }
           }catch(err){
              console.log(err)
           }
        // create orderhistory schema 
        try{
           const isExist=await orderSchema.findOne({user:req.userid})
           
           if(isExist){
                await orderSchema.findOneAndUpdate({user:req.userid},{
                    $push:{
                        "cartItems":cart.cartItems
                    }
                })
           }else{
            await new orderSchema({
                user:req.userid,
                email:paymentInfo.email,
                total:totalprice,
                cartItems:cart.cartItems
            }).save()
           }
        }catch(err){

        }
          const order= await cartSchema.findOneAndUpdate({_id:cart._id},{
               $set:{cartItems:[]}
           },{new:true})
           return res.status(200).json({msg:"payment successful",orders:order})
      }catch(err){
          console.log(err);
      }
})

module.exports=router;