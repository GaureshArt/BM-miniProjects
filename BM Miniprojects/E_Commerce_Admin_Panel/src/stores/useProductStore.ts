import { create } from "zustand";
import { IProductType, IUseProductType } from "../types/productsTypes";
import { devtools } from "zustand/middleware";
export const useProductStore = create<IUseProductType>()(devtools((set) => ({
  products: null,
  filterProducts: null,
  filterCategory:'All Products',
  sortType:'sort',
  searchQuery:'',
  setProducts: (data: IProductType[]) =>
    set({ products: data, filterProducts: data }),
  setFilterProduct: () =>
    set((state) =>
      state.filterCategory !== "All Products"
        ? {
            filterProducts: state.products?.filter(
              (prod) => prod.category === state.filterCategory
            ).filter((prod)=>state.searchQuery==='' || prod.title.toLowerCase().includes(state.searchQuery.toLowerCase())),
          }
        : {
            filterProducts: state.products?.filter((prod)=>state.searchQuery==='' || prod.title.toLowerCase().includes(state.searchQuery.toLowerCase())),
          }
    ),
    sortFilterData:()=>set((state)=>(
        state.sortType==='sort'?{
            filterProducts:state.filterProducts
        }:
        state.sortType==="low"?{
            filterProducts:state.filterProducts?.toSorted((a:IProductType,b:IProductType)=>a.price-b.price)
        }:{
           filterProducts:state.filterProducts?.toSorted((a:IProductType,b:IProductType)=>b.price-a.price) 
        }
    )),
    setSortType:(type:string)=>set((_)=>({
        sortType:type,
    })),
    setFilterCategory:(category:string)=>set((_)=>({
        filterCategory:category,
    })),
    resetFilterProduct:()=>set((state)=>({
        sortType:'sort',
        filterProducts:state.products,
        filterCategory:'All Products',
    })),
    setSearchQuery:(prodTitle:string)=>set((_)=>({
      searchQuery:prodTitle,
    })),
})));
