import { DeleteOutlined, EditOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { IProductType } from "../types/productsTypes";

interface IProductCardProps{
    prod:IProductType;
}
export const ProductCard = ({prod}:IProductCardProps) => {
  return (
    <>
      <Card
      
        style={{ width: 300 ,border:'1px solid #d4d4d8',fontFamily:'serif'}}
        cover={
          <img
            style={{objectFit:'contain',width:'full',height:'14rem',padding:'1rem'}}
            alt={`product-${prod.id}`}
            src={prod.image}
          />
        }
        actions={[
          <DeleteOutlined  key="delete" />,
          <EditOutlined key="edit" />,
        ]}
      >
        <Meta
          title={prod.title}
        />
        <div className="text-lg">
            <h1>Price: {prod.price}</h1>
            <h1 className="flex gap-3"> <StarFilled /> {prod.rating.rate}</h1>

        </div>
      </Card>
    </>
  );
};
