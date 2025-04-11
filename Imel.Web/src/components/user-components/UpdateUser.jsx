import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../redux-toolkit/features/userSlice";

export const UpdateUser = () => {
  let dispatch = useDispatch();
  let [email, setEmail] = useState("");
  let { id } = useParams();

  let statuses = document.querySelectorAll("input[name='status-value'");
  let statusValue = null;

  let handleSaveChanges = () => {
    let requestObject = {
      email: email,
      status: statusValue,
    };
    dispatch(updateUser([id, requestObject]));
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

  return (
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
              <input type="radio" name="status-value" value={true} />
            </div>

            <div className="status-inactive">
              <label>Neaktivan</label>
              <input type="radio" name="status-value" value={false} />
            </div>
          </div>
        </div>

        <div className="wrapper">
          <button
            type="button"
            className="save-changes"
            onClick={handleSaveChanges}
          >
            Snimi promjene
          </button>
        </div>
      </div>
    </section>
  );
};
