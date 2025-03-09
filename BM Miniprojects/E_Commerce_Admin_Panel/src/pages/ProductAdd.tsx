import { Button } from "antd";
import { useForm } from "react-hook-form";
import { IProductType } from "../types/productsTypes";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../api/productsApi";
import { useProductStore } from "../stores/useProductStore";
import { Navbar } from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

export const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductType>();
  const addProductData = useProductStore((state) => state.addNewProduct);
  const { mutate: prodAdd, isPending } = useMutation({
    mutationKey: ["ProductAdd"],
    mutationFn: addProduct,
    onSuccess: (data, _, context) => {
      toast.success("Product update successfully ", { id: context });
      addProductData(data);
    },
    onError: (error, _, context) => {
      toast.error(`Product not updated: Error:${error.message}`, {
        id: context,
      });
    },
    onMutate: () => {
      const toastId = toast.loading("Please wait product is getting added!");
      return toastId;
    },
  });
  const handleFormSubmit = (data: IProductType) => {
    prodAdd(data);
  };
  return (
    <>
      <Toaster />
      <div className="w-svw flex justify-center m-4">
        <Navbar />
      </div>
      <div className="flex justify-center items-center w-svw mt-30 font-serif">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className=" w-3/7 h-auto border border-zinc-500 rounded-2xl p-4 "
        >
          <div className="flex w-full x">
            <div className="w-3/4">
              <div className="flex flex-col p-3 w-full">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Please enter product title",
                  })}
                  className="w-full border rounded-lg h-10 pl-4"
                />
                {errors.title && (
                  <span className="text-red-600 rounded-2xl">
                    {errors.title.message}
                  </span>
                )}
              </div>
            </div>
            <div className="w-1/2 ">
              <div className="flex flex-col p-3">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  {...register("price", {
                    required: "Please enter product price",
                  })}
                  className="w-30 border rounded-lg h-10 pl-4"
                />
                {errors.price && (
                  <span className="text-red-600 rounded-2xl">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex  gap-3 w-full p-5 flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              {...register("description", {
                required: "Please enter product Description",
              })}
              className="border rounded w-full h-22"
            ></textarea>
            {errors.description && (
              <span className="text-red-600  rounded-2xl">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex w-full x">
            <div className="w-3/4">
              <div className="flex flex-col p-3 w-full">
                <label htmlFor="image">Image Link</label>
                <input
                  type="text"
                  {...register("image", {
                    required: "Please enter product image link",
                  })}
                  className="w-full border rounded-lg h-10 pl-4"
                />
                {errors.image && (
                  <span className="text-red-600 rounded-2xl">
                    {errors.image.message}
                  </span>
                )}
              </div>
            </div>
            <div className="w-1/2 ">
              <div className="flex flex-col p-3">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  {...register("category", {
                    required: "Please enter product category",
                  })}
                  className="w-30 border rounded-lg h-10 pl-4"
                />
                {errors.category && (
                  <span className="text-red-600  rounded-md">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button
              disabled={isPending}
              htmlType="submit"
              color={"green"}
              variant={"solid"}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
