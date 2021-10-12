import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import Card from "../../sharedcomponents/Card/Card"
import styles from "./Search.module.css"
const Search = () => {
    const params=useParams();
    const [data1,setData]=useState()
    useEffect(() => {
         const name=params.name
         fetch(`/search/${name}`).then(res=>res.json())
         .then(data=>{
            
             setData(data.res1)
         })
    }, [])
    return (
        <>
        <div className={styles.home}>
             
                 { data1?data1.map((item)=>{
                     return(
                       <>
                       <Card prop={item}/>
                       </>
                     )
                    
                 }):<>
                   <h3>No result found....</h3>
                 </> }
             
              </div>
        </>
       
    )
}

export default Search;
