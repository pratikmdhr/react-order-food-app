import React, { Fragment, useContext } from 'react';
import CartContext from '../../context/cart-context';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
	const ctx = useContext(CartContext);

	return (
		<Fragment>
			<header className={classes.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={ctx.onShowCart} />
			</header>
			<div className={classes['main-image']}>
				<img src={mealsImage} alt='Delicious food' />
			</div>
		</Fragment>
	);
};

export default Header;
