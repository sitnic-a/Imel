import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux-toolkit/features/authSlice";
import { verifyLoginCredentials } from "../../utils";
import { FormFields } from "./FormFields";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
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
      dispatch(login(request)).then((data) => {
        let payload = data.payload;
        if (payload.statusCode === 200) {
          document.querySelector(".credentials-error").style.display = "block";
          sessionStorage.setItem("token", payload.response.jwToken);
          navigate("/dashboard", {
            state: {
              loggedUser: payload.response,
            },
          });
        }
        if (payload.statusCode !== 200) {
          document.querySelector(".credentials-error").style.display = "block";
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
