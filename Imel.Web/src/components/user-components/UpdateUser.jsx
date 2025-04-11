export const UpdateUser = () => {
  let statuses = document.querySelectorAll("input[name='status-value'");
  let statusValue = null;

  let handleStatusChange = () => {
    statuses.forEach((s) => {
      s.addEventListener("change", (e) => {
        if (statusValue === null) {
          statusValue = document.querySelector(
            'input[name="status-value"]:checked'
          ).value;
        }
        statusValue = statusValue === "true";
      });
    });
  };

  return (
    <section id="existing-user">
      <header>
        <h1>Trenutno se nalazite u dijelu za uređivanje korisnika</h1>
        <p>
          Ukoliko želite da uredite korisnike potrebno je da unesete nove
          vrijednosti te snimite promjene. Promjene će biti odmah reflektovane u
          aplikaciji. Aplikacija trenutno omogućava uređivanje statusa te email
          adrese.
        </p>
      </header>

      <div className="content">
        <div className="wrapper update-email">
          <label>
            Trenutna email adresa: <span className="required-field">*</span>
          </label>
          <br />
          <input
            type="text"
            className="form-field email"
            placeholder="Unesite novu email adresu"
          />
        </div>

        <div className="wrapper update-status">
          <label>
            Trenutni status: <span className="required-field">*</span>
          </label>
          <br />
          <div className="status form-field">
            <label>Aktivan</label>
            <input
              type="radio"
              name="status-value"
              value={true}
              onChange={(e) => handleStatusChange()}
            />
            <label>Neaktivan</label>
            <input
              type="radio"
              name="status-value"
              value={false}
              onChange={(e) => handleStatusChange()}
            />
          </div>
        </div>

        <div className="wrapper">
          <button type="button" className="save-changes">
            Snimi promjene
          </button>
        </div>
      </div>
    </section>
  );
};
