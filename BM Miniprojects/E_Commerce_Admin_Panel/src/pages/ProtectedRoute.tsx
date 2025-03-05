import { useAuth } from '../stores/useAuth'
import { Role } from '../types/authTypes';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const role = useAuth((state)=>state.role);
    return (role===Role.admin?<Outlet/>:<Navigate to={'/'}/>)
}
