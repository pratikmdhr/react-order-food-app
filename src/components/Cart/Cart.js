import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
	const ctx = useContext(CartContext);
	const cartItems = (
		<ul className={classes['cart-items']}>
			{[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map((item) => (
				<li key='1'>{item.name}</li>
			))}
		</ul>
	);
	if (ctx.showCart === false) return null;

	return (
		<Modal onClick={ctx.onHideCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>35.50</span>
			</div>
			<div className={classes.actions}>
				<button onClick={ctx.onHideCart} className={classes['button--alt']}>
					Close
				</button>
				<button onClick={ctx.onHideCart} className={classes.button}>
					Order
				</button>
			</div>
		</Modal>
	);
};

export default Cart;
