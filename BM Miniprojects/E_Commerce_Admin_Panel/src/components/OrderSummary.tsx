
import { IProductCartType } from '../types/cartTypes'
import { useProductStore } from '../stores/useProductStore'
import { useUserStore } from '../stores/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../api/userApi';
interface IOrderSummaryProps { 
    products: IProductCartType[];
    userId:number;
}

export const OrderSummary = ({ products,userId }: IOrderSummaryProps) => {
    const prodData = useProductStore((state) => state.products);
    const {data:user} = useQuery({
        queryKey:['userDataForCart'],
        queryFn:()=>getUserById(userId),
    })
    const orderSummaryData = products.map((p) => {
        const prod = prodData?.find((pr) => pr.id === p.productId);
        return {
            productName: prod?.title,
            productPrice: prod?.price || 0,
            productQuantity: p.quantity
        };
    });

    const totalExpense = orderSummaryData.reduce((total, prod) => total + (prod.productPrice * prod.productQuantity), 0);

    return (
        <div className=" bg-white shadow-lg rounded-2xl  h-auto p-6 border border-dashed ">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
             <div>
             <h3 className='text-red-500 font-bold'>Bill to : @ {user?.name?.firstname}   {user?.name?.lastname}</h3>  
             <h3 className='text-amber-600'>Ship to : {user?.address?.city}</h3> 
             </div>
             <hr />
            <div className="space-y-4">
                {orderSummaryData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                        <div>
                            <p className="text-gray-700 font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-500">${item.productPrice.toFixed(2)} × {item.productQuantity}</p>
                        </div>
                        <p className="text-gray-900 font-semibold">${(item.productPrice * item.productQuantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-lg font-bold text-blue-600">${totalExpense.toFixed(2)}</span>
            </div>
        </div>
    );
};
