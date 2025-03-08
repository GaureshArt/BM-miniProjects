import { create } from "zustand";
import { IUseAuthType, Role } from "../types/authTypes";

export const useAuth = create<IUseAuthType>((set)=>({
    role:Role.user,
    username:'',
    id:-1,
    setRole:(isAdmin:boolean)=>set({role:(isAdmin?Role.admin:Role.user)}),
    setUsername:(username:string)=>set({username:username}),
    setId:(id:number)=>set({id:id}),
}))