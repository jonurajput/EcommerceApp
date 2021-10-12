import React,{useState} from "react"
import Nav from "../../sharedcomponents/Nav/Nav"
import {NavLink,useHistory} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from "react-toastify"


const Login=()=>{
    const history=useHistory()
    const [email,setEmail]=useState()
const [password,setpassword]=useState()  

const login=async ()=>{
      
   
   const res=await fetch("/user/login",{
         method:"POST",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             email,
             password
         })
   })
   const res2=await  res.json()
   
   if(res2.err){
       return toast.error(res2.err)
   }
   sessionStorage.setItem('token',res2.token)
   sessionStorage.setItem('user',JSON.stringify(res2.user))
   history.push("/account")
}
    return(
        <div>
            <Nav text="Login"/>
            <div className="signup">
            <div  >
                <h2>Login</h2>

                <input type="email" name="email" autoComplete="off"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                 placeholder="your email" />


<input type="password" name="password" autoComplete="off" value={password} onChange={e=>setpassword(e.target.value)}
                    placeholder="Password" />


                <button className="bt" onClick={login}>Login</button>
                <h4><NavLink className="cc" to="/signup" >New user? Signin</NavLink></h4>
        <ToastContainer/>
            </div>

        </div>
        </div>
    )
}

export default Login;