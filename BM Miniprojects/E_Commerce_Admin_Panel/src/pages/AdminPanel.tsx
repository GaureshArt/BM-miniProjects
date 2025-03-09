import { Splitter } from "antd";
import { Navbar } from "../components/Navbar";

import { useCartStore } from "../stores/useCartStore";
import SalesChart from "../components/SalesChart";
import { ICartType } from "../types/cartTypes";
import SalesTrendsChart, { ISalesData } from "../components/SalesTrendsChart";
import SalesPerUser, { IPieChartData } from "../components/SalesPerUser";

const getProductSalesData = (cartData: ICartType[]) => {
  const salesMap = new Map<number, number>();

  cartData.forEach((cart) => {
    cart.products.forEach(({ productId, quantity }) => {
      salesMap.set(productId, (salesMap.get(productId) || 0) + quantity);
    });
  });

  return Array.from(salesMap, ([productId, totalQuantity]) => ({
    productId,
    totalQuantity,
  }));
};

const getSalesTrends = (cartData: ICartType[]) => {
  const salesMap = new Map<string, number>();

  cartData.forEach((cart) => {
    const date = cart.date;
    const totalQuantity = cart.products.reduce((sum, p) => sum + p.quantity, 0);
    salesMap.set(date, (salesMap.get(date) || 0) + totalQuantity);
  });

  return Array.from(salesMap, ([date, totalSales]) => ({ date, totalSales }));
};
const getUserSaleData = (cartData: ICartType[]) => {
  const userMap = new Map<number, number>();
  cartData.forEach((cart) => {
    const userId = cart.userId;

    const totalProducts = cart.products.length;
    userMap.set(userId, (userMap.get(userId) || 0) + totalProducts);
  });
  return Array.from(userMap, ([user, totalProducts]) => ({
    userId: `userId: ${user}`,
    totalProducts,
  }));
};

export const AdminPanel = () => {
  const cartData = useCartStore((state) => state.cartData);
  const totalProductSales = getProductSalesData(cartData);
  const productSalesByDate: ISalesData[] = getSalesTrends(cartData);
  const userTotalOrders: IPieChartData[] = getUserSaleData(cartData);
  return (
    <>
      <div className="w-svw p-2 font-serif  flex justify-center ">
        <Navbar />
      </div>

      <Splitter
        style={{ height: 600, boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      >
        <Splitter.Panel collapsible>
          <div className=" w">
            <SalesPerUser data={userTotalOrders} />
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <Splitter layout="vertical">
            <Splitter.Panel>
              <SalesTrendsChart salesData={productSalesByDate} />
            </Splitter.Panel>
            <Splitter.Panel>
              <SalesChart salesData={totalProductSales} />
            </Splitter.Panel>
          </Splitter>
        </Splitter.Panel>
      </Splitter>
    </>
  );
};
