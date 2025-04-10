import { useSelector } from "react-redux";
import { UsersPreview } from "../components/user-components/UsersPreview";
import { AddUpdateUser } from "../components/user-components/AddUpdateUser";

export const UserDashboard = () => {
  let { isModalNewUserOpen } = useSelector((store) => store.modal);
  return (
    <section id="user-dashboard">
      {isModalNewUserOpen && <AddUpdateUser />}
      <UsersPreview />
    </section>
  );
};
