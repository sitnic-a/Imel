import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux-toolkit/features/userSlice";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const UserDataGridView = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { paginationParams } = useSelector((store) => store.pagination);
  let { dbUsers, usersCount } = useSelector((store) => store.user);
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
                      onClick={() => navigate(`/user/${dbUser.id}`)}
                    />
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
