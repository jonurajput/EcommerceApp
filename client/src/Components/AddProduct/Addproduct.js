import React,{useState} from "react"
import SendIcon from '@material-ui/icons/Send';
import "./addproduct.css"
import {SpinnerCircularSplit} from "spinners-react"
import { toast, ToastContainer } from "react-toastify"

const Addproduct=()=>{
    const token = sessionStorage.getItem("token")
    const [name,setName]=useState();
    const [price,setPrice]=useState();
    const [discount,setdiscount]=useState();
    const [category,setCategory]=useState();
    const [description,setDescription]=useState();
    const [media,setMedia]=useState();
    const [show,setShow]=useState(false);

    const submit=async ()=>{
        setShow(true)
           const mediaUrl=await uploadimage();
           if(mediaUrl){
            const res=await fetch("/api/insert",{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  Authorization: token
                },
                body:JSON.stringify({
                    name,price,discount,category,description,mediaUrl
                })
            });
            const dd=await res.json()
    
            setShow(false);
            toast.success("Product Added Successfully")
            setCategory("");
            setName("")
            setPrice("")
            setCategory("")
            setDescription("")
            setdiscount("")
            setMedia("")
           }
         
    }
    const uploadimage=async ()=>{
           const formdata=new FormData();
           formdata.append('file',media);
           formdata.append('upload_preset',"myStore")
           formdata.append('cloud_name',"jonujonu12")
          const res= await fetch("https://api.cloudinary.com/v1_1/jonujonu12/image/upload",{
               method:"POST",
               body:formdata
           })
           const res2=await res.json();
           return res2.url
    }
   return(
         <div data-aos="fade-down" className="create">
        <h3 style={{ width: "100%", textAlign:"center" }}>Add Product</h3>
        <input type="text" placeholder="Product name" value={name} onChange={e=>setName(e.target.value)} />
        <input type="text" placeholder="Product Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input type="text" placeholder="Discount" value={discount} onChange={e=>setdiscount(e.target.value)}/>
        <input type="text" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)}/>
        <input type="text" placeholder="product detail" value={description} onChange={e=>setDescription(e.target.value)}/>
        <div style={{ width: "100%", display: "flex",flexDirection:"column", alignItems: "center", justifyContent: "center",marginBottom:"10px" }}>
            <input type="file" id="image" className="upload" 
            onChange={(e)=>setMedia(e.target.files[0])} />
            <img src={media?URL.createObjectURL(media):""} alt="" style={{height:"70px",width:"70px"}}/>
        </div>
        <button onClick={submit}><span>upload</span> <SendIcon /></button>
        <SpinnerCircularSplit enabled={show}/>
        <ToastContainer/>
    </div>
        
    )
}

export default Addproduct;

//https://api.cloudinary.com/v1_1/jonujonu12