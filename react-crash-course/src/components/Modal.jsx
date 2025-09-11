import classes from './Modal.module.css';

function Modal({ onCloseModal, children }) {
  return (
    <>
      <div className={classes.backdrop} onClick={onCloseModal}></div>
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
