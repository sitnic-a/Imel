import { useSelector } from "react-redux";
import { Loader } from "../components/shared/Loader";
import { fetchLocationStateHook } from "../custom/fetchLocationStateHook";

export const UserDashboard = () => {
  let { loggedUser } = fetchLocationStateHook();
  let { isLogging } = useSelector((store) => store.auth);

  return isLogging ? (
    <Loader />
  ) : (
    <section id="user-dashboard">
      <p>
        Dobrodošao na svoj home page poštovani korisniče {loggedUser.email}!
      </p>
    </section>
  );
};
