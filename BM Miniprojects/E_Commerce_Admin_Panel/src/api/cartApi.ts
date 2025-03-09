import { fakeStoreApi } from "./authApi";
import { useCartStore } from "../stores/useCartStore";
import { IAddCartProd, ICartType } from "../types/cartTypes";

export const getAllCarts = async (): Promise<ICartType[]> => {
  const res = await fakeStoreApi.get<ICartType[]>("/carts");
  useCartStore.setState({ cartData: res.data });
  return res.data;
};
export const updateCartProdQuant = async (
  cartId: number
): Promise<ICartType> => {
  const updateData = useCartStore
    .getState()
    .cartData.find((cart) => cart.id === cartId);
  const res = await fakeStoreApi.patch<ICartType>(
    `/carts/${cartId}`,
    updateData
  );

  return res.data;
};

export const removeCartProd = async (cartId: number): Promise<ICartType> => {
  const updateData = useCartStore
    .getState()
    .cartData.find((cart) => cart.id === cartId);

  const res = await fakeStoreApi.patch<ICartType>(
    `/carts/${cartId}`,
    updateData
  );

  return res.data;
};

export const addCartProd = async (data: IAddCartProd): Promise<ICartType> => {
  const res = await fakeStoreApi.post<ICartType>(`/carts`, data);
  return res.data;
};
