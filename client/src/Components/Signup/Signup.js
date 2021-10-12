import React,{useState} from "react"
import {NavLink,useHistory} from "react-router-dom"
import Nav from "../../sharedcomponents/Nav/Nav"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./signup.css"
const Signup=()=>{
    const history=useHistory()
    const [email,setEmail]=useState()
    const [password,setpassword]=useState()
    const [name,setName]=useState()
    const [mobile,setMobile]=useState()
   const [confirm,setConfirm]=useState()

   const submit=async ()=>{
    var emailpattern=/^[0-9A-Za-z._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z]{2,6}$/;
    var usernamepaattern=/^[A-Za-z]{5,50}$/
    var mobilepattern=/^[6789][0-9]{9}$/
    var passwordpattern=/^[A-Za-z0-9]{6,}$/;
    if(!usernamepaattern.test(name)){
        return toast.error("** Invalid username")
    }
    if(!emailpattern.test(email)){
        return toast.error("** Invalid Email")
    }
    if(!mobilepattern.test(mobile)){
        return toast.error("** Invalid mobile number")
    }
    if(!passwordpattern.test(password)){
        return toast.error("password must contains  more than 6 digit or character ")
    }
       if(password === confirm){
        const res=await fetch("/user/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,password
            })
        });
        const res2=await res.json();
        
         if(res2.err){
            return toast.error(res2.err)
         }
         toast.success(res2.msg)
        history.push("/login")
       }
       else{
           toast.error("password do not match")
       }
    
   }
    return(
        <div style={{width:"100vw",height:"100vh"}}>
            <Nav text="Signup"/>
            <div className="signup">
            <div data-aos="fade-down" >
                <h2>Sign up</h2>
                <input type="text" name="name" autoComplete="off"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    placeholder="your name" />

                <input type="email" name="email" autoComplete="off"
                  value={email}
                 onChange={e=>setEmail(e.target.value)}
                    placeholder="your email" />

<input type="number" name="mobile" autoComplete="off"
                  value={mobile}
                 onChange={e=>setMobile(e.target.value)}
                    placeholder="Mobile No." />



                <input type="password" name="password" autoComplete="off"
                value={password}
                onChange={e=>setpassword(e.target.value)}
                    placeholder="Password" />

<input type="password" name="password" autoComplete="off"
                value={confirm}
                onChange={e=>setConfirm(e.target.value)}
                    placeholder="Confirm Password" />


                <button className="bt" onClick={submit}>Signup</button>
                <h2 className="heading"><NavLink className="cc" to="/login" >Already have an account? Login</NavLink></h2>
        <ToastContainer/>
            </div>

        </div>
        </div>
    )
}

export default Signup;