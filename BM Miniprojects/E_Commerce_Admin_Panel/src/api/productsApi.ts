import { useProductStore } from "../stores/useProductStore";
import { IProductType } from "../types/productsTypes";
import { fakeStoreApi } from "./authApi";

export const getAllProducts = async (): Promise<IProductType[]> => {
  const res = await fakeStoreApi.get<IProductType[]>("/products");
  useProductStore.setState({ products: res.data, filterProducts: res.data });
  return res.data;
};

export const addProduct = async (
  data: Partial<IProductType>
): Promise<IProductType> => {
  const res = await fakeStoreApi.post<IProductType>("/products", data);
  return res.data;
};

export const updateProduct = async ({
  prod,
}: {
  prod: IProductType;
}): Promise<IProductType> => {
  const res = await fakeStoreApi.patch<IProductType>(
    `/products/${prod.id}`,
    prod
  );
  return res.data;
};
export const deleteProduct = async ({ prodId }: { prodId: number }) => {
  const res = await fakeStoreApi.delete(`/products/${prodId}`);
  return res.data;
};
