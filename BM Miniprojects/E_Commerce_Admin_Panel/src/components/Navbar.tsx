import { Button } from "antd";
import { useNavigate } from "react-router-dom";
// type NavbarProps = {
//   currentRoute:string;
// }
export const Navbar = () => {
    const navigate = useNavigate();


  return <>
    <nav className="w-3/5 h-10  border rounded-xl text-zinc-600 border-zinc-300">
          <ul className="text-xl flex justify-evenly items-center h-full ">
            <Button type="text" style={{fontSize:'1.2rem',fontFamily:'serif'}}  onClick={()=>navigate('/adminPanel/products')}>Products</Button>
            <Button type={'text'} style={{fontSize:'1.2rem',fontFamily:'serif'}} onClick={()=>navigate('/adminPanel/users')}>Users</Button>
            <Button type={'text'} style={{fontSize:'1.2rem',fontFamily:'serif'}} onClick={()=>navigate('/adminPanel/orders')}>Orders</Button>
          </ul>
        </nav>
  </>;
};
