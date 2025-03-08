import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/useAuth";
import { Role } from "../types/authTypes";

export const Navbar = () => {
    const navigate = useNavigate();
    const {role} = useAuth();

  return <>
    <nav className="w-3/5 h-10  border rounded-xl text-zinc-600 border-zinc-300">
          <ul className="text-xl flex justify-evenly items-center h-full ">
            <Button type="text" style={{fontSize:'1.2rem',fontFamily:'serif'}}  onClick={() => navigate(`${role === Role.admin ? '/adminPanel' : ''}/products`)}>Products</Button>
            <Button type={'text'} style={{fontSize:'1.2rem',fontFamily:'serif'}} onClick={() => navigate(`${role === Role.admin ? '/adminPanel' : ''}/users`)}>Users</Button>
            <Button type={'text'} style={{fontSize:'1.2rem',fontFamily:'serif'}} onClick={() => navigate(`${role === Role.admin ? '/adminPanel' : ''}/orders`)}>Orders</Button>
            <Button type={'text'} style={{fontSize:'1.2rem',fontFamily:'serif'}} onClick={()=>navigate('/login')}>Login </Button>
          </ul>
        </nav>
  </>;
};
