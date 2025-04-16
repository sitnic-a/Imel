import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getById,
  setErrors,
  updateUser,
} from "../../redux-toolkit/features/userSlice";
import { fetchLocationStateHook } from "../../custom/fetchLocationStateHook";
import { verifyEnteredFields } from "../../utils";
import { Errors } from "../shared/Errors";
import { Loader } from "../shared/Loader";

export const UpdateUser = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { errors, isLoading } = useSelector((store) => store.user);
  let [email, setEmail] = useState("");
  let { id } = useParams();
  let { loggedUser } = fetchLocationStateHook();

  let statuses = document.querySelectorAll("input[name='status-value'");
  let statusValue = null;

  useEffect(() => {
    let requestObject = {
      id: id,
    };

    dispatch(getById(requestObject)).then((data) => {
      let user = data.payload.response;
      setEmail(user.email);
      if (user.status === true)
        document.querySelector(".status-value-active").checked = true;
      else document.querySelector(".status-value-inactive").checked = true;
    });
  }, []);

  let handleSaveChanges = () => {
    let requestObject = {
      email: email,
      status: statusValue,
    };
    let [errors, isValid] = verifyEnteredFields(requestObject);
    dispatch(setErrors(errors));
    if (isValid) {
      dispatch(updateUser([id, requestObject])).then((data) => {
        if (data.payload.statusCode === 200) {
          navigate("/dashboard", { state: { loggedUser } });
        }
        return;
      });
    }
  };

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

  return isLoading ? (
    <Loader />
  ) : (
    <section id="existing-user">
      <header>
        <h1>Trenutno se nalazite u dijelu za uređivanje korisnika</h1>
        <p>
          Ukoliko želite da uredite korisnike potrebno je da unesete nove
          vrijednosti te snimite promjene.
        </p>
        <p>
          <i>
            Promjene će biti odmah reflektovane u aplikaciji. Aplikacija
            trenutno omogućava uređivanje statusa te email adrese.
          </i>
        </p>
      </header>

      <div className="content">
        <div className="wrapper update-email">
          <p>
            Trenutna email adresa: <span className="required-field">*</span>
          </p>
          <input
            type="text"
            className="form-field email"
            placeholder="Unesite novu email adresu"
            value={email}
            onFocus={() => dispatch(setErrors([]))}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="wrapper update-status">
          <p>
            Trenutni status: <span className="required-field">*</span>
          </p>
          <div className="status form-field">
            <div className="status-active">
              <label>Aktivan</label>
              <input
                type="radio"
                name="status-value"
                className="status-value-active"
                value={true}
              />
            </div>

            <div className="status-inactive">
              <label>Neaktivan</label>
              <input
                type="radio"
                name="status-value"
                className="status-value-inactive"
                value={false}
              />
            </div>
          </div>
        </div>

        <div className="wrapper">
          <button
            type="button"
            className="save-changes"
            onClick={() => {
              handleSaveChanges();
            }}
          >
            Snimi promjene
          </button>

          <button
            type="button"
            className="save-changes"
            onClick={() => window.history.back()}
          >
            Odustani
          </button>
        </div>
        <Errors errors={errors} />
      </div>
    </section>
  );
};
