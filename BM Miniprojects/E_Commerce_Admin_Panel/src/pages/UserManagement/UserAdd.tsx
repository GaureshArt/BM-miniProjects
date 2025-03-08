import { useForm } from "react-hook-form";
import { IUserAddType,} from "../../types/userTypes";
import { useMutation } from "@tanstack/react-query";
import { userAddApi } from "../../api/userApi";
import { useUserStore } from "../../stores/useUserStore";
import toast, { Toaster } from "react-hot-toast";

export const UserAdd = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IUserAddType>();
      const addUserdata = useUserStore((state)=>state.addUserData);
      const {mutate:addUser,} =useMutation({
        mutationKey:['addUser'],
        mutationFn:userAddApi,
        onSuccess:(data,{data:userData},context)=>{
            toast.success('user data added successfully',{id:context});
            const newData:IUserAddType = {...userData,id:data.id}
    
            addUserdata(newData);
            reset();
        },
        onError:(error,_,context)=>{
            toast.error(`user data not  added ${error.message}`,{id:context});
        },
        onMutate:()=>{
            const toastId = toast.loading("Please wait userdata is updating!");
            return toastId;
        }


      })
      const onSubmit = (data: IUserAddType) => {
        console.log("Submitted Data:", data);
        addUser({data:data});
      };
  return (
    <>  <Toaster/>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 font-serif">
      <div className="border p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">User Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              {...register("name.firstname", { required: "First name is required" })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="firstname"
            />
            {errors.name?.firstname && <span className="text-red-500 text-sm">{errors.name?.firstname.message}</span>}
          </div>

          
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              {...register("name.lastname", { required: "Last name is required" })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="lastname"
            />
            {errors.name?.lastname && <span className="text-red-500 text-sm">{errors.name?.lastname.message}</span>}
          </div>

          
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" },
              })}
              type="number"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="phone"
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>

          
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address" },
              })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="your_username"
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
          </div>

          
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="******"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
              
          <div className="col-span-2">
            <label className="block text-gray-700">City</label>
            <input
              {...register("address.city", { required: "City is required" })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your City"
            />
            {errors.address?.city && <span className="text-red-500 text-sm">{errors.address?.city.message}</span>}
          </div>
          
          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-zinc-900 text-white px-6 py-2 rounded-lg cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

    </>
  )
}
