import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AdminPanel } from "./pages/AdminPanel";
const App =  () => (
 <>
   <Router>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route element={<ProtectedRoute/>}>
            <Route path="adminPanel" element={<AdminPanel/>}/>
            
         </Route>
      </Routes>
   </Router>
 </>
);

export default App;

