import React,{useState,useEffect} from "react"
import SendIcon from '@material-ui/icons/Send';
import {SpinnerCircularSplit} from "spinners-react"
import { toast, ToastContainer } from "react-toastify"
import {useParams} from "react-router-dom"
import Nav from "../../sharedcomponents/Nav/Nav"
const UpdateProduct=()=>{
    const token = sessionStorage.getItem("token")
    const params=useParams();
    const id=params.id;
    const [name,setName]=useState();
    const [price,setPrice]=useState();
    const [discount,setdiscount]=useState();
    const [category,setCategory]=useState();
    const [description,setDescription]=useState();
    const [media,setMedia]=useState();
    const [show,setShow]=useState(false);
    const [imgsrc,setImgsrc]=useState()
    const submit=async ()=>{
        setShow(true)
        if(imgsrc){
            const res1=await fetch(`/admin/update/${id}`,{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  Authorization: token
                },
                body:JSON.stringify({
                    name,price,discount,category,description,mediaUrl:imgsrc
                })
            });
            const data2=await res1.json();
            
            if(data2.err){
                setShow(false);
                toast.success(data2.err)
                return
            }
                setShow(false);
                toast.success(data2.msg)    
     }

         const mediaUrl=await uploadimage();
           if(mediaUrl){
            const res2=await fetch(`/admin/update/${id}`,{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  Authorization: token
                },
                body:JSON.stringify({
                    name,price,discount,category,description,mediaUrl
                })
            });
            const dd=await res2.json()
            if(dd.err){
                setShow(false);
                toast.error(dd.err)
                return
            }
            setShow(false);
            toast.success(dd.msg)
           
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

    useEffect(() => {
        console.log(id);
        fetch(`/admin/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:token
            },
            credentials:"include"
        }).then(res=>res.json())
        .then(data1=>{
            console.log(data1)
            setName(data1.data.name)
            setCategory(data1.data.category)
            setdiscount(data1.data.discount)
            setPrice(data1.data.price)
            setDescription(data1.data.description)
            setImgsrc(data1.data.mediaUrl)
        })
    }, [])
   return(
       <><Nav text="Update Product"/>
        <div  className="create">
        <h3 style={{ width: "100%", textAlign:"center" }}>Update Product</h3>
        <input type="text" placeholder="Product name" value={name} onChange={e=>setName(e.target.value)} />
        <input type="text" placeholder="Product Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input type="text" placeholder="Discount" value={discount} onChange={e=>setdiscount(e.target.value)}/>
        <input type="text" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)}/>
        <input type="text" placeholder="product detail" value={description} onChange={e=>setDescription(e.target.value)}/>
        <div style={{ width: "100%", display: "flex",flexDirection:"column", alignItems: "center", justifyContent: "center",marginBottom:"10px" }}>
            <input type="file" id="image" className="upload" 
            onChange={(e)=>{
                setMedia(e.target.files[0])
                setImgsrc("")}} />
            <img src={media?URL.createObjectURL(media):imgsrc} alt="" style={{height:"70px",width:"70px"}}/>
        </div>
        <button onClick={submit}><span>Update</span> <SendIcon /></button>
        <SpinnerCircularSplit enabled={show} color="blue"/>
        <ToastContainer/>
    </div>

       </>
                
    )
}

export default UpdateProduct;
