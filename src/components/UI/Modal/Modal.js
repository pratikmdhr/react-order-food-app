import React, { Fragment } from 'react';
import reactDom from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => (
	<div onClick={props.onClick} className={classes.backdrop}></div>
);
const ModalOverlay = (props) => (
	<div className={classes.modal}>{props.children}</div>
);

const portalBackdropEl = document.querySelector('#root-backdrop');
const portalOverlayEl = document.querySelector('#root-overlay');

const Modal = (props) => {
	return (
		<Fragment>
			{reactDom.createPortal(
				<Backdrop onClick={props.onClick} />,
				portalBackdropEl
			)}
			{reactDom.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalOverlayEl
			)}
		</Fragment>
	);
};

export default Modal;
