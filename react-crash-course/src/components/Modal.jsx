import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

import classes from './Modal.module.css';

function Modal({ modalTitle, children, footer }) {
  const navigator = useNavigate();

  function closeModalHandler() {
    navigator('..');
  }

  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.modalWrap}>
        <dialog open className={classes.modal}>
          <div className={classes.modalHeader}>
            <h2 className={classes.title}>{modalTitle}</h2>
            <button type="button" className={classes.closeBtn} onClick={closeModalHandler}>
              <MdClose size={28} />
            </button>
          </div>
          <div className={classes.modalBody}>{children}</div>
          <div className={classes.modalFooter}>{footer}</div>
        </dialog>
      </div>
    </>
  );
}

export default Modal;
