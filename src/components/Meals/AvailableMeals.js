import React, { useState, useContext } from 'react';
import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import CartContext from '../../store/cart-context';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const AvailableMeals = () => {
	const categories = ['Popular', 'Appetizers', 'Salads', 'Sandwiches'];

	const [mealCategory, setMealCategory] = useState(categories[0]);

	const mealsCtx = useContext(CartContext);
	if (mealsCtx.isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading...</p>;
			</section>
		);
	}

	if (mealsCtx.httpErrorMsg) {
		return (
			<section className={classes.MealsError}>
				<p>{mealsCtx.httpErrorMsg}</p>
			</section>
		);
	}

	const getFilteredMealsList = (meals) => {
		return meals.filter((meal) => {
			if (mealCategory === categories[0]) {
				return meal.isPopular === true;
			}
			return meal.category === mealCategory;
		});
	};

	const MealsList = () => {
		const filteredMealsList = getFilteredMealsList(mealsCtx.menuItems);
		return filteredMealsList.map((meal) => (
			<MealItem
				key={meal.id}
				id={meal.id}
				name={meal.name}
				description={meal.description}
				price={meal.price}
				imageUrl={meal.imageUrl}>
				{meal.name}
			</MealItem>
		));
	};

	return (
		<section className={classes.meals}>
			<Card>
				<Grid container justifyContent='center' gap={{ xs: 0, sm: 4 }} pt={5}>
					{categories.map((category) => (
						<Button
							key={category}
							onClick={() => {
								setMealCategory(category);
							}}
							sx={{
								borderRadius: 0,
								color: 'black',
								height: '30px',
								borderBottom: `${
									mealCategory === category ? '1px solid #aa2e25' : ''
								}`,
							}}>
							{category}
						</Button>
					))}
				</Grid>
				<MealsList />
			</Card>
		</section>
	);
};

export default AvailableMeals;
