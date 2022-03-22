import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const MealItem = ({ id, name, description, price, imageUrl }) => {
	const cartCtx = useContext(CartContext);
	const addToCartHandler = (quantity) => {
		cartCtx.addItem({
			id,
			name,
			quantity,
			price,
		});
	};
	return (
		<Grid
			container
			flexWrap='nowrap'
			direction='row'
			py={6}
			px={{ xs: 3, sm: 6 }}
			className={classes.meal}>
			<Grid className={classes.mealContent} item container direction='column' xs={7} sm={9}>
				<h3>{name}</h3>
				<Box className={classes.price}>${price.toFixed(2)}</Box>
				<Box className={classes.description}>{description}</Box>
				<MealItemForm id={id} onAddToCart={addToCartHandler} />
			</Grid>
			<Grid item alignItems='center' className={classes.image} xs={5} sm={3}>
				<img src={imageUrl} alt='' />
			</Grid>
		</Grid>
	);
};

export default MealItem;
