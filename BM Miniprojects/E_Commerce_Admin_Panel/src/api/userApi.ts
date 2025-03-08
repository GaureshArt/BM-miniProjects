import { useUserStore } from "../stores/useUserStore";
import { IUserAddType, IUserType, IUserUpdateFormType } from "../types/userTypes";
import { fakeStoreApi } from "./authApi"

export const getAllUsers = async ():Promise<IUserType[]>=>{
    const res = await fakeStoreApi.get<IUserType[]>('/users');
    const data =  res.data;
    console.log(data);
    useUserStore.setState({
        userData: data,
        filterUserData:data.map((user) => ({
            firstname: user.name.firstname,
            lastname:user.name.lastname,
            email: user.email,
            key: user.id,
            phone: user.phone,
            username:user.username,
            city:(user.address!.city)!,
        })),
    })
    return res.data;
}

export const updateUser = async({data}:{data:IUserUpdateFormType}):Promise<IUserUpdateFormType>=>{
    const res = await fakeStoreApi.patch<IUserUpdateFormType>(`/users/${data.id}`,data);
    return res.data;
}

export const userAddApi = async({data}:{data:IUserAddType}):Promise<IUserType>=>{
    
    const res = await fakeStoreApi.post<IUserType>('/users',{username:data.username,email:data.email,password:data.password});
    
    return res.data;
}


export const userDelete = async(id:number)=>{
    const res = await fakeStoreApi.delete(`/users/${id}`);
    return res.data;
}

export const getUserById = async(id:number)=>{
    const res = await fakeStoreApi.get(`/users/${id}`);
    return res.data;
}