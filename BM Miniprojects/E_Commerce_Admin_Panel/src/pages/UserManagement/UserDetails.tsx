import { useParams } from "react-router-dom";
import { UserCard } from "../../components/UserCard";
import { useUserStore } from "../../stores/useUserStore";

export const UserDetails = () => {
  const { userId } = useParams();
  const user = useUserStore((state) => state.userData).find(
    (user) => user.id === +userId!
  );

  return <UserCard user={user!} />;
};
