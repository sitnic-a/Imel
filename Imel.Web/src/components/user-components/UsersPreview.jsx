import { usePDF } from "@react-pdf/renderer";
import { useDispatch, useSelector } from "react-redux";
import { openNewUserModal } from "../../redux-toolkit/features/modalSlice";
import { setPaginationParams } from "../../redux-toolkit/features/paginationSlice";
import { UserDataGridView } from "./UserDataGridView";
import { FilterUsers } from "./FilterUsers";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import PdfAssistant from "../lib/export-pdf/PdfAssistant";
import moment from "moment";
import { Loader } from "../shared/Loader";

export const UsersPreview = () => {
  let dispatch = useDispatch();
  let todaysDate = moment().format("MMMM DD, YYYY-hh:mm");
  let fileName = `Imel-Korisnici-${todaysDate}.pdf`;

  const [instance, updateInstance] = usePDF({ document: <PdfAssistant /> });

  let { usersCount, isLoading } = useSelector((store) => store.user);
  let { paginationParams } = useSelector((store) => store.pagination);
  let { isModalNewUserOpen } = useSelector((store) => store.modal);

  let query = {
    email: "",
    status: null,
  };

  return (
    <section id="users-preview">
      <header>
        <h1>Lista korisnika koji koriste aplikaciju</h1>
        <p>
          Na ovom dijelu aplikacije možete pregledati korisnike, mijenjati,
          dodavati ili brisati
        </p>
        <p>
          <i>
            U sklopu pregleda moguće je korisnike filtirati po njihovom statusu
            aktivnosti ili emailu
          </i>
          <br />
          <i className="error-field">
            Za slučaj da ne vidite kompletan sadržaj polja, koristite opciju
            "scroll"
          </i>
        </p>
        <a
          className="export-to-pdf-btn"
          href={instance.url}
          download={fileName}
        >
          Izvezi u PDF
        </a>
      </header>

      <div className="pagination">
        <div className="actions">
          {paginationParams.currentPage - 1 <= 0 || (
            <MdKeyboardArrowLeft
              className="pagination-arrow left"
              onClick={() => {
                let newPaginationParams = {
                  ...paginationParams,
                  currentPage: paginationParams.currentPage - 1,
                  previousPage: paginationParams.currentPage,
                  lastPage: parseInt(
                    usersCount / paginationParams.elementsPerPage
                  ),
                };
                // console.log("Query ", query, "New params", newPaginationParams);
                dispatch(setPaginationParams(newPaginationParams));
                // console.log("Query ", query, "Pagination", newPaginationParams);
              }}
            />
          )}
          {paginationParams.currentPage <= paginationParams.lastPage &&
            usersCount > 5 && (
              <MdKeyboardArrowRight
                className="pagination-arrow right"
                onClick={(e) => {
                  let newPaginationParams = {
                    ...paginationParams,
                    currentPage: paginationParams.currentPage + 1,
                    previousPage: paginationParams.currentPage,
                    lastPage: parseInt(
                      usersCount / paginationParams.elementsPerPage
                    ),
                  };
                  // console.log("Query ", query, "New params", newPaginationParams);
                  dispatch(setPaginationParams(newPaginationParams));
                  // console.log("Query ", query, "Pagination", newPaginationParams);
                }}
              />
            )}
        </div>
      </div>

      <FilterUsers />

      <div
        className="new-user"
        onClick={() => {
          dispatch(openNewUserModal(!isModalNewUserOpen));
        }}
      >
        <FaPlus className="new-user-icon" />
      </div>

      {isLoading && <Loader />}
      <UserDataGridView />
      <p className="indatabase error-field"></p>
    </section>
  );
};
