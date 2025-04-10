import { useDispatch } from "react-redux";
import { getUsers } from "../../redux-toolkit/features/userSlice";
import { application } from "../../application";

export const FilterUsers = () => {
  let dispatch = useDispatch();
  let query = {
    email: "",
    status: null,
  };

  let statuses = document.querySelectorAll("input[name='status-value'");
  let statusValue = null;

  statuses.forEach((s) => {
    s.addEventListener("change", (e) => {
      if (statusValue === null) {
        statusValue = document.querySelector(
          'input[name="status-value"]:checked'
        ).value;
      }
      statusValue = statusValue === "true";
    });
  });

  return (
    <div className="filter">
      <div className="query email-filter">
        <input
          className="email-input"
          type="text"
          placeholder="Find by email"
        />
      </div>
      <div className="query status-filter">
        <div className="query-status status-active">
          <label>Neaktivan</label>
          <input type="radio" name="status-value" value={false} />
        </div>
        <div className="query-status status-inactive">
          <label>Aktivan</label>
          <input type="radio" name="status-value" value={true} />
        </div>
      </div>
      <button
        className="filter-button"
        onClick={() => {
          query = {
            email: document.querySelector(".email-input").value,
            status: statusValue,
          };

          dispatch(getUsers([query, application.paginationParams]));
          statuses.forEach((status) => {
            status.checked = false;
          });
          statusValue = null;
        }}
      >
        Traži
      </button>
    </div>
  );
};
