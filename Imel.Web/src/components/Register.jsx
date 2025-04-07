import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyEnteredFields } from "../utils";
import { Errors } from "./Errors";
import { register } from "../redux-toolkit/features/authSlice";

export const Register = () => {
  let dispatch = useDispatch();
  let [errors, setErrors] = useState([]);

  let handleSubmit = (e) => {
    let __USER_ROLE = 2;
    e.preventDefault();
    let form = new FormData(e.target);
    let formData = Object.fromEntries([...form.entries()]);
    let [errors, isValid] = verifyEnteredFields(formData);
    setErrors(errors);
    if (isValid) {
      let request = {
        email: formData["email"],
        password: formData["password"],
        roles: [__USER_ROLE],
      };
      dispatch(register(request)).then((response) => {
        if (response.payload.statusCode === 201) {
          alert("User successfully created");
          window.location.href = "/login";
          return;
        }
        console.error("Registration failed ");
      });
      return;
    }
    console.log("Rejected");
    return;
  };

  return (
    <section id="register">
      <h1>Dobrodošli na registracijski panel</h1>
      <h3>
        Sva vidljiva polja potrebno je popuniti za uspješnu registraciju!!
      </h3>
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
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

          <div className="wrapper password">
            <label>
              Password: <span className="required-field">*</span>
            </label>
            <br />
            <input
              className="form-field"
              type="password"
              name="password"
              placeholder="Unesite Vaš password (minimalno 8 karaktera, slova, specijalni znakovi i brojevi)"
            />
          </div>

          <Errors errors={errors} />

          <div className="wrapper register-actions">
            <button type="submit" className="register-submit">
              Snimi
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
