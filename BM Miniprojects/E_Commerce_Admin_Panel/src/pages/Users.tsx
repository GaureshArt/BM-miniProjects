import { ChangeEvent, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";

import { Button, Modal, Space, Table } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUsers, userDelete } from "../api/userApi";
import { useUserStore } from "../stores/useUserStore";
import { IUserTableType } from "../types/userTypes";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../stores/useAuth";
import { Role } from "../types/authTypes";
import { SearchOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

export const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const { role } = useAuth();
  const [userQeury, setUserQuery] = useState<string>("");
  const [userDeleteId, setUserDeleteId] = useState<number>(-1);
  const filterUserData = useUserStore.getState().filterUserData;
  const [userData, setUserData] = useState<IUserTableType[]>(filterUserData);
  const [modalText] = useState("This is will permanently remove User.");
  const removeUser = useUserStore((state) => state.removeUserData);


  useEffect(() => {
    const debounceTime = setTimeout(() => {
      userQeury.length === 0
        ? setUserData(filterUserData)
        : setUserData(
            filterUserData.filter((user) =>
              user.firstname.toLowerCase().includes(userQeury.toLowerCase())
            )
          );
    }, 400);
    return () => clearTimeout(debounceTime);
  }, [userQeury,filterUserData]);
 

  const { mutate: userRemove } = useMutation({
    mutationKey: ["userRemove"],
    mutationFn: userDelete,
    onSuccess: (_, id, context) => {
      removeUser(id);
      toast.success("User is remove successfully", { id: context });
    },
    onError: (error, _, context) => {
      toast.error(`user data not  remove ${error.message}`, { id: context });
    },
    onMutate: () => {
      const toastId = toast.loading("Please wait user is removing!");
      return toastId;
    },
  });


  const navigate = useNavigate();
  const showModal = (id: number) => {
    setOpen(true);
    setUserDeleteId(id);
  };

  const handleOk = () => {
    setOpen(false);

    userRemove(userDeleteId);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleUserQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setUserQuery(e.target.value);
  };
  if (role === Role.user) {
    navigate("/notAuth");
  }

  return (
    <>
      <Toaster />
      <div className="flex justify-center m-10 flex-col items-center gap-5">
        <Navbar />
        <div className="w-full flex justify-center gap-5">
          <SearchOutlined style={{ fontSize: "1.3rem" }} />
          <input
            defaultValue={userQeury}
            onChange={handleUserQuery}
            type="text"
            className="w-1/6 h-10 border rounded-lg border-zinc-300 p-2 "
            placeholder="search user by firstname"
          />
          <Button
            onClick={() => navigate("addUser")}
            variant="filled"
            color="geekblue"
            size="large"
          >
            {" "}
            Add User
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Table<IUserTableType>
          dataSource={userData}
          className="border rounded-lg"
          components={{
            body: {
              cell: (props) => (
                <td
                  {...props}
                  style={{ border: "1px solid #4d4d4d", padding: "8px" }}
                />
              ),
            },
          }}
          pagination={{
            pageSize: 4,
            current: currentPage,
            onChange: (page) => setCurrentPage(page), 
          }}
        >
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstname" key="firstname" />
            <Column title="Last Name" dataIndex="lastname" key="lastname" />
          </ColumnGroup>

          <Column title="city" dataIndex="city" key="city" />
          <Column title="phone" dataIndex="phone" key="phone" />
          <Column title="email" dataIndex="email" key="email" />
          <Column title="username" dataIndex="username" key="username" />
          <Column
            title="Action"
            className="w-50"
            key="action"
            render={(_, record: IUserTableType) => (
              <Space size="small">
                <Button
                  variant="filled"
                  color="magenta"
                  onClick={() => navigate(`editUser/${record.key}`)}
                >
                  Update
                </Button>
                <Button
                  color="red"
                  variant="text"
                  disabled={false}
                  onClick={() => showModal(record.key)}
                >
                  {" "}
                  Remove
                </Button>
                <Button
                  color="gold"
                  variant="dashed"
                  onClick={() => navigate(`userDetails/${record.key}`)}
                >
                  View Details
                </Button>
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
              </Space>
            )}
          />
        </Table>
      </div>
    </>
  );
};
