import { useParams } from "react-router-dom"
import { useProductStore } from "../stores/useProductStore"
import { IProductType } from "../types/productsTypes";
import { StarFilled } from "@ant-design/icons";


export const ProductView = () => {
    const {prodId} =  useParams()
    const prodData = (useProductStore((state)=>state.products)?.find((prod)=>prod.id===+prodId!)) as IProductType;

  return (
    <>
        <div className="w-svw h-svh flex justify-center items-center font-serif">
            <div className="border border-zinc-400 rounded-2xl w-1/2 h-1/2 flex">
                <div className="w-1/3 h-full pl-4">
                    <img src={prodData.image} alt="productImage" className="w-full h-full object-contain" />
                </div> 
                <div className=" w-2/3 flex flex-col items-center p-4 gap-10">
                    <h1 className="text-2xl">{prodData.title}</h1>
                    <p className="text-justify">{prodData.description}</p>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl">Price: ${prodData.price}</h1>
                        <h1 className="text-xl">Rating: <StarFilled/> {prodData.rating?.rate} ({prodData.rating?.count} reviews)</h1>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
