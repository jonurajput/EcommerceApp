import React,{useState,useEffect} from 'react'
import styles from "./UserDashBoard.module.css"
import Nav from "../../sharedcomponents/Nav/Nav"
import {Link} from "react-router-dom"
const UserDashBoard = () => {
    const token = sessionStorage.getItem("token")
    const [prod,setProd]=useState()
    useEffect(()=>{
         fetch("/admin/data",{
             method:"GET",
             headers:{
                 "Content-Type":"application/json",
                 Authorization:token
             },
             credentials:"include"
         }).then((res)=>res.json())
         .then(data=>{
             
             setProd(data.product)
            }).catch(err=>console.log(err))

    },[])

    const remove=async (productId)=>{
        try{
            const res= await fetch("/admin/delete",{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:token
                 },
                 credentials:"include",
                 body:JSON.stringify({productId})
            });
            const data=await res.json()
        
             setProd(data.product)
        }catch(err){
            console.log(err);
        }
     //console.log(productId);
    }
    return (
        <>
            <Nav text="userDashBoard"/>
            <div className={styles.admin}>
        {prod?.map((item)=>{
            return(
                <>
                <div className={styles.eachProduct} key={item._id}>
            <div className={styles.first}>
                <img className={styles.img} src={item.mediaUrl} alt=""/>
                <span>{item.name}</span>
            </div>
            <div className={styles.second}>
                <div className={styles.second_first}>
                    <span style={{fontWeight:"800"}}>Price</span>
                    <span>Rs {item.price}</span>
                </div>
                <div className={styles.second_first}>
                    <span style={{fontWeight:"800"}}>discount</span>
                    <span>{item.discount}%</span>
                </div>
            </div>
            <div className={styles.third}>
               <Link to={`/updateProduct/${item._id}`}> <button className={styles.btn1}>Edit</button></Link>
                <button className={styles.btn2} onClick={()=>remove(item._id)}>Delete</button>
            </div>
        </div>

                </>
            )
        })}
              </div>

        </>
          )
}

export default UserDashBoard
