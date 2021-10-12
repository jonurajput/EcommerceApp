const express=require("express")
const router=express.Router();
const productSchema=require("../Models/ProductModel")
const authorization=require("../Middleware/auth")
const orderSchema=require("../Models/Order")
const currentOrderSchema=require("../Models/CurrentOrder")
//get all product
router.get("/api/allProduct",async (req,res)=>{
  const page=parseInt(req.query.page)
  const limit1=parseInt(req.query.limit)
  console.log(typeof page,typeof limit1);
     try{
      const data=await productSchema.find().skip((page-1)*limit1).limit(limit1)
      if(data){
        res.status(200).json({data})
      }
      res.status(200).json({msg:"hello"})
     }catch(err){
        console.log(err)
     }
    
})

//get product by category
router.get("/api/:id",async (req,res)=>{
  
  const id=req.params.id;

  try{
  const data1=await productSchema.findById({_id:id})
  const categorywise_product=await productSchema.find({category:data1.category})
  
  
  if(data1){
    return res.status(200).json({data1,categorywise_product})
  }
  
  }catch(err){
    console.log(err);
    
  }
})



//insert new product
router.post("/api/insert",authorization,async (req,res)=>{
  try{
    console.log(req.body)
    const user=req.userid
    const {name,price,discount,category,description,mediaUrl}=req.body
    if(!name || !price|| !discount || !category || !description || !mediaUrl){
      return res.status(400).json({err:"please filled all details"})
    }
    const newProduct=await new productSchema({
      name,price,discount,category,description,mediaUrl,user
    }).save();
  
    if(newProduct){
      return res.status(200).json({msg:"product added successfully"})
    }
  }catch(err){
    console.log(err);
  }
  
})

//get current orders
router.get("/api1/currentOrders",authorization,async (req,res)=>{
const res1=await currentOrderSchema.findOne({user:req.userid}).populate("cartItems.product")
if(res1){
  return res.status(200).json({res1})
}
})
//get all orders history
router.get("/api2/orders",authorization,async (req,res)=>{
 const res1=await orderSchema.find({user:req.userid}).populate("cartItems.product")
 if(res1){
   return res.status(200).json({res1})
 }
})


//search
router.get("/search/:name",async (req,res)=>{
   const name=req.params.name;
   const productPattern=new RegExp(name)
   const res1=await productSchema.find({$or:[{name:{$regex:productPattern,$options:"i"}},{category:{$regex:productPattern,$options:"i"}}]});
   if(res1){
     res.status(200).json({res1})
   }
})
module.exports=router;