import React, { Fragment } from 'react';
import reactDom from 'react-dom';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';

const BackdropContainer = styled(Box)({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100vh',
	zIndex: 20,
	backgroundColor: 'rgba(0, 0, 0, 0.75)',
});

const ModalContainer = styled(Box)(({ theme }) => ({
	position: 'fixed',
	top: '8rem',
	left: '50%',
	maxHeight: 'calc(100vh - 11rem)',
	transform: 'translateX(-50%)',
	backgroundColor: 'white',
	borderRadius: theme.spacing(3.5),
	boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
	zIndex: 30,
	animation: 'appear 300ms ease-out forwards',
	'@keyframes appear': {
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
		},
	},
}));

const Backdrop = (props) => (
	<BackdropContainer onClick={props.onClick}></BackdropContainer>
);
const ModalOverlay = (props) => (
	<ModalContainer
		width={{ xs: '90%', sm: '40rem' }}
		px={{ xs: 4, sm: 8 }}
		py={{ xs: 6, sm: 8 }}>
		{props.children}
	</ModalContainer>
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
