import React from "react"
import Navbar from "../Navbar/Navbar"
const Layout2=({children})=>{
    return(
        <div style={{overflowX:"hidden"}}>
            
            <Navbar/>
           
            {children}
        </div>
    )
}

export default Layout2;