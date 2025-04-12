import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux-toolkit/features/userSlice";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { fetchLocationStateHook } from "../../custom/fetchLocationStateHook";
import { Confirmation } from "../shared/Confirmation";
import {
  closeConfirmModal,
  displayConfirmationContainer,
} from "../../helpers/shared-helpers";
import { openDeleteUserModal } from "../../redux-toolkit/features/modalSlice";

export const UserDataGridView = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { loggedUser } = fetchLocationStateHook();
  let { paginationParams } = useSelector((store) => store.pagination);
  let { dbUsers, usersCount } = useSelector((store) => store.user);
  let { isModalDeleteUserOpen } = useSelector((store) => store.modal);
  let lastPage = parseInt(usersCount / paginationParams.elementsPerPage);

  let query = {
    email: "",
    status: null,
  };

  useEffect(() => {
    let newPaginationParams = {
      ...paginationParams,
      lastPage: lastPage,
    };
    dispatch(getUsers([query, newPaginationParams]));
  }, [paginationParams.currentPage]);

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
                        let colActions = e.currentTarget.parentNode.parentNode;
                        let col = colActions.parentNode;
                        let confirmModal = col.querySelector("#confirmation");
                        dispatch(openDeleteUserModal(!isModalDeleteUserOpen));
                        if (isModalDeleteUserOpen === false) {
                          dispatch(openDeleteUserModal(!isModalDeleteUserOpen));
                          displayConfirmationContainer(confirmModal);
                          return;
                        }
                        if (isModalDeleteUserOpen === true) {
                          dispatch(openDeleteUserModal(!isModalDeleteUserOpen));
                          closeConfirmModal(confirmModal);
                          return;
                        }
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
