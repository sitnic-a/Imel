import { useSelector } from "react-redux";
import { UsersPreview } from "../components/user-components/UsersPreview";
import { AddUpdateUser } from "../components/user-components/AddUpdateUser";
import { Loader } from "../components/shared/Loader";

export const UserDashboard = () => {
  let { isModalNewUserOpen } = useSelector((store) => store.modal);
  let { isLogging } = useSelector((store) => store.auth);

  return isLogging ? (
    <Loader />
  ) : (
    <section id="user-dashboard">
      <p>Dobrodošao na svoj home page poštovani korisniče!</p>
    </section>
  );
};
