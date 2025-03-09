import { Button } from "antd";
import { useForm } from "react-hook-form";
import { IUserTableType, IUserUpdateFormType } from "../../types/userTypes";
import { useUserStore } from "../../stores/useUserStore";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../api/userApi";
import toast, { Toaster } from "react-hot-toast";

export const UserEdit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserUpdateFormType>();
  const { userId } = useParams();
  // const userDataUpdate = useUserStore((state)=>state.updateUserData)
  const updateFilterUserData = useUserStore(
    (state) => state.updateFilterUserData
  );
  const initialUserData = useUserStore((state) => state.filterUserData).find(
    (user) => user.key === +userId!
  );
  const { mutate: userUpdate, isPending } = useMutation({
    mutationKey: ["userUpdate"],
    mutationFn: updateUser,
    onSuccess: (data: IUserUpdateFormType, _, context) => {
      

      const newData: IUserTableType = {
        key: data.id!,
        phone: data.phone,
        username: data.username,
        email: data.email,
        firstname: data.firstname!,
        lastname: data.lastname,
        city: data.city!,
      };
      
      updateFilterUserData(newData);
      toast.success("user data updated", { id: context });
      reset();
    },
    onError: (error, _, context) => {
      
      toast.error(`user data not  updated ${error.message}`, { id: context });
      reset();
    },
    onMutate: () => {
      const toastId = toast.loading("Please wait userdata is updating!");
      return toastId;
    },
  });
  const handleUpdateUser = (data: IUserUpdateFormType) => {
    
    userUpdate({ data: { ...data, id: +userId! } });
  };
  return (
    <>
      <Toaster />
      <div className="w-svw h-svh flex justify-center items-center font-serif">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="grid grid-cols-2 gap-4 border p-5 rounded-lg"
        >
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">First Name</label>
            <input
              {...register("firstname", {
                required: "Please enter user firstname",
              })}
              type="text"
              defaultValue={initialUserData?.firstname}
              placeholder="Enter first name"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.firstname && (
              <span className="text-red-500">{errors.firstname.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Last Name</label>
            <input
              {...register("lastname", {
                required: "Please enter user lastname",
              })}
              type="text"
              defaultValue={initialUserData?.lastname}
              placeholder="Enter last name"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.lastname && (
              <span className="text-red-500">{errors.lastname.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">City</label>
            <input
              type="text"
              {...register("city", {
                required: "Please enter user city name",
              })}
              defaultValue={initialUserData?.city}
              placeholder="Enter city"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              {...register("phone", {
                required: "Please enter user phone number",
              })}
              defaultValue={initialUserData?.phone}
              placeholder="Enter phone number"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="text-gray-600 mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Please enter user email",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              defaultValue={initialUserData?.email}
              placeholder="Enter email"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="col-span-2 flex justify-center mt-4">
            <Button
              disabled={isPending}
              htmlType="submit"
              color="default"
              variant={"solid"}
            >
              {" "}
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
