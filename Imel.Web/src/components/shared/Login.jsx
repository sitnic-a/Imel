import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux-toolkit/features/authSlice";
import { verifyLoginCredentials } from "../../utils";
import { FormFields } from "./FormFields";
import { useNavigate } from "react-router-dom";
import { setErrors } from "../../redux-toolkit/features/userSlice";
import moment from "moment";

export const Login = () => {
  let dispatch = useDispatch();
  const timeToWait = 1000 * 60 * 2;
  let [availabilityTime, setAvailabilityTime] = useState(timeToWait);
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

          const second = 1000;
          sessionStorage.setItem("locked", true);
          var timer = setInterval(() => {
            sessionStorage.setItem("locked", true);

            setAvailabilityTime((current) => {
              current = current - second;
              console.log("Available time ", current);
              sessionStorage.setItem("timeToWait", current);
              return current;
            });
            if (availabilityTime <= 0) {
              setAvailabilityTime(timeToWait);
              return;
            }
          }, second);

          inputs.forEach((el) => {
            el.disabled = true;
          });
          submitBtn.disabled = true;

          setTimeout(function () {
            inputs.forEach((el) => {
              el.disabled = false;
            });
            submitBtn.disabled = false;
            clearInterval(timer);
            setAvailabilityTime(timeToWait);
            let tooManyAttempts = document.querySelector(".many-attempts");
            tooManyAttempts.style.display = "none";
            sessionStorage.removeItem("locked");
          }, availabilityTime);

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
            Previše pokušaja. Pokušajte za{" "}
            {moment(availabilityTime).format("mm:ss")} minute
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
