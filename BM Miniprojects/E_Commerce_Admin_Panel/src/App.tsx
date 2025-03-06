import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AdminPanel } from "./pages/AdminPanel";
import { Products } from "./pages/Products";
import { Users } from "./pages/Users";
import { Orders } from "./pages/Orders";
const App =  () => (
 <>
   <Router>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route element={<ProtectedRoute/>}>
            <Route path="adminPanel" element={<AdminPanel/>}/>
            <Route path="adminPanel/products" element={<Products/>}/>
            <Route path="adminPanel/users" element={<Users/>}/>
            <Route path="adminPanel/orders" element={<Orders/>}/>
         </Route>
      </Routes>
   </Router>
 </>
);

export default App;

