export interface IRatingType{
    rate:number;
    count:number;
}
export interface IProductType{
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating:IRatingType;
}

export interface IUseProductType{
    products:IProductType[] | null;
    filterProducts:IProductType[] | null;
    sortType:string;
    filterCategory:string;
    searchQuery:string;
    setProducts:(data:IProductType[])=>void;
    setFilterProduct:()=>void;
    sortFilterData:()=>void;
    setFilterCategory:(data:string)=>void;
    setSortType:(data:string)=>void;
    resetFilterProduct:()=>void;
    setSearchQuery:(data:string)=>void;
    addNewProduct:(data:IProductType)=>void;
    updateProduct:(data:IProductType)=>void;
    deleteProduct:(id:number)=>void;
}
