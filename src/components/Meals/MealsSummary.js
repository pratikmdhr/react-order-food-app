import React from 'react';
import classes from './MealsSummary.module.css';

const MealsSummary = () => {
	return (
		<section className={classes.summary}>
			<h2>Delicious Meals! Fast and free delivery!!</h2>
			<p>Too lazy to cook? We are just one click away!!</p>
			<p>
				Choose from our broad selection of meals prepared with
				high-quality ingredients and enjoy a delicious lunch or dinner at home.
			</p>
		</section>
	);
};

export default MealsSummary;
