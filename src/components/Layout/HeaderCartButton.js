import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		fontSize: '0.9rem',
		fontWeight: 600,
		padding: theme.spacing(2.5, 1.5),
	},
}));

const CartIconButton = styled(IconButton)(
	({ bump }) =>
		bump === 'true' && {
			animation: 'bump 300ms ease-out',

			'@keyframes bump': {
				'0%': {
					transform: 'scale(1)',
				},
				'10%': {
					transform: 'scale(0.9)',
				},
				'30%': {
					transform: 'scale(1.1)',
				},
				' 50%': {
					transform: 'scale(1.15)',
				},
				'100%': {
					transform: 'scale(1)',
				},
			},
		}
);

const HeaderCartButton = () => {
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

	return (
		<CartIconButton
			color='secondary'
			bump={bumpAnimation.toString()}
			onClick={cartCtx.onShowCart}
			aria-label='add to shopping cart'>
			<StyledBadge badgeContent={numberOfCartItems} color='info'>
				<ShoppingCartIcon sx={{ fontSize: 28 }} />
			</StyledBadge>
		</CartIconButton>
	);
};

export default HeaderCartButton;
