import { useDispatch, useSelector } from "react-redux";
import { openNewUserModal } from "../../redux-toolkit/features/modalSlice";
import { FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { UserDataGridView } from "./UserDataGridView";
import { FilterUsers } from "./FilterUsers";

export const UsersPreview = () => {
  let dispatch = useDispatch();
  let { isModalNewUserOpen } = useSelector((store) => store.modal);

  return (
    <section id="users-preview">
      <header>
        <h1>Lista korisnika koji koriste aplikaciju</h1>
        <p>
          Na ovom dijelu aplikacije možete pregledati korisnike, mijenjati,
          dodavati ili brisati
        </p>
        <p>
          U sklopu pregleda moguće je korisnike filtirati po njihovom statusu
          aktivnosti ili emailu
        </p>
      </header>

      <div className="pagination">
        <div className="actions">
          <MdKeyboardArrowLeft className="pagination-arrow left" />
          <MdKeyboardArrowRight className="pagination-arrow right" />
        </div>
      </div>

      <FilterUsers />

      <div
        className="new-user"
        onClick={() => {
          dispatch(openNewUserModal(!isModalNewUserOpen));
        }}
      >
        <FaPlus className="new-user-icon" />
      </div>

      <UserDataGridView />
    </section>
  );
};
