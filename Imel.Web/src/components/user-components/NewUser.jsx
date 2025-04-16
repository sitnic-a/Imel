import { useDispatch, useSelector } from "react-redux";
import { addNewUser, setErrors } from "../../redux-toolkit/features/userSlice";
import {
  openNewUserModal,
  setIsLoading,
} from "../../redux-toolkit/features/modalSlice";
import { verifyEnteredFields } from "../../utils";
import { Errors } from "../shared/Errors";

export const NewUser = () => {
  let dispatch = useDispatch();
  let { errors } = useSelector((store) => store.user);
  let { isModalNewUserOpen, isLoading } = useSelector((store) => store.modal);

  let handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let formData = Object.fromEntries([...form.entries()]);
    console.log("Form data ", formData);

    let [errors, isValid] = verifyEnteredFields(formData);
    dispatch(setErrors(errors));
    if (isValid) {
      dispatch(setIsLoading(!isLoading));
      //Call service to add new user
      // Hardcoded value for password since user will have a possibility to change it's password
      // One more reason to hard code is an add action that makes no sence to be in this panel
      let request = {
        email: formData["email"],
        password: "password123!",
        roles: [2],
      };
      dispatch(addNewUser(request)).then((data) => {
        let payload = data.payload.response;
        console.log("Payload ", data.payload);

        if (data.payload.statusCode === 400) {
          document.querySelector(".indatabase").innerHTML =
            "Ovaj korisnik je već registrovan!";
          return;
        }

        if (data.payload.statusCode === 201) {
          document.querySelector(".indatabase").innerHTML = "";
        }

        console.log("payload ", payload);
        if (payload.dataCount % 5 === 1) window.location.reload();
      });
      dispatch(openNewUserModal(!isModalNewUserOpen));
      dispatch(setIsLoading(!isLoading));
    }
  };

  return (
    <section id="new-user">
      <header>
        <h1>
          New user
          <span
            className="close"
            onClick={() => dispatch(openNewUserModal(!isModalNewUserOpen))}
          >
            X
          </span>
        </h1>
      </header>
      <div className="content">
        <form className="new-user-form" onSubmit={handleSubmit}>
          <div className="wrapper email">
            <label>
              Email: <span className="required-field">*</span>
            </label>
            <br />
            <input
              onFocus={() => dispatch(setErrors([]))}
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
