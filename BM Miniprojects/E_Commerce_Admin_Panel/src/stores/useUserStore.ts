import { create } from "zustand";
import { IUserAddType, IUserTableType,   IUserUpdateFormType,  IUseUserType } from "../types/userTypes";
import { devtools } from "zustand/middleware";

export const useUserStore = create<IUseUserType>()(devtools((set)=>({
    userData:[],
    filterUserData:[],
    userSearchQuery:'',
    updateUserData:(data:IUserUpdateFormType)=>set((state)=>({
        userData:state.userData.map((user)=>user.id===data.id?{...user,data}:user),
    })),
    updateFilterUserData:(data:IUserTableType)=>set((state)=>({
        filterUserData:state.filterUserData.map((user)=>user.key===data.key?data:user),
    })),
    addUserData:(data:IUserAddType)=>set((state)=>({
        filterUserData:[...state.filterUserData,{firstname:data.name.firstname,lastname:data.name.lastname,username:data.username,phone:data.phone,email:data.email,city:data.address.city,key:(+data.id!)}]
    })),
    removeUserData:(id:number)=>set((state)=>({
        filterUserData:state.filterUserData.filter((user)=>user!.key!==id),
    })),
   
    setUserSearchQuery:(query:string)=>set((_)=>({
        userSearchQuery:query
    })),
})))