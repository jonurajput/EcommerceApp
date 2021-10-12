import styles from "./Navbar.module.css"
import { useState ,useEffect} from "react"
import MenuIcon from '@material-ui/icons/Menu';
import {Link,useHistory} from "react-router-dom"
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AddIcon from '@material-ui/icons/Add';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
const Navbar = () => {
    const [search1,setSearch]=useState("");
    const history=useHistory();
    const token=sessionStorage.getItem("token")
  const user=JSON.parse(sessionStorage.getItem('user'))
    const [open, setOpen] = useState(false)
    const sidemenu = () => {
        setOpen(!open)
    }
  //logout
  const logout=async ()=>{
      
    const res=await fetch("/logout",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include"
    });
    const res2=await res.json();
    if(res2.msg){
        sessionStorage.clear();
        history.push("/login")
    }
  } 

  const searchResult=()=>{
   history.push(`/search/${search1}`)
  }
    return (
        
        <div className={styles.navbar}>
            <div className={styles.nav}>        

                <div className={styles.title} >
                    <span><MenuIcon className={styles.menuicon} onClick={sidemenu} /></span>
                    <span ><Link to="/">Shooping Cart</Link></span>
                </div>
                <div className={styles.search}>
                    <input type="text" placeholder="search for Products,Brand and More" value={search1} onChange={(e)=>setSearch(e.target.value)}/>
                    <SearchIcon className={styles.searchicon} onClick={searchResult}/>
                </div>
                <div className={styles.carticon}>
                   <Link to="/cart"> <ShoppingCartIcon className={styles.cart} /></Link>
                </div>

            </div>
        
            <div className={open ? styles.sidebar : styles.hidden}>
                <div className={styles.sidebar_first} onClick={sidemenu}>
                    <div className={styles.account}><Avatar src="/broken-image.jpg" />
                        <span style={{marginLeft:"10px",color:"white"}}>{user?user.name:"Login"}</span>
                    </div>
                                    
                   {
                       user && <>  
                       
                        <div className={styles.params}><Link to="/addProduct"><AddIcon className={styles.side_icons} /><span>Create</span></Link></div>
                  
                    </>
                   }
                    <div className={styles.params}><Link to="/cart"><ShoppingCartIcon className={styles.side_icons} /><span>My Cart</span></Link></div>
                    {
                       user?<>
                       
                       <div className={styles.params}><Link to="/order"><BookIcon className={styles.side_icons} /><span>My Orders</span></Link></div>
                       <div className={styles.params}><Link to="/account"> <AccountCircleIcon className={styles.side_icons} /><span>My Account</span></Link></div>
                       <div className={styles.params} ><Link to="/userDashBoard"><InsertDriveFileIcon className={styles.side_icons} /><span>My Store</span></Link></div>
                       <div className={styles.params} onClick={logout}><ExitToAppIcon className={styles.side_icons} /><span>Logout</span></div>
                       </>:<>
                       <div className={styles.params}><Link to="/signup"><LockOpenIcon className={styles.side_icons} /><span>signup</span></Link></div>
                    <div className={styles.params}><Link to="/login"><LockOpenIcon className={styles.side_icons} /><span>Login</span></Link></div>
                       </>
                   }

                 
                  
                    
                 
                </div>
                <div className={styles.sidebar_second} onClick={sidemenu}></div>

            </div>
        </div>
        
    )
}


export default Navbar;


