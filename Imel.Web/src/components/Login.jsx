import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux-toolkit/features/authSlice";
import { verifyLoginCredentials } from "../utils";
import { FormFields } from "./FormFields";

export const Login = () => {
  let dispatch = useDispatch();
  let [errors, setErrors] = useState([]);

  let handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let formData = Object.fromEntries([...form.entries()]);
    let [errors, isValid] = verifyLoginCredentials(formData);
    setErrors(errors);
    if (isValid) {
      let request = {
        email: formData["email"],
        password: formData["password"],
      };
      dispatch(login(request));
    }
    return;
  };

  return (
    <section id="login">
      <h1>Sign In</h1>
      <h3>
        Kako biste koristili aplikaciju neophodno je unijeti email i password!
      </h3>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <FormFields errors={errors} />

          <div className="wrapper login-actions">
            <button type="submit" className="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
