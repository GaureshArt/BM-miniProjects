import { useNavigate } from "react-router-dom";
import { IUserType } from "../types/userTypes";

interface UserCardProp {
  user: Partial<IUserType>;
}
export const UserCard = ({ user }: UserCardProp) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl border border-gray-300 p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {user?.name?.firstname} {user?.name?.lastname}
          </h2>
          <p className="text-gray-500 text-lg">@{user.username}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-xl shadow-sm">
            <span className="text-gray-700 font-semibold">📧 Email:</span>
            <p className="text-gray-600 break-words">{user.email}</p>
          </div>

          <div className="p-5 bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm">
            <span className="text-gray-700 font-semibold">📞 Phone:</span>
            <p className="text-gray-600">{user.phone}</p>
          </div>

          <div className="p-5 bg-purple-50 border-l-4 border-purple-500 rounded-xl shadow-sm col-span-1">
            <span className="text-gray-700 font-semibold">🏠 Street:</span>
            <p className="text-gray-600">
              {user?.address?.number}, {user.address?.street}
            </p>
          </div>

          <div className="p-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl shadow-sm col-span-1">
            <span className="text-gray-700 font-semibold">
              📍 City & Zipcode:
            </span>
            <p className="text-gray-600">
              {user.address?.city}, {user.address?.zipcode}
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/adminPanel/users")}
            className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-500 text-white text-lg px-6 py-3 rounded-xl hover:shadow-lg transition"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
