import { createPortal } from 'react-dom';

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <dialog open className="modal">
      <div>{props.children}</div>
    </dialog>
  );
};

const portalElement = document.getElementById('modal');

const Modal = (props) => {
  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;