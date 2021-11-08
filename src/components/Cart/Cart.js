import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.cartItems.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		item.quantity = 1;
		cartCtx.addItem(item);
	};

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
	if (cartCtx.showCart === false) return null;

	return (
		<Modal onClick={cartCtx.onHideCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button onClick={cartCtx.onHideCart} className={classes['button--alt']}>
					Close
				</button>
				{hasItems && (
					<button onClick={cartCtx.onHideCart} className={classes.button}>
						Order
					</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
