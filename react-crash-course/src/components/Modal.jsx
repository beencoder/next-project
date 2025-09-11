import { useNavigate } from 'react-router-dom';

import classes from './Modal.module.css';

function Modal({ children }) {
  const navigator = useNavigate();

  function closeModalHandler() {
    navigator('..');
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeModalHandler}></div>
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
