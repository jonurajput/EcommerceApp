
import {Switch,Route,Redirect} from "react-router-dom"
import Homepage from "./Components/Homepage/Homepage"
import './App.css';
import Layout from "./Components/Layout/Layout"
import Cart from "./Components/Cart/Cart"
import Details from "./Components/Details/Details"
import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login"
import Account from "./Components/Account/Account"
import Addproduct from "./Components/AddProduct/Addproduct"
import Order from "./Components/Order/Order"
import UserDashBoard from "./Components/UserDashboard/UserDashBoard";
import UpdateProduct from "./Components/UpdateProduct/UpdateProduct";
import Search from "./Components/Search/Search"
import Layout2 from "./Components/Layout2/Layout2"
function App() {
  
  return (
    <div className="App">
     
       
       <Switch>
         <Route exact path="/" >
           <Layout>
           <Homepage/>
           </Layout>
            </Route> 

<Route  path="/search/:name">
  <Layout2>
    <Search/>
  </Layout2>
</Route>

           <Route path="/cart">
            <Cart/>
           </Route>

<Route path="/details/:productId">
  <Layout2>
    <Details/>
  </Layout2>
</Route>

<GuestRoute path="/signup">
  <Signup/>
</GuestRoute>

<GuestRoute path="/login">
  <Login/>
</GuestRoute>

<PrivateRoute path="/userDashBoard">
 <UserDashBoard/>
</PrivateRoute>

<PrivateRoute path="/addProduct">
    <Layout2>
      <Addproduct/>
    </Layout2>
</PrivateRoute>

<PrivateRoute path="/updateProduct/:id">
  <UpdateProduct/>
</PrivateRoute>

<PrivateRoute path="/account">
  <Account/>
</PrivateRoute>

<PrivateRoute path="/order">
  <Order/>
</PrivateRoute>

<Redirect to="/"/>
       </Switch>
    
    </div>
  );
}

const GuestRoute=({children,...rest})=>{
  const user=JSON.parse(sessionStorage.getItem('user'))
  return(
    <Route {...rest}
    render={()=>{
      return(
        user?<Redirect to="/"/>:(children)
      )
    }}>

    </Route>
  )
}
const PrivateRoute=({children,...rest})=>{
  const user=JSON.parse(sessionStorage.getItem('user'))
return(
  <Route {...rest} 
  render={()=>{
    return(
      user?(children):<Redirect to="/"/>
    )
    
      }}>

  </Route>
)
}
export default App;
