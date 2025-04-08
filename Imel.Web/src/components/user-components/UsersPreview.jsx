import { FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const UsersPreview = () => {
  return (
    <section id="users-preview">
      <header>
        <h1>Lista korisnika koji koriste aplikaciju</h1>
        <p>
          Na ovom dijelu aplikacije možete pregledati korisnike, mijenjati,
          dodavati ili brisati
        </p>
        <p>
          U sklopu pregleda moguće je korisnike filtirati po njihovom statusu
          aktivnosti ili emailu
        </p>
      </header>

      <div className="pagination">
        <div className="actions">
          <MdKeyboardArrowLeft className="pagination-arrow left" />
          <MdKeyboardArrowRight className="pagination-arrow right" />
        </div>
      </div>

      <div className="new-user">
        <FaPlus className="new-user-icon" />
      </div>

      <div className="user-list-main-container">
        <div className="cols">
          <div className="col col-email">
            <p>Email</p>
          </div>

          <div className="col col-status">
            <p>Status</p>
          </div>

          <div className="col col-actions"></div>
        </div>

        <div className="cols">{/* Map values from api here*/}</div>
      </div>
    </section>
  );
};
