import { useState } from "react";
import { addNewUser } from "../../redux-toolkit/features/userSlice";
import { verifyEnteredFields } from "../../utils";
import { Errors } from "../shared/Errors";
import { useDispatch, useSelector } from "react-redux";
import { openNewUserModal } from "../../redux-toolkit/features/modalSlice";

export const NewUser = () => {
  let dispatch = useDispatch();
  let { isModalNewUserOpen } = useSelector((store) => store.modal);
  let [errors, setErrors] = useState([]);

  let handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let formData = Object.fromEntries([...form.entries()]);
    console.log("Form data ", formData);

    let [errors, isValid] = verifyEnteredFields(formData);
    console.log("Errors ", errors);
    setErrors(errors);
    if (isValid) {
      //Call service to add new user
      // Hardcoded value for password since user will have a possibility to change it's password
      // One more reason to hard code is an add action that makes no sence to be in this panel
      let request = {
        email: formData["email"],
        password: "password123!",
        roles: [2],
      };
      dispatch(addNewUser(request));
      dispatch(openNewUserModal(!isModalNewUserOpen));
    }
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
