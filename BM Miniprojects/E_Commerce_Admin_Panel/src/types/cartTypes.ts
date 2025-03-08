export interface IProductCartType{
    productId:number;
    quantity:number;
}
export interface ICartType{
    id:number;
    userId:number;
    date:string;
    products:IProductCartType[];
}

export interface IUpdateQuantityProp {
    prod:IProductCartType;
    cartId:number;
}
export interface IRemoveProd {
    prodId:number;
    cartId:number;
}
export interface IUseCartType{
    cartData:ICartType[];
    updateQuantity:(data:IUpdateQuantityProp)=>void;
    removeProd:(data:IRemoveProd)=>void;
    updateCart:(data:ICartType)=>void;
    renderCart:()=>void;
    addCart:(data:ICartType)=>void;


}
export interface IAddCartProd{
    products:IProductCartType[];
    userId:number;
    date:string;
}