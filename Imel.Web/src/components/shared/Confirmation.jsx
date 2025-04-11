import { IoIosCheckmarkCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { openDeleteUserModal } from "../../redux-toolkit/features/modalSlice";
import { deleteById } from "../../redux-toolkit/features/userSlice";

export const Confirmation = ({ id }) => {
  let dispatch = useDispatch();

  return (
    <section id="confirmation" className="confirmation">
      <header>Sigurni ste?</header>
      <div className="actions">
        <div className="confirm">
          <span>
            <IoIosCheckmarkCircle
              className="confirmation-choice confirm-icon"
              onClick={() => {
                // dispatch(deleteById[]);
              }}
            />
          </span>
        </div>
        <div className="reject">
          <span>
            <RxCrossCircled
              className="confirmation-choice reject-icon"
              onClick={() => {}}
            />
          </span>
        </div>
      </div>
    </section>
  );
};
