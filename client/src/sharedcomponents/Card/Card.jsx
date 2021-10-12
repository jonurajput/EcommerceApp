import styles from "./Card.module.css"
import React from "react"
import {Link} from "react-router-dom"

const Card=({prop})=>{
    
    var discount=parseInt(prop.discount)
    var price=parseInt(prop.price)
    var actualprice=parseInt(price - (price*discount/100));
    
    return(
        <>
            <Link to={`/details/${prop._id}`}>
            <div className={styles.card} >
        <div className={styles.image}>
            <img src={prop.mediaUrl} alt=""/>
        </div>
        <div className={styles.content}>
    <span className={styles.name} style={{color:"grey",fontWeight:"600",width:"100%",overflowY:"hidden",height:"20px"}}>{prop.name}</span>
            <div style={{display:"flex",flexDirection:"column"}}>
    <span className={styles.price} style={{color:"black",fontWeight:"800"}}>Rs {actualprice}  <span style={{marginLeft:"4px",color:"black",fontWeight:"500",textDecorationLine:"line-through"}}>Rs{price}</span></span>
           
            <span className={styles.discount} style={{color:"green",fontWeight:"800",marginLeft:"16px"}}>{prop.discount}% off</span>
            </div>
            </div>
    </div>
            </Link>
        </>
     
    )
}

export default Card;