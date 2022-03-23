import React, { useState, useContext } from 'react';
import LoadingSpinner from '../../assets/loading.gif';
import { styled, useTheme } from '@mui/material/styles';
import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';
import CartContext from '../../store/cart-context';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const StyledSection = styled('section')(({ theme }) => ({
	maxWidth: '60rem',
	width: '90%',
	margin: theme.spacing(8, 'auto'),
	animation: 'meals-appear 1s ease-out forwards',

	'@keyframes meals-appear': {
		from: {
			opacity: 0,
			transform: 'translateY(3rem)',
		},

		to: {
			opacity: 1,
			transform: 'translateY(0)',
		},
	},
}));

const AvailableMeals = () => {
	const categories = ['Popular', 'Appetizers', 'Salads', 'Sandwiches'];
	const theme = useTheme();
	const [mealCategory, setMealCategory] = useState(categories[0]);

	const mealsCtx = useContext(CartContext);
	if (mealsCtx.isLoading) {
		return (
			<Box textAlign='center' pt={12}>
				<img src={LoadingSpinner} alt='loading' style={{ width: '6rem' }} />
			</Box>
		);
	}

	if (mealsCtx.httpErrorMsg) {
		return (
			<Box textAlign='center' pt={24}>
				<Typography variant='h5'>{mealsCtx.httpErrorMsg}</Typography>
			</Box>
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
		<StyledSection>
			<Card>
				<Grid
					container
					justifyContent='center'
					gap={{ xs: 0, sm: 4 }}
					pb={{ xs: 1, sm: 2 }}>
					{categories.map((category) => (
						<Button
							key={category}
							onClick={() => {
								setMealCategory(category);
							}}
							sx={{
								borderRadius: 0,
								color: 'black',
								height: '1.875rem',
								borderBottom: `${mealCategory === category ? '1px solid' : ''}`,
								borderColor: theme.palette.primary.main,
							}}>
							{category}
						</Button>
					))}
				</Grid>
				<MealsList />
			</Card>
		</StyledSection>
	);
};

export default AvailableMeals;
