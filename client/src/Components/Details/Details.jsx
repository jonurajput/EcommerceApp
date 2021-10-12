import React,{useState,useEffect} from "react";
import styles from "./Details.module.css"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Card from "../../sharedcomponents/Card/Card"
import {useParams,useHistory} from "react-router-dom"
import {SpinnerDotted} from "spinners-react"
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from "react-toastify"
 const Details=()=>{
   const history=useHistory();
   const token=sessionStorage.getItem("token")
   const [aa,setaa]=useState();
   const [bb,setbb]=useState([]);
   const [quantity,setQuantity]=useState();
   const params=useParams();
   const id=params.productId
   const getResult=async (id)=>{
    try{
       const res=await fetch(`/api/${id}`);
       const result=await res.json();
    

      const product1=(result)=>{
        
       var a=[];
       
            a.push(result.data1)
            
        setaa(a)
        setbb(result.categorywise_product)
      }
     
      product1(result)
      
      
    }catch(err){
        console.log(err)
    }
  }

  const addToCart=async ()=>{
         try{
           const res=await fetch("/api/addProduct",{
             method:"POST",
             headers:{
               "Content-Type":"application/json",
               Authorization:token
             },
             body:JSON.stringify({
               cartItems:{
                 quantity,
                 product:id
               }
             })
           });
           const res2=await res.json();
           console.log(res2);
           toast.success("product added to cart")
        
         }catch(err){
             console.log(err)
         }
  }
  useEffect(()=>{
    const id=params.productId
       getResult(id);
    
  },[id])

     return(
       <div className={styles.details}>
       {aa?
        <div className={styles.top}>
                <div className={styles.left}>
                  <img src={aa?aa[0].mediaUrl:""} alt="" className={styles.img}/>
                
                  {
                    token? <span className={styles.btn} onClick={addToCart}><ShoppingCartIcon/> ADD TO CART</span>: <span className={styles.btn} onClick={()=>history.push("/login")}>Login to add Items</span>
                  }
                 
                </div>
                <div className={styles.right}>

                <span style={{color:"green",background:"lightgreen",padding:"4px",width:"40%",fontSize:"15px"}}>Special Price</span>
      <span style={{fontWeight:"500",width:"100%",height:"32px",overflow:"hidden"}} className={styles.span}>{aa?aa[0].name:""}</span>
      <span style={{fontSize:"17px",color:"grey",marginTop:"8px"}}>size: L</span>
      <span style={{color:"black",fontWeight:"800",marginTop:"10px"}}>Rs {parseInt(parseInt(aa?aa[0].price:"")-(parseInt(aa?aa[0].price:"")*parseInt(aa?aa[0].discount:"")/100))}  <span style={{marginLeft:"2px",color:"black",fontWeight:"500",textDecorationLine:"line-through"}}>Rs {aa?aa[0].price:""}</span>
      <span style={{color:"green",fontWeight:"800",marginLeft:"4px"}}>{aa?aa[0].discount:""}% off</span>
      </span>
      
      <span>{aa?aa[0].description:""}</span>
      <span style={{display:"flex",alignItems:"center",fontWeight:"600"}}>Quantity:<input type="number" min="1" style={{border:"1px solid grey"}} value={quantity} onChange={e=>setQuantity(e.target.value)}/></span>
                </div>
           </div>
       :<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"80vh"}}><SpinnerDotted/></div>}
           

           
      {bb.length>0?<>
        <h3 style={{marginTop:"16px",marginLeft:"16px",borderTop:"1px solid grey"}}>Related products</h3>
           <div className={styles.bottom}>
            {
              bb?bb.map((i)=>{
                return(
                  <>
                  <Card prop={i}/>
                  </>
                )
              }):""
            }

           </div>
           </>
      :<><h3 style={{marginTop:"16px",marginLeft:"16px",borderTop:"1px solid grey"}}>Related products</h3>
           <div className={styles.bottom}>
           <h2>No related product found..</h2>
           </div>
           </>}

           <ToastContainer/>  
       </div>
     )
 }

 export default Details;