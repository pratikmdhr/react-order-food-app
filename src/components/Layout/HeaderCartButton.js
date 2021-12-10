import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);
	const [bumpAnimation, setBumpAnimation] = useState(true);

	// Add quantity of all the items in the cart and gets total quantity
	const numberOfCartItems = cartCtx.cartItems.reduce(
		(curNumber, item) => curNumber + item.displayQuantity,
		0
	);

	const { showCart } = cartCtx;
	// Displays the bump animation for the cart everytime an item is added to the cart
	useEffect(() => {
    
		// to disable bump animation if the cart modal is shown
		if (showCart) return;

		setBumpAnimation(true);
		const timer = setTimeout(() => {
			setBumpAnimation(false);
		}, 300);

		return () => clearTimeout(timer);
	}, [numberOfCartItems, showCart]);

	const btnClasses = `${classes.button} ${bumpAnimation && classes.bump}`;

	return (
		<button onClick={cartCtx.onShowCart} className={btnClasses}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
