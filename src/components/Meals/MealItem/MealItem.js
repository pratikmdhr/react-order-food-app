import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = ({ id, name, description, price }) => {
	const cartCtx = useContext(CartContext);
	const addToCartHandler = (quantity) => {
		// console.log(id, name, quantity, price);
		cartCtx.addItem({
			id,
			name,
			quantity,
			price,
		});
	};
	return (
		<li className={classes.meal}>
			<div>
				<h3>{name}</h3>
				<div className={classes.description}>{description}</div>
				<div className={classes.price}>${price.toFixed(2)}</div>
			</div>
			<div>
				<MealItemForm id={id} onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default MealItem;
