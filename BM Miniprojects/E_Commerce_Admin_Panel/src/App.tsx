import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AdminPanel } from "./pages/AdminPanel";
import { Products } from "./pages/Products";
import { Users } from "./pages/Users";

import { ProductView } from "./pages/ProductView";
import { ProductAdd } from "./pages/ProductAdd";
import { ProductEdit } from "./pages/ProductEdit";
import { UserEdit } from "./pages/UserManagement/UserEdit";
import { UserAdd } from "./pages/UserManagement/UserAdd";
import { UserDetails } from "./pages/UserManagement/UserDetails";
import { Orders } from "./pages/orderManagement/Orders";
import NotAuth from "./pages/NotAuth";
import NotFound from "./pages/NotFound";
const App =  () => (
 <>
   <Router>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route element={<ProtectedRoute/>}>
            <Route path="adminPanel" element={<AdminPanel/>}/>
            <Route path="adminPanel/products" element={<Products/>}/>
            <Route path="adminPanel/products/:prodId" element={<ProductView/>}/>
            <Route path="adminPanel/products/addProduct" element={<ProductAdd/>}/>
            <Route path="adminPanel/products/editProduct/:prodId" element={<ProductEdit/>}/>
            <Route path="adminPanel/users" element={<Users/>}/>
            <Route path="adminPanel/users/userDetails/:userId" element={<UserDetails/>}/>
            <Route path="adminPanel/users/editUser/:userId" element={<UserEdit/>}/>
            <Route path="adminPanel/users/addUser" element={<UserAdd/>}/>
            <Route path="adminPanel/orders" element={<Orders/>}/>
         </Route>
         <Route path="/products" element={<Products/>}/>
         <Route path="/orders" element={<Orders/>}/>
         <Route path='/notAuth' element={<NotAuth/>}/>
         <Route path="*" element={<NotFound/>}/>
      </Routes>
   </Router>
 </>
);

export default App;

