import { useMutation, useQuery } from "@tanstack/react-query";
import { Navbar } from "../components/Navbar";
import { getAllProducts } from "../api/productsApi";
import { Button, Skeleton } from "antd";
import { ProductCard } from "../components/ProductCard";
import { useProductStore } from "../stores/useProductStore";
import { ChangeEvent, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useAuth } from "../stores/useAuth";
import { Role } from "../types/authTypes";
import { useNavigate } from "react-router-dom";
import { ICartType, IProductCartType } from "../types/cartTypes";
import toast from "react-hot-toast";
import { addCartProd } from "../api/cartApi";
import { useCartStore } from "../stores/useCartStore";

export const Products = () => {
  const { isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const [searchProd, setSearchProd] = useState<string>("");
  const [newCartProduct,setNewCartProducts] = useState<IProductCartType[]>([])
  
  const nagivate = useNavigate();
  const role = useAuth((state) => state.role);
  const userId = useAuth((state)=>state.id);
  const filterData = useProductStore((state) => state.filterProducts);
  const setFilterData = useProductStore((state) => state.setFilterProduct);
  const sortFilterData = useProductStore((state) => state.sortFilterData);
  const setSortType = useProductStore((state) => state.setSortType);
  const setFilterCategory = useProductStore((state) => state.setFilterCategory);
  const resetFilterProd = useProductStore((state) => state.resetFilterProduct);
  const sortType = useProductStore((state) => state.sortType);
  const filterCategory = useProductStore((state) => state.filterCategory);
  const setSeachQuery = useProductStore((state) => state.setSearchQuery);
  const addCart = useCartStore((state)=>state.addCart);
  useEffect(() => {
    const queryTime = setTimeout(() => {
      setSeachQuery(searchProd);
      setFilterData();
    }, 300);
    return () => clearTimeout(queryTime);
  }, [searchProd]);
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
    handleFilterSorting();
  };
  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
    handleFilterSorting();
  };
  const handleFilterSorting = () => {
    setFilterData();
    sortFilterData();
  };
  const handleNewCartProd = (data:IProductCartType)=>{
    const isExist = newCartProduct.find((prod)=>prod.productId===data.productId);
    if(isExist){
      toast.success('Product is already added.');
      return;
    }
      setNewCartProducts((prev)=>[
        ...prev,
        data
      ])
  }

  const {mutate:addCartMutate} = useMutation({
    mutationKey:['addCart'],
    mutationFn:addCartProd,
    onSuccess:(data:ICartType)=>{
        console.log("onsucce",data);
        addCart(data);
    }
    
  })
  const handleNewCartAdd = ()=>{
    const data = {
      userId:userId,
      products:newCartProduct,
      date:new Date().toISOString(),
    }
    addCartMutate(data);

  }
  if (isLoading) {
    return (
      <div className=" flex  flex-wrap w-full gap-4 justify-evenly">
        {Array.from({ length: 20 })
          .fill(1)
          .map((_, ind) => {
            return (
              <div key={ind} className="w-60 h-40">
                <Skeleton active style={{ width: "10rem", height: "5rem" }} />
              </div>
            );
          })}
      </div>
    );
  }
  if (isError) {
    return <h1 className="text-red-500 bg-red-200">Error:${error.message} </h1>;
  }
  return (
    <>
      <div className="w-svw flex justify-center m-4">
        <Navbar />
      </div>
      <div className="w-svw h-svh p-1 ">
        <div className="flex gap-5 w-full justify-center m-3 font-serif">
          <div className="w-1/3 flex gap-1">
            <SearchOutlined className="text-2xl" style={{ color: "#71717a" }} />
            <input
              type="text"
              onChange={(e) => setSearchProd(e.target.value)}
              className="w-full border border-zinc-400 rounded-lg p-2"
            />
          </div>

          <select
            className="w-auto h-10 border-zinc-500 border rounded-lg"
            value={filterCategory}
            onChange={handleFilter}
          >
            <option value={"All Products"}>All Products</option>
            <option value="men's clothing">men's clothing</option>
            <option value="electronics">electronics</option>
            <option value="jewelery">jewelery</option>
            <option value="women's clothing">women's clothing</option>
          </select>
          <select
            className="w-auto h-10 border-zinc-500 border rounded-lg"
            value={sortType}
            onChange={handleSort}
          >
            <option disabled value="sort">
              Sort
            </option>
            <option value="low">{"Low -> High"}</option>
            <option value="high">{"High -> Low"}</option>
          </select>
          <Button
            color="gold"
            variant="filled"
            size="large"
            style={{ fontFamily: "serif" }}
            onClick={resetFilterProd}
          >
            Reset
          </Button>
          {role === Role.admin ? (
            <Button
              color="purple"
              size="large"
              variant="filled"
              style={{ fontFamily: "serif" }}
              onClick={() => nagivate("addProduct")}
            >
              Add Product
            </Button>
          ) : (
            newCartProduct.length?<Button style={{fontFamily:'serif'}} size="large" variant="filled" color="geekblue" onClick={handleNewCartAdd}>Confirm Cart Products</Button>:''
          )}
        </div>

        <div className=" flex  flex-wrap w-full gap-4 justify-evenly">
          {filterData!.map((prod) => {
            return <ProductCard key={prod.id} prod={prod} handleNewCartProd = {handleNewCartProd} />;
          })}
        </div>
      </div>
    </>
  );
};
