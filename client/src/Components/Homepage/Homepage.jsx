import styles from "./Homepage.module.css"
import React,{useEffect,useState} from "react"
import Card from "../../sharedcomponents/Card/Card"
import InfiniteScroll from 'react-infinite-scroll-component'
import {SpinnerCircularFixed} from "spinners-react"
const Homepage=({products})=>{
    const [data1,setData]=useState([])
    const [page,setPage]=useState(2)
    const [more,setMore]=useState(true)
    useEffect(()=>{
        const user=JSON.parse(sessionStorage.getItem('user'))
        console.log(user);
     const data=async ()=>{
//         fetch('https://myecommerce--app.herokuapp.com/')
//   .then(response => response.json())
//   .then(json => console.log(json))
try{
    const res= await fetch("/api/allProduct?page=1&limit=10");
           
    const result=await res.json();

    const {data}=result;
    setData(data)


}catch(error){
    console.log(error);
}
                
     }
     data();
    },[])
const fetchData=async ()=>{
    try{
        const res= await fetch(`/api/allProduct?page=${page}&limit=10`);
        const result=await res.json();

        const {data}=result
        setData([...data1,...data])
        setPage(page+1)
        if(data.length===0||data.length<6){
            setMore(false)
        }
      
    }catch(err){
        console.log(err);
    }
  
}
    return(
        <>
        
        <InfiniteScroll
  dataLength={data1.length} //This is important field to render the next data
  next={fetchData}
  hasMore={more}
  loader={<div style={{textAlign:"center"}}><SpinnerCircularFixed color="blue" /></div>}
  endMessage={
    <p style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
    <h7>total {data1.length} results </h7>
      <h7>End of Result...</h7>
    </p>
  }>
       <div className={styles.home}>
             {
                 data1?.map((item)=>{
                     return(
                       <>
                       <Card prop={item}/>
                       </>
                     )
                    
                 })
             } 
             </div>
         </InfiniteScroll>
          
          </>
    )
}
  
export default Homepage;