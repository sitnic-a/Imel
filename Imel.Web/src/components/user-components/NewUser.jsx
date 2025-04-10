import React from "react";

export const NewUser = () => {
  return (
    <section id="new-existing-user">
      <header>
        <h1>New user</h1>
      </header>
      <div className="content">
        <form className="new-user-form">
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

          <div className="wrapper save-button">
            <button type="button" className="form-field">
              Snimi
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
