import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
import Box from '@mui/material/Box';

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
			<Box>
				<h3>{name}</h3>
				<Box className={classes.description}>{description}</Box>
				<Box className={classes.price}>${price.toFixed(2)}</Box>
			</Box>
			<Box>
				<MealItemForm id={id} onAddToCart={addToCartHandler} />
			</Box>
		</li>
	);
};

export default MealItem;
