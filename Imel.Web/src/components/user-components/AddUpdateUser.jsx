import { useState } from "react";
import { fetchLocationStateHook } from "../../custom/fetchLocationStateHook";
import { verifyEnteredFields } from "../../utils";
import { Errors } from "../shared/Errors";

export const AddUpdateUser = () => {
  let [errors, setErrors] = useState([]);
  let { id } = fetchLocationStateHook();

  if (id > 0) {
    return <NewUser />;
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let formData = Object.fromEntries([...form.entries()]);
    console.log("Form data ", formData);

    let [errors, isValid] = verifyEnteredFields(formData);
    console.log("Errors ", errors);

    setErrors(errors);
  };

  return (
    <section id="new-existing-user">
      <header>
        <h1>New user</h1>
      </header>
      <div className="content">
        <form className="new-user-form" onSubmit={handleSubmit}>
          <div className="wrapper email">
            <label>
              Email: <span className="required-field">*</span>
            </label>
            <br />
            <input
              className="form-field"
              type="text"
              name="email"
              placeholder="Unesite Vaš email (test@test.com)"
            />
          </div>

          <div className="wrapper save-button">
            <button type="submit" className="form-field">
              Snimi
            </button>
          </div>
          <Errors errors={errors} />
        </form>
      </div>
    </section>
  );
};
