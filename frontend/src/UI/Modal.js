import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
   
  return (
      <>
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
      <button onClick={props.onClose}>Close</button>
    </div>
    
    </>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    const {onClose} = props;
   
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
