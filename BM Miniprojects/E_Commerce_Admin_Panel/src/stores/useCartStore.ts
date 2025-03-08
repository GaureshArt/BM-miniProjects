import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICartType, IUpdateQuantityProp, IUseCartType } from "../types/cartTypes";

export const useCartStore = create<IUseCartType>()(devtools((set)=>({
    cartData :[] as ICartType[],
    updateQuantity:(data:IUpdateQuantityProp)=>set((state)=>({
        cartData:state.cartData.map((cart)=>
            cart.id===data.cartId?{
                ...cart,
                products:cart.products.map((prod)=>prod.productId===data.prod.productId?{...prod,quantity:data.prod.quantity}:prod)
            }:cart
        ),
    })),
    removeProd:(data)=>set((state)=>({
        cartData:state.cartData.map((cart)=>cart.id===data.cartId?{
            ...cart,
            products:cart.products.filter((prod)=>prod.productId!==data.prodId),
        }:cart)
    })),
    updateCart:(data:ICartType)=>set((state)=>({
        cartData:[...state.cartData,data]
    })),
    renderCart:()=>set((state)=>({
        cartData:state.cartData
    })),
    addCart:(data:ICartType)=>set((state)=>({
        cartData:[...state.cartData,data]
    }))
})))