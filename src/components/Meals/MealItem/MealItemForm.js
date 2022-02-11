import React, { useState, useRef } from 'react';
import Input from '../../UI/Input/Input';
import classes from './MealItemForm.module.css';
import Button from '@mui/material/Button';

const MealItemForm = (props) => {
	const [quantityIsValid, SetQuantityIsValid] = useState(true);

	const quantityInputRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();
		const enteredQuantity = quantityInputRef.current.value;
		const enteredQuantityNumber = +enteredQuantity;
		if (
			enteredQuantity.trim().length === 0 ||
			enteredQuantityNumber < 1 ||
			enteredQuantityNumber > 5
		) {
			SetQuantityIsValid(false);
			return;
		}
		props.onAddToCart(enteredQuantityNumber);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={quantityInputRef}
				label='Quantity'
				input={{
					id: 'quantity_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<Button
				sx={{ textTransform: 'none', borderRadius: '2rem' }}
				variant='contained'
				type='submit'>
				+ Add
			</Button>
			{!quantityIsValid && <p>Please enter a valid number (1-5)</p>}
		</form>
	);
};

export default MealItemForm;
