import { useParams } from "react-router-dom"
import { useProductStore } from "../stores/useProductStore";
import { useForm } from "react-hook-form";
import {  IProductType } from "../types/productsTypes";
import { Button } from "antd";
import { Navbar } from "../components/Navbar";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api/productsApi";
import toast, { Toaster } from "react-hot-toast";

export const ProductEdit = () => {
    const {prodId} = useParams();
    const prodData = useProductStore((state)=>state.products)?.find((prod)=>prod.id===(+prodId!));
    const updateProd = useProductStore((state)=>state.updateProduct);
     const { register,
        handleSubmit,
        formState:{
            errors
        }
       } = useForm<IProductType>();

        const {mutate:prodUpdate,isPending} = useMutation({
            mutationKey:['productUpdate'],
            mutationFn:updateProduct,
            onSuccess:(_,updateData,context)=>{
                
                toast.success('Product update successfully ',{id:context});
                updateProd(updateData.prod);
                
            },
            onMutate:()=>{
                const toastId = toast.loading("Please wait product is updating!");
                return toastId;
            },
            onError:(error,_,context)=>{
                toast.error(`Product not updated: Error:${error.message}`,{id:context});
            }

        })
       const handleFormSubmit = (data:IProductType)=>{
          
            prodUpdate({prod:{...data,id:+prodId!,rating:(prodData?.rating)!}});
       }
  return (
   <>
   <Toaster/>
   <div className="w-full flex justify-center m-4">
            <Navbar />
          </div>
      <div className="flex justify-center items-center mt-20 font-serif">
        <form onSubmit={handleSubmit(handleFormSubmit)} className=" w-3/7 h-auto border border-zinc-500 rounded-2xl p-4 ">
          <div className="flex w-full x">
            <div className="w-3/4">
              <div className="flex flex-col p-3 w-full">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  {...register("title",{
                    required:'Please enter product title'
                  })}
                  defaultValue={prodData?.title}
                  className="w-full border rounded-lg h-10 pl-4"
                />
                {errors.title&&<span className="text-red-600 rounded-2xl">{errors.title.message}</span>}
              </div>
            </div>
            <div className="w-1/2 ">
              <div className="flex flex-col p-3">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  {...register("price",{
                    required:'Please enter product price'
                  })}
                  defaultValue={prodData?.price}
                  className="w-30 border rounded-lg h-10 pl-4"
                />
               {errors.price&&<span className="text-red-600 rounded-2xl">{errors.price.message}</span>}
              </div>
            </div>
          </div>

          <div className="flex  gap-3 w-full p-5 flex-col">
            <label htmlFor="description">Description</label>
            <textarea {...register('description',{
                    required:'Please enter product Description'
                  })} 
                  defaultValue={prodData?.description}
                  className="border rounded w-full h-22 p-2 text-justify"></textarea>
            {errors.description&&<span className="text-red-600  rounded-2xl">{errors.description.message}</span>}

          </div>
          <div className="flex w-full x">
            <div className="w-3/4">
              <div className="flex flex-col p-3 w-full">
                <label htmlFor="image">Image Link</label>
                <input
                  type="text"
                  {...register("image",{
                    required:'Please enter product image link'
                  })}
                  defaultValue={prodData?.image}
                  className="w-full border rounded-lg h-10 pl-4"
                />
               {errors.image&&<span className="text-red-600 rounded-2xl">{errors.image.message}</span>}
              </div>
            </div>
            <div className="w-1/2 ">
              <div className="flex flex-col p-3">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  {...register("category",{
                    required:'Please enter product category'
                  })}
                  defaultValue={prodData?.category}
                  className="w-auto border rounded-lg h-10 pl-4"
                />
                {errors.category&&<span className="text-red-600  rounded-md">{errors.category.message}</span>}
              </div>
            </div>
          </div>
            <div className="w-full flex justify-center">
            <Button disabled={isPending} htmlType="submit" color={'green'} variant={'solid'} style={{fontSize:'1rem'}}>Update</Button>
            </div>
        </form>
      </div>
   </>
  )
}
