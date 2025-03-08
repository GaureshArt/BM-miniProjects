import { useQuery } from "@tanstack/react-query"
import { Navbar } from "../../components/Navbar"
import { getAllCarts } from "../../api/cartApi"
import { ICartType, IUseCartType } from "../../types/cartTypes"
import { Button, Skeleton } from "antd"
import { OrderProd } from "../../components/OrderProd"
import { useCartStore } from "../../stores/useCartStore"
import { OrderSummary } from "../../components/OrderSummary"
import { useAuth } from "../../stores/useAuth"
import { Role } from "../../types/authTypes"
import { useNavigate } from "react-router-dom"



export const Orders = () => {

  const role = useAuth((state)=>state.role);
  const roleId = useAuth((state)=>state.id);
  const navigate = useNavigate();
  
  const cartData = role===Role.admin?useCartStore((state)=>state.cartData):useCartStore((state)=>state.cartData).filter((cart)=>cart.userId===roleId);;
 

  return (
    <>
   <div className="w-svw m-1  p-2 mx-w-auto flex  justify-center">
      <Navbar />
      </div>
      <div className="flex justify-center">
         {role === Role.user &&<Button variant="filled" color="volcano" onClick={()=>navigate('/products')}>Add Cart</Button>}
      </div>
      <div className=" w-full flex justify-center items-center">
        <div className="w-full p-20  space-y-6">
          {cartData? cartData.map((cart:ICartType) => (
            <div key={cart.id} className="grid grid-cols-6 gap-4 w-full grid-rows-1 h-[30rem] ">
              <div className="col-span-4  p-6 bg-white border border-gray-300 rounded-xl shadow-md min-h-[250px] flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">🛒 Cart ID: {cart.id}</h3>
                <p className="text-gray-600">👤 User ID: {cart.userId}</p>
                <p className="text-gray-500">📅 Created On: {new Date(cart.date).toDateString()}</p>
                <div className="border border-dashed border-gray-400 rounded-md p-4 mt-4 flex-1 overflow-auto  scrollbar-hide">
                  <div className="flex gap-3 h-auto">
                    {
                      cart.products.length?
                      cart.products.map((prod)=>{
                        return <OrderProd key={prod.productId} prod={prod} cartId={cart.id}/>
                      }):<h1 className="text-4xl text-zinc-500 font-serif flex justify-center items-center w-full h-full ">Cart is empty</h1>
                    }
                    </div>
                </div>
              </div>
              <div className="col-span-2 p-6 bg-white border border-gray-300 rounded-xl shadow-md min-h-[200px] flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">📦 Order Details</h3>
                <div className=" border-gray-400 rounded-md p-4 mt-4 flex-1 overflow-scroll">
                    <OrderSummary products={cart.products} userId={cart.userId}/>
                </div>
              </div>
            </div>
          )):Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 w-full">
              <Skeleton active className="p-6 border rounded-xl min-h-[200px]" />
              <Skeleton active className="p-6 border rounded-xl min-h-[200px]" />
            </div>
          ))}
        </div>
      </div>
    
    </>

  )
}
