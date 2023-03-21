import classes from './Modal.module.css';
import {Fragment} from "react";
import ReactDOM from "react-dom";

const Backdrop = props => {
    return <div onClick={props.onClick} className={classes.backdrop}></div>
}

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    );
}

const Modal = props => {
    return (
        <Fragment>
            {
                ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, document.getElementById('backdrop'))
            }
            {
                ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
                    document.getElementById('modal-overlay'))
            }
        </Fragment>
    );
}

export default Modal;
