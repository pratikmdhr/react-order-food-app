import React, { useContext } from 'react';
import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import CartContext from '../../store/cart-context';

const AvailableMeals = () => {
	const mealsCtx = useContext(CartContext);

	const mealsList = mealsCtx.menuItems.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}>
			{meal.name}
		</MealItem>
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
