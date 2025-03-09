import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../stores/useAuth'
import { Role } from '../types/authTypes';
import { Navigate, Outlet } from 'react-router-dom';
import { getAllCarts } from '../api/cartApi';
import { getAllProducts } from '../api/productsApi';
import { getAllUsers } from '../api/userApi';


export const ProtectedRoute = () => {
    const {} = useQuery({
        queryKey:['cartData'],
        queryFn:getAllCarts,
        staleTime:1000*60*60,
      })
        const {  } = useQuery({
          queryKey: ["products"],
          queryFn: getAllProducts,
        });
        const {} = useQuery({
          queryKey: ["userData"],
          queryFn: getAllUsers,
        });
    const role = useAuth((state)=>state.role);
    return (role===Role.admin?<Outlet/>:<Navigate to={'/orders'}/>)
}
