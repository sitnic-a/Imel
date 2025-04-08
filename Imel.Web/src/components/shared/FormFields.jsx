import { Errors } from "./Errors";

export const FormFields = ({ errors }) => {
  return (
    <>
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
    </>
  );
};
