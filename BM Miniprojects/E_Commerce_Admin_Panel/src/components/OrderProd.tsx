
import { IProductCartType, IRemoveProd, IUpdateQuantityProp } from '../types/cartTypes'
import { useProductStore } from '../stores/useProductStore';
import { ChangeEvent, useState } from 'react';
import { Modal } from 'antd';
import { useCartStore } from '../stores/useCartStore';
import { useMutation } from '@tanstack/react-query';
import { removeCartProd, updateCartProdQuant } from '../api/cartApi';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
interface IOrderProdProps{
    prod:IProductCartType;
    cartId:number;
}
export const OrderProd = ({prod,cartId}:IOrderProdProps) => {
    
    const cartProdData = useCartStore((state)=>state.cartData).find((cart)=>cart.id===cartId)?.products.find((p)=>p.productId===prod.productId);
    const [quant,setQuant] = useState<number>(cartProdData?.quantity!)
    const updateQuant = useCartStore((state)=>state.updateQuantity);
    const updateCart= useCartStore((state)=>state.updateCart);
    const removeProdFromCart = useCartStore((state)=>state.removeProd);
    const prodData = useProductStore((state)=>state.products)?.find((p)=>p.id===prod.productId)!;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {mutate:updateQuantApi} = useMutation({
        mutationKey:['updateQuantity'],
        mutationFn:updateCartProdQuant,
        onSuccess:(data)=>{
          console.log("update",data);
        
          }
        })
        
    const handleQuantity = (e:ChangeEvent<HTMLInputElement>)=>{
      setQuant(+e.target.value);
      
      
    }
    const showModal = () => {
      setIsModalOpen(true);
      
    };
    
    const handleOk = () => {
      const data= {prod:{...prod,quantity:quant},cartId:cartId}as IUpdateQuantityProp;
      
      updateQuant(data)
      setIsModalOpen(false);
        updateQuantApi(cartId)
        
      };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const {mutate:removeProdCart} = useMutation({
      mutationKey:['removeProdCart'],
      mutationFn:removeCartProd,
      onSuccess:(data,_,context)=>{
        
        toast.success(`Product  remove: successfully`, {
          id: context,
        });
      },
      onMutate: () => {
        const toastId = toast.loading("Please wait product is removing!");
        return toastId;
      },
      onError: (error, _, context) => {
        toast.error(`Product not remove: Error:${error.message}`, {
          id: context,
        });
      },
    })
    const handleProdRemove = ()=>{
      const data:IRemoveProd = {prodId:prod.productId,cartId:cartId};
      removeProdFromCart(data);
      removeProdCart(cartId)
    }
    if(!cartProdData)return<></>;
  return (
    <><Toaster/>
        <div className="border rounded-2xl shadow-md p-4 w-80 h-full flex flex-col items-center gap-4">
      <img src={prodData.image} alt={prodData.title} className="w-40 h-40 object-contain rounded-xl" />
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{prodData.title}</h2>
        <p className="text-lg text-gray-700">Price: ${prodData.price}</p>
        <div className="mt-4 flex items-center gap-2">
          <div>
            <span>Quantity:{cartProdData?.quantity}</span>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <input type="number" value={quant}  onChange={handleQuantity}/>
            </Modal>
          </div>
          <span className="text-lg">Total: ${cartProdData?.quantity!*prodData.price}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <button  className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 transition" onClick={showModal}>Update</button>
        <button  className="bg-red-600 text-white rounded-xl px-4 py-2 hover:bg-red-700 transition" onClick={handleProdRemove}>Remove</button>
      </div>
    </div>
    </>
  )
}
