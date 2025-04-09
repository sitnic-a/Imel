import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux-toolkit/features/userSlice";
import { application } from "../../application";
import { FaPlus } from "react-icons/fa6";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdModeEdit,
  MdDelete,
} from "react-icons/md";

export const UsersPreview = () => {
  let dispatch = useDispatch();
  let { dbUsers } = useSelector((store) => store.user);

  let query = {
    email: "",
    status: null,
  };

  useEffect(() => {
    dispatch(getUsers([query, application.paginationParams]));
  }, []);

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

      <div className="filter">
        <div className="query email-filter">
          <input type="text" placeholder="Find by email" />
        </div>
        <div className="query status-filter">
          <label>Neaktivan</label>
          <input type="checkbox" name="status-value" value={false} />
          <label>Aktivan</label>
          <input type="checkbox" name="status-value" value={true} />
        </div>
      </div>

      <div className="new-user">
        <FaPlus className="new-user-icon" />
      </div>

      <div className="user-list-main-container">
        <div className="cols">
          <div className="col col-email">
            <p>Email</p>
          </div>

          <div className="col col-status">
            <p>Status</p>
          </div>

          <div className="col col-actions"></div>
        </div>

        {dbUsers.map((dbUser) => {
          return (
            <div className="users cols" key={dbUser.id}>
              <div className="col">
                <span>{dbUser.email}</span>
              </div>
              <div className="col">
                <span>{dbUser.statusAsString}</span>
              </div>
              <div className="col">
                <div className="col-actions">
                  <span>
                    <MdModeEdit className="action edit" />
                  </span>
                  <span>
                    <MdDelete className="action delete" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
