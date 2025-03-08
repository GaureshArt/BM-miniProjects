
import { fakeStoreApi } from "./authApi"
import { useCartStore } from "../stores/useCartStore";
import { IAddCartProd } from "../types/cartTypes";

  
  
export const  getAllCarts = async()=>{
  const res = await fakeStoreApi.get('/carts');
  useCartStore.setState({cartData:res.data});
  return res.data;
}
export const updateCartProdQuant = async(cartId:number)=>{
  const updateData = useCartStore.getState().cartData.find((cart)=>cart.id===cartId);
  const res = await fakeStoreApi.patch(`/carts/${cartId}`,updateData);
  console.log("respoense",res)
  return res.data;
}

export const removeCartProd = async(cartId:number)=>{
  const updateData = useCartStore.getState().cartData.find((cart)=>cart.id===cartId);
  console.log("remove Prod",updateData)
  const res = await fakeStoreApi.patch(`/carts/${cartId}`,updateData);
  console.log("respoense",res)
  return res.data;
}

export const addCartProd = async(data:IAddCartProd)=>{
  const res = await fakeStoreApi.post(`/carts`,data);
  return res.data;
  
}