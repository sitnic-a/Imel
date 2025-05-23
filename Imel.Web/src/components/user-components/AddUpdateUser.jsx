import { fetchLocationStateHook } from "../../custom/fetchLocationStateHook";
import { NewUser } from "./NewUser";
import { UpdateUser } from "./UpdateUser";

export const AddUpdateUser = () => {
  let { id } = fetchLocationStateHook();

  if (id === undefined) {
  }

  return (
    <section className="add-update-wrapper">
      {id === undefined && <NewUser />}
      {id !== undefined && id > 0 && <UpdateUser />}
    </section>
  );
};
