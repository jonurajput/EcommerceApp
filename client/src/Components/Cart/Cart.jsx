import React, { useState, useEffect } from "react"
import Nav from "../../sharedcomponents/Nav/Nav"
import styles from "./Cart.module.css"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StripeCheckout from "react-stripe-checkout"
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from "react-toastify"

const Cart = () => {
    const token = sessionStorage.getItem("token")
    const [Icart, setCart] = useState([]);
    const [price1, setPrice] = useState(0);
    const [tquantity,setTquantity]=useState(0);
    const carttotal = (cartArray) => {
        
        var a = 0;
        var b=0;
        cartArray.map((i) => {
            const price = parseInt(i.product.price)
            const discount = parseInt(i.product.discount)
            const actualprice = parseInt(price - (price * discount / 100))
            const quantity = i.quantity
            const eachProducttotal = actualprice * quantity

            a = a + eachProducttotal
            b=b+quantity
            return a
        })
        
        setPrice(a)
        setTquantity(b)
    }
    useEffect(() => {
        
        const getProduct = async () => {
            try{
                const res = await fetch("/api/cart/getItem", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },
                    credentials: "include"
                });
                const res2 = await res.json()
                
    
                setCart(res2.cart.cartItems)
                carttotal(res2.cart.cartItems)
                
            }catch(err){
                console.log(err);
            }
          
        };
        getProduct()
    }, [0])

    const remove = async (id) => {

        const res = await fetch("/api/removeProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            credentials: "include",
            body: JSON.stringify({ productId: id })
        });
        const res2 = await res.json();
        setCart(res2.cart.cartItems)
        carttotal(res2.cart.cartItems)  
    }

    const handleCheckout=async (paymentInfo)=>{
    
       const res=await fetch("/api/payment",{
           method:"POST",
           headers:{
            "Content-Type": "application/json",
            Authorization: token
           },
           credentials: "include",
           body:JSON.stringify({paymentInfo})
       });
       const res2=await res.json()
       toast.success(res2.msg,{
        position: "bottom-center",
        autoClose: 5000,
        limit:1
       })

       setCart(res2.orders.cartItems)
       carttotal(res2.orders.cartItems)
    }
    return (
        <>
            <Nav text="Cart" />
            {Icart.length>=1?  <div className={styles.cart}>
                <div className={styles.left}>
                {Icart.map((prop) => {
                        const price = prop.product.price;
                        const discount = prop.product.discount
                        const actualprice = parseInt(parseInt(price) - (parseInt(price) * parseInt(discount)) / 100)

                        return (
                            <>
                                <div className={styles.cart_product}>
                                    
                                        <div className={styles.left2}>
                                            <img className={styles.img} src={prop.product.mediaUrl} alt="" />
                                        </div>
                                        <div className={styles.right2}>
                                            <span className={styles.special} >Special Price</span>
                                            <span style={{ fontSize: "18px", fontWeight: "600", width: "100%",height:"19px", wordWrap:"break-word", overflowX: "hidden" }} className={styles}>{prop.product.name}</span>
                                            
                                            <span style={{ fontSize: "14px", color: "grey", marginTop: "8px" }}>quantity: {prop.quantity}</span>
                                            <span style={{ color: "black", fontWeight: "800" }}>Rs {actualprice}  <span style={{ marginLeft: "2px", color: "black", fontWeight: "500", textDecorationLine: "line-through" }}>Rs {price}</span>
                                                <span style={{ color: "green", fontWeight: "800", marginLeft: "4px" }}>{discount}%</span>
                                            </span>
                                            <span>Deliver in 5-6 days</span>
                                            <div className={styles.btn} onClick={() => remove(prop.product._id)}>
                                                <ExitToAppIcon className={styles.icon} />
                                                <span>Remove</span>
                                            </div>
                                        </div>
                                    
                                </div>
                            </>
                        )
                    })

                    }

                </div>
                <div className={styles.right}>
                <span>Total Price: Rs {price1}</span>
                <span>Total quantity: {tquantity}</span>
                <StripeCheckout
                name="MY Store"
                amount={price1*100}
                image={Icart[0]?.product?.mediaUrl}
                currency="INR"
                shippingAddress={true}
                billingAddress={true}
                zipCode={true}
                stripeKey="pk_test_51JYSjRSIo1Twf3al1Vc5oWFhUsdV1CzrGu5tjGUaXYgEjValp7kLZiACjHXRa67R05YpKwUh89mmVU6mLo28iOIk00YsaSHrAU"
                token={(paymentInfo)=>handleCheckout(paymentInfo)}>
                <span className={styles.orderbtn} >Place Order</span>
                </StripeCheckout>
                    
                </div>
                <ToastContainer
                    position="bottom-center"
                />
            </div>
:<div style={{width:"100vw",height:"80vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
                 <h2>Cart is Empty !!</h2>
            </div>}
          

        
        </>
    )
}

export default Cart;