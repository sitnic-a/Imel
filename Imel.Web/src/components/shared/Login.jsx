import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux-toolkit/features/authSlice";
import { verifyLoginCredentials } from "../../utils";
import { FormFields } from "./FormFields";
import { useNavigate } from "react-router-dom";
import { setErrors } from "../../redux-toolkit/features/userSlice";

export const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { errors } = useSelector((store) => store.user);

  // let [errors, setErrors] = useState([]);

  let handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let formData = Object.fromEntries([...form.entries()]);
    let [errors, isValid] = verifyLoginCredentials(formData);
    dispatch(setErrors(errors));
    if (isValid) {
      let request = {
        email: formData["email"],
        password: formData["password"],
      };
      dispatch(login(request)).then((data) => {
        let payload = data.payload;
        let credentialError = document.querySelector(".credentials-error");

        if (payload.statusCode === 200) {
          credentialError.style.display = "block";
          sessionStorage.setItem("token", payload.response.jwToken);
          navigate("/dashboard", {
            state: {
              loggedUser: payload.response,
            },
          });
        }
        if (payload.statusCode !== 200) {
          credentialError.style.display = "block";
        }
      });
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
          <p className="credentials-error error-field">
            Incorrect credentials, try again
          </p>

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
