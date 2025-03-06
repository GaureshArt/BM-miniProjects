import { useProductStore } from "../stores/useProductStore";
import { IProductType } from "../types/productsTypes";
import { fakeStoreApi } from "./authApi"

export const getAllProducts = async():Promise<IProductType[]>=>{
    const res = await fakeStoreApi.get<IProductType[]>('/products');
    useProductStore.setState({products:res.data,filterProducts:res.data});
    return res.data;
}