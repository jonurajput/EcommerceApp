import React,{useState,useEffect} from 'react'
import styles from "./Order.module.css"
import Nav from "../../sharedcomponents/Nav/Nav"

const Order = () => {
    const [data1, setData] = useState()
  const [address,setAddress]=useState({
    address_city:"",address_country:"",address_line:"",address_zip:"",total:"",date:"",
    customer_name:""
  })
  const token = sessionStorage.getItem("token")
    useEffect(() => {
        fetch("/api1/currentOrders", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            credentials: "include"
          }).then(res2 => res2.json()).then((data) => {
            
            const date2=data.res1.createdAt.slice(0,10)
            setData(data.res1.cartItems)
            setAddress({address_city:data.res1.address_city,
            address_country:data.res1.address_country,
          address_line:data.res1.address_line,
        address_zip:data.res1.address_zip,
      total:data.res1.total,
    date:date2,
  customer_name:data.res1.customer_name})
            // setDate(data.res1[0].createdAt)
          })
      
    }, [])
    return (
        <>
            <Nav text="My Order"/>
            {data1?.map((items)=>{
              const price=parseInt(items.product.price)
            const discount=parseInt(items.product.discount)
            const actualCost=parseInt(price-(price*discount/100))
              return(
                 <>
                <div className={styles.cart_product}>
        
        <div className={styles.left2}>

          <span>Product name:{items.product.name}</span>
          <span >quantity:{items.quantity} </span>
          <span >Price: Rs {actualCost}</span>

        </div>
        <div className={styles.right2}>
           <img className={styles.img} src={items.product.mediaUrl} alt="" /> 
        </div>
      </div>
                </>
              )
            })}
         
      <div className={styles.bottom}>
      <h4>Order Summary</h4>
      <span>Customer name:{address.customer_name}</span>
          <span>City:{address.address_city}</span>
          <span>address Line:{address.address_line}</span>
          <span>PinCode:{address.address_zip}</span>
          
          <span>total Price:{address.total}</span>
          <span>Order placed at:{address.date}</span>
      </div>
        </>
    )
}

export default Order
