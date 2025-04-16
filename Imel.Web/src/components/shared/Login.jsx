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
        let tooManyAttempts = document.querySelector(".many-attempts");

        if (payload.statusCode === 200) {
          sessionStorage.setItem("token", payload.response.jwToken);
          navigate("/dashboard", {
            state: {
              loggedUser: payload.response,
            },
          });
        }

        if (payload.statusCode === 429) {
          tooManyAttempts.style.display = "block";
          let inputs = document.querySelectorAll(".login-form input");
          let submitBtn = document.querySelector(".login-form .submit");
          console.log("Input to disable ", inputs);

          inputs.forEach((el) => {
            el.disabled = true;
          });
          submitBtn.disabled = true;
          setTimeout(function () {
            inputs.forEach((el) => {
              el.disabled = false;
            });
            submitBtn.disabled = false;
          }, 5000);
          return;
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
            Molimo provjerite Vaše login podatke(lozinka i password)
          </p>
          <p className="many-attempts error-field">
            Previše pokušaja. Pokušajte za kratko vrijeme ponovo!
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
