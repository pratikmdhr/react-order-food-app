import React, { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import { styled } from '@mui/material';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const CartItemsContainer = styled(Grid)({
	overflowY: 'auto',
	maxHeight: "calc(100vh - 25rem)"
});

const StyledButton = styled(Button)({
	textTransform: 'none',
	borderRadius: '2rem',
});

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.cartItems.length > 0;

	// Return early so that cart stays hidden until the cart button is pressed
	if (cartCtx.showCart === false) return null;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		item.quantity = 1;
		cartCtx.addItem(item);
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const cancelOrderHandler = () => {
		setIsCheckout(false);
	};

	// Submit data to backend server
	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			`https://food-order-app-4fc86-default-rtdb.firebaseio.com/order.json`,
			{
				method: 'POST',
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.cartItems,
				}),
			}
		);

		setIsSubmitting(false);
		setDidSubmit(true);
	};

	//  Reset cart items, hide the success message, and show the original cart modal
	const clearCartHandler = () => {
		setDidSubmit(false);
		setIsCheckout(false);
		cartCtx.clearCart();
		cartCtx.onHideCart();
	};

	// Cart contents read from cartCtx
	const cartItems = (
		<CartItemsContainer>
			{cartCtx.cartItems.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					quantity={item.displayQuantity}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</CartItemsContainer>
	);

	// Buttons for the original modal content
	const modalActions = (
		<Stack sx={{ justifyContent: 'flex-end' }} direction='row' spacing={4}>
			<StyledButton variant='outlined' onClick={cartCtx.onHideCart}>
				Close
			</StyledButton>
			{hasItems && (
				<StyledButton variant='contained' onClick={orderHandler}>
					Order
				</StyledButton>
			)}
		</Stack>
	);

	// Original Modal Content
	const cartModalContent = (
		<Fragment>
			{!isCheckout && cartItems}
			<Grid container justifyContent='space-between' alignItems='center' my={4}>
				<Typography fontSize='1.5rem' fontWeight='bold'>
					Total Amount
				</Typography>
				<Typography fontSize='1.5rem' fontWeight='bold'>
					{totalAmount}
				</Typography>
			</Grid>
			{isCheckout && (
				<Checkout
					onConfirm={submitOrderHandler}
					onCancel={cancelOrderHandler}
				/>
			)}
			{!isCheckout && modalActions}
		</Fragment>
	);

	// Model Content while the data is being transmitted
	const isSubmittingModalContent = (
		<Typography variant='body1'>Sending order data...</Typography>
	);

	// Model Content after successfully transmitting data
	const didSubmitModalContent = (
		<Box textAlign='center'>
			<Typography pb={5} variant='h5'>
				Successfully sent the order!
			</Typography>
			<Box>
				<StyledButton variant='outlined' onClick={clearCartHandler}>
					Close
				</StyledButton>
			</Box>
		</Box>
	);

	return (
		<Modal onClick={cartCtx.onHideCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
