import React from "react"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom"
const Nav=({text})=>{
  return(
      <div style={{width:"100vw",display:"flex",alignItems:"center",justifyContent:"flexStart",paddingLeft:"15px",backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4),black)",height:"10vh",color:"white",
      fontSize:"25px",fontWeight:"500"}}>
       <Link to="/"> <ArrowBackIcon style={{marginRight:"10px"}}/>
         {text}</Link> 
      </div>
  )
}

export default Nav;