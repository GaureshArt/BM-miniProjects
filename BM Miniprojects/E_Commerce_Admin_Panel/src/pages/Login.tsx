import { useForm } from "react-hook-form";
import { IAuthFormType } from "../types/authTypes";
import { Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { authLogin } from "../api/authApi";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../stores/useAuth";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthFormType>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { setId, setRole, setUsername } = useAuth();
  const navigate = useNavigate();
  const { mutate: loginMutate, isPending } = useMutation({
    mutationKey: ["authLogin"],
    mutationFn: authLogin,
    onMutate: () => {
      const toastId = toast.loading("please wait");
      return toastId;
    },
    onSuccess: (data, formData,context) => {
      setRole(isAdmin);
      const decode = jwtDecode(data.token);
      setUsername(formData.username);
      setId(Number(decode.sub));
      navigate("/adminPanel");
      toast.success("Successfully login", { id: context });
    },
    onError: (_, __, context) => {
      toast.error("Username or password is incorrect",{id:context});
    },
  });
  const onSubmitForm = (data: IAuthFormType) => {

    loginMutate(data);
  };

  return (
    <>
      <Toaster />
      <div className="w-svw h-svh flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="border rounded-2xl w-96 h-70 flex gap-5 flex-col border-zinc-300 p-3"
        >
          <div>
            <UserOutlined className="w-10 text-2xl" />
            <input
              {...register("username", {
                required: "Please enter valid username",
              })}
              placeholder="Username"
              className="border h-10 rounded-lg p-2"
            />
            <p className="bg-red-100 text-red-500 m-1 rounded-lg pl-2">
              {errors.username ? errors.username.message : ""}
            </p>
          </div>
          <div>
            <LockOutlined className="w-10 text-2xl" />
            <input
              {...register("password", {
                required: "Please enter correct password",
              })}
              type="password"
              placeholder="Password"
              className="border h-10 rounded-lg p-2"
            />
            <p className="bg-red-100 text-red-500 m-1 rounded-lg pl-2">
              {errors.password ? errors.password.message : ""}
            </p>
          </div>
          <Button
            disabled={isPending}
            htmlType="submit"
            color="default"
            variant={"solid"}
            onClick={() => setIsAdmin(true)}
          >
            Log in as Admin
          </Button>
          <Button disabled={isPending} htmlType="submit" type={"primary"}>
            Log in as User
          </Button>
        </form>
      </div>
    </>
  );
};
