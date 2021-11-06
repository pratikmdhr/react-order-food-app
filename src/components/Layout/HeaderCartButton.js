import React from 'react';
// import CartContext from '../../context/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	// const ctx = useContext(CartContext);
	return (
		<button onClick={props.onClick} className={classes.button}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>3</span>
		</button>
	);
};

export default HeaderCartButton;
