import { useSelector } from "react-redux";
import { UsersPreview } from "../components/user-components/UsersPreview";
import { Loader } from "../components/shared/Loader";
import { AddUpdateUser } from "../components/user-components/AddUpdateUser";

export const AdminDashboard = () => {
  let { isModalNewUserOpen } = useSelector((store) => store.modal);
  let { isLogging } = useSelector((store) => store.auth);
  let { isLoading } = useSelector((store) => store.user);

  return isLogging ? (
    <Loader />
  ) : (
    <section id="admin-dashboard">
      {isModalNewUserOpen && <AddUpdateUser />}
      <UsersPreview />
    </section>
  );
};
