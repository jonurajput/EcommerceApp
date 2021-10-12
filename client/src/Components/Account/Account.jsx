import React, { useState, useEffect } from "react"
import Nav from "../../sharedcomponents/Nav/Nav"
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from "./Account.module.css"
import Collapsible from 'react-collapsible';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Account = () => {
  const [data1, setData] = useState()
  const [date1,setDate]=useState()
  const token = sessionStorage.getItem("token")
  const user = JSON.parse(sessionStorage.getItem('user'))
  useEffect(() => {
    fetch("/api2/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      credentials: "include"
    }).then(res2 => res2.json()).then((data) => {
      
      setData(data.res1[0].cartItems.reverse())
      setDate(data.res1[0].createdAt)
    })
  }, [])
  return (
    <>
      <Nav text="My account" />
      <div className={styles.header}>
        <Avatar style={{ height: "40px", width: "40px" }}>
          <AccountCircleIcon style={{ height: "40px", width: "40px", color: "black" }} />
        </Avatar>
        <h3 >{user.name}</h3>
        <h4 style={{ fontWeight: "400" }}>aa</h4>
      </div>

      <div className={styles.order}>
      <h5>Order History</h5>
      <span>{date1}</span>
      <Collapsible trigger={<ExpandMoreIcon/>} triggerWhenOpen={<KeyboardArrowUpIcon/>}>
        {
          data1?.map((items)=>{
            const price=parseInt(items.product.price)
            const discount=parseInt(items.product.discount)
            const actualCost=parseInt(price-(price*discount/100))
            return(
              <>
              <div className={styles.cart_product}>
         <div className={styles.left2}>
            <img className={styles.img} src={items.product.mediaUrl} alt="" />
          </div>
          <div className={styles.right2}>

            <span style={{ fontSize: "18px", fontWeight: "600", width: "100%", height: "19px", wordWrap: "break-word", overflow: "hidden" }} className={styles}>{items.product.name}</span>

            <span style={{ fontSize: "14px", color: "grey", marginTop: "8px" }}>quantity:{items.quantity} </span>
            <span style={{ color: "black", fontWeight: "800" }}>Rs {actualCost} </span>

          </div>
        </div>
     
              </>
            )
          })
        }
        </Collapsible>
           
      
</div>

    </>
  )
}

export default Account;