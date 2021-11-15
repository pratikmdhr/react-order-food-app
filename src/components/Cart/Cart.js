import React, { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './Cart.module.css';

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
		<ul className={classes['cart-items']}>
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
		</ul>
	);

  // Buttons for the original modal content
	const modalActions = (
		<div className={classes.actions}>
			<button onClick={cartCtx.onHideCart} className={classes['button--alt']}>
				Close
			</button>
			{hasItems && (
				<button onClick={orderHandler} className={classes.button}>
					Order
				</button>
			)}
		</div>
	);

  // Original Modal Content
	const cartModalContent = (
		<Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
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
	const isSubmittingModalContent = <p>Sending order data...</p>;

  // Model Content after successfully transmitting data
	const didSubmitModalContent = (
		<Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button onClick={clearCartHandler} className={classes.button}>
					Close
				</button>
			</div>
		</Fragment>
	);

	return (
		<Modal onClick={clearCartHandler}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
