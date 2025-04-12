import { IoIosCheckmarkCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { openDeleteUserModal } from "../../redux-toolkit/features/modalSlice";
import { deleteById } from "../../redux-toolkit/features/userSlice";
import { closeConfirmModal } from "../../helpers/shared-helpers";

export const Confirmation = ({ id }) => {
  let dispatch = useDispatch();
  let { dbUser } = useSelector((store) => store.user);
  let { isModalDeleteUserOpen } = useSelector((store) => store.modal);

  return (
    <section id="confirmation" className="confirmation">
      <header>Sigurni ste?</header>
      <hr />
      <div className="actions">
        <div className="confirm">
          <span>
            <IoIosCheckmarkCircle
              className="confirmation-choice confirm-icon"
              onClick={() => {
                dispatch(deleteById([dbUser.id]));
              }}
            />
          </span>
        </div>
        <div className="reject">
          <span>
            <RxCrossCircled
              className="confirmation-choice reject-icon"
              onClick={(e) => {
                let rejectContainer = e.currentTarget.parentNode.parentNode;
                let confirmModal = rejectContainer.parentNode.parentNode;
                closeConfirmModal(confirmModal);
                dispatch(openDeleteUserModal(!isModalDeleteUserOpen));
              }}
            />
          </span>
        </div>
      </div>
    </section>
  );
};
