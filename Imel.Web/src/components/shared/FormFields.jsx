import { useDispatch, useSelector } from "react-redux";
import { Errors } from "./Errors";
import { setErrors } from "../../redux-toolkit/features/userSlice";
import { hideOnCondition } from "../../utils";

export const FormFields = () => {
  let dispatch = useDispatch();
  let { errors } = useSelector((store) => store.user);

  return (
    <>
      <div className="wrapper email">
        <label>
          Email: <span className="required-field">*</span>
        </label>
        <br />
        <input
          onFocus={() => {
            dispatch(setErrors([]));
            let credentialError = document.querySelector(".credentials-error");
            let tooManyAttempts = document.querySelector(".many-attempts");
            let inDatabaseErr = document.querySelector(".existing-user-error");

            hideOnCondition(credentialError);
            hideOnCondition(tooManyAttempts);
            hideOnCondition(inDatabaseErr);
          }}
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
          onFocus={() => {
            if (errors.length > 0) dispatch(setErrors([]));
          }}
          className="form-field"
          type="password"
          name="password"
          placeholder="Unesite Vaš password (minimalno 8 karaktera, slova, specijalni znakovi i brojevi)"
        />
      </div>

      <Errors errors={errors} />
    </>
  );
};
