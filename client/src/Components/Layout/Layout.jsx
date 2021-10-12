import React from "react"
import Navbar from "../Navbar/Navbar"
import Carousel from "../../sharedcomponents/Carousel/Carousel"
const Layout=({children})=>{
    return(
        <div style={{overflowX:"hidden"}}>
            
            <Navbar/>
            <Carousel/>
            {children}
        </div>
    )
}

export default Layout