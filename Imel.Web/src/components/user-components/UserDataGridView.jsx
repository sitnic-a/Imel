import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, setDbUser } from "../../redux-toolkit/features/userSlice";
import { openDeleteUserModal } from "../../redux-toolkit/features/modalSlice";
import { fetchLocationStateHook } from "../../custom/fetchLocationStateHook";
import { displayConfirmationContainer } from "../../helpers/shared-helpers";
import { Confirmation } from "../shared/Confirmation";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Loader } from "../shared/Loader";

export const UserDataGridView = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { loggedUser } = fetchLocationStateHook();
  let { paginationParams } = useSelector((store) => store.pagination);
  let { dbUsers, usersCount, isLoading } = useSelector((store) => store.user);
  let { isModalDeleteUserOpen } = useSelector((store) => store.modal);
  let lastPage = parseInt(usersCount / paginationParams.elementsPerPage);

  useEffect(() => {
    dispatch(getUsers([null, paginationParams]));
  }, [paginationParams.currentPage]);

  return isLoading ? (
    <Loader />
  ) : (
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
                    <MdModeEdit
                      className="action edit"
                      onClick={() =>
                        navigate(`/user/${dbUser.id}`, {
                          state: { loggedUser },
                        })
                      }
                    />
                  </span>
                  <span>
                    <MdDelete
                      className="action delete"
                      onClick={(e) => {
                        dispatch(setDbUser(dbUser));
                        let colActions = e.currentTarget.parentNode.parentNode;
                        let col = colActions.parentNode;
                        let confirmModal = col.querySelector("#confirmation");
                        displayConfirmationContainer(confirmModal);
                        dispatch(openDeleteUserModal(!isModalDeleteUserOpen));
                      }}
                    />
                  </span>
                </div>
                <Confirmation />
              </div>
            </div>
          );
        })}
    </div>
  );
};
