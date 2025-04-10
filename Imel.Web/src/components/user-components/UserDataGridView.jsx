import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux-toolkit/features/userSlice";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { application } from "../../application";

export const UserDataGridView = () => {
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

      {dbUsers.length > 0 &&
        dbUsers.map((dbUser) => {
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
  );
};
