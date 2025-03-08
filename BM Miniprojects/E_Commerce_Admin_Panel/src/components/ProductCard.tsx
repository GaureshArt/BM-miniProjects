import { DeleteOutlined, EditOutlined, ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { Button, Card, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import { IProductType } from "../types/productsTypes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../api/productsApi";
import { useProductStore } from "../stores/useProductStore";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../stores/useAuth";
import { Role } from "../types/authTypes";
import { IProductCartType } from "../types/cartTypes";

interface IProductCardProps {
  prod: IProductType;
  handleNewCartProd:(data: IProductCartType) => void
}
export const ProductCard = ({ prod,handleNewCartProd }: IProductCardProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const deleteProd = useProductStore((state) => state.deleteProduct);
  const setFilterProduct = useProductStore((state) => state.setFilterProduct);
  const [modalText] = useState("This is will permanently remove product.");
  const {role} = useAuth();
  const { mutate: prodDelete, isPending } = useMutation({
    mutationKey: ["productDelete"],
    mutationFn: deleteProduct,
    onSuccess: (_, __, context) => {
      toast.success("Product remove successfully ", { id: context });
      deleteProd(prod.id);
      setFilterProduct();
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
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    prodDelete({ prodId: prod.id });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  
  const addCartHandle = ()=>{
    handleNewCartProd({productId:prod.id,quantity:1});
  }
  return (
    <>
      <Toaster />
      <Card
        style={{ width: 300, border: "1px solid #d4d4d8", fontFamily: "serif" }}
        cover={
          <img
            className="cursor-pointer"
            onClick={() => navigate(`${prod.id}`)}
            style={{
              objectFit: "contain",
              width: "full",
              height: "14rem",
              padding: "1rem",
            }}
            alt={`product-${prod.id}`}
            src={prod.image}
          />
        }
        actions={role===Role.user?[
          <Button
            color="purple"
            variant="text"
            icon={<ShoppingCartOutlined key="addCart" />}
            onClick={addCartHandle}
          />]:[
          <Button
            color="red"
            variant="text"
            disabled={isPending}
            icon={<DeleteOutlined key="delete" />}
            onClick={showModal}
          />,
          <Button
            color="gold"
            variant="text"
            icon={<EditOutlined key="edit" />}
            onClick={() => navigate(`editProduct/${prod.id}`)}
          />,
          

        ]}
      >
        <Meta title={prod.title} />
        <Modal
          title="Are you sure?"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{
            style: { backgroundColor: "red", borderColor: "red" },
          }}
          cancelButtonProps={{ variant: "text", color: "geekblue" }}
        >
          <p>{modalText}</p>
        </Modal>
        <div className="text-lg">
          <h1>Price: {prod.price}</h1>
          <h1 className="flex gap-3">
            {" "}
            <StarFilled /> {prod.rating?.rate}
          </h1>
        </div>
      </Card>
    </>
  );
};
