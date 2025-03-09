import axios from "axios";
import { IAuthFormType } from "../types/authTypes";

export const fakeStoreApi = axios.create({
    baseURL:'https://fakestoreapi.com'
});

export const authLogin = async (logData:IAuthFormType):Promise<string>=>{
    const res = await fakeStoreApi.post<string>('/auth/login',logData)
    return res.data;
}
