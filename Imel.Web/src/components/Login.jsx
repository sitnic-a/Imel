import { useState } from "react";
import { FormFields } from "./FormFields";

export const Login = () => {
  let [errors, setErrors] = useState([]);

  return (
    <section id="login">
      <h1>Sign In</h1>
      <h3>
        Kako biste koristili aplikaciju neophodno je unijeti email i password!
      </h3>
      <div className="login-container">
        <form className="login-form" onSubmit={() => {}}>
          <FormFields errors={errors} />

          <div className="wrapper login-actions">
            <button type="submit" className="login-submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
