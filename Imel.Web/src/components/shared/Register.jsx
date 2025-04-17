import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux-toolkit/features/authSlice";
import { verifyEnteredFields } from "../../utils";
import { FormFields } from "./FormFields";
import { setErrors } from "../../redux-toolkit/features/userSlice";
import { Loader } from "./Loader";

export const Register = () => {
  let dispatch = useDispatch();
  let { isRegistering } = useSelector((store) => store.auth);
  let { errors } = useSelector((store) => store.user);

  let handleSubmit = (e) => {
    let __USER_ROLE = 2;
    e.preventDefault();
    let form = new FormData(e.target);
    let formData = Object.fromEntries([...form.entries()]);
    let [errors, isValid] = verifyEnteredFields(formData);
    dispatch(setErrors(errors));
    if (isValid) {
      let request = {
        email: formData["email"],
        password: formData["password"],
        roles: [__USER_ROLE],
      };
      dispatch(register(request)).then((response) => {
        let statusCode = response.payload.statusCode;
        let inDatabaseErr = document.querySelector(".existing-user-error");
        if (statusCode === 201) {
          window.location.href = "/login";
          return;
        }
        if (statusCode === 400) {
          inDatabaseErr.style.display = "block";
        }
      });
      return;
    }
    return;
  };

  return isRegistering ? (
    <Loader />
  ) : (
    <section id="register">
      <h1>Dobrodošli na registracijski panel</h1>
      <h3>
        Sva vidljiva polja potrebno je popuniti za uspješnu registraciju!!
      </h3>
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <FormFields errors={errors} />

          <div className="wrapper register-actions">
            <button type="submit" className="submit">
              Snimi
            </button>
          </div>
        </form>
        <p className="existing-user-error error-field">
          Ovaj korisnik je već registrovan
        </p>
      </div>
    </section>
  );
};
