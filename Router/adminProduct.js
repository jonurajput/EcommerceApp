const express=require("express")
const router=express.Router();
const authorization=require("../Middleware/auth")
const productSchema=require("../Models/ProductModel")

//fetch user specific product
router.get("/admin/data",authorization,async (req,res)=>{
    const product=await productSchema.find({user:req.userid})
    if(product){
        return res.status(200).json({product})
    }
})

//delete product
router.delete("/admin/delete",authorization,async (req,res)=>{
    const productId=req.body.productId;
    const data=await productSchema.findByIdAndDelete({_id:productId});
    
    if(data){
        const product=await productSchema.find({user:req.userid})
        return res.status(200).json({product}) 
    }
})

//find product by id
router.get("/admin/:productId",authorization,async (req,res)=>{
       try{
        const productId=req.params.productId
const data=await productSchema.findOne({_id:productId})
if(data){
    return res.status(200).json({data})
}
       }catch(err){
console.log(err);
       }
})

//update product
router.post("/admin/update/:productId",authorization,async (req,res)=>{
    try{
        const productId=req.params.productId
        const user=req.userid
        const {name,price,discount,category,description,mediaUrl}=req.body
        if(!name || !price|| !discount || !category || !description || !mediaUrl){
          return res.status(400).json({err:"please filled all details"})
        }
       const data= await productSchema.findByIdAndUpdate({_id:productId},{
            $set:{
                name,price,discount,category,description,mediaUrl,user
            }
        })
        return res.status(200).json({msg:"product Updated successfully"})
    }catch(err){
  console.log(err);
    }
    
})
module.exports=router;