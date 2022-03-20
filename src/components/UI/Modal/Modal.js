import React, { Fragment } from 'react';
import reactDom from 'react-dom';

import classes from './Modal.module.css';
import Box from '@mui/material/Box';

const Backdrop = (props) => (
	<Box onClick={props.onClick} className={classes.backdrop}></Box>
);
const ModalOverlay = (props) => (
	<Box className={classes.modal}>{props.children}</Box>
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
