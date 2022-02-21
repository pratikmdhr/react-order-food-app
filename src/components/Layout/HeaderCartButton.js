import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

	const btnClasses = `${bumpAnimation && classes.bump}`;

	return (
		<Button
			className={btnClasses}
			onClick={cartCtx.onShowCart}
			variant='contained'
			sx={{ textTransform: 'none', borderRadius: '2rem' }}
			startIcon={
				<Badge badgeContent={numberOfCartItems} color='success'>
					<ShoppingCartIcon />
				</Badge>
			}>
			Cart
		</Button>
	);
};

export default HeaderCartButton;
