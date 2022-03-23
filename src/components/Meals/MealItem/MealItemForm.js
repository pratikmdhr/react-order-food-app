import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Input from '../../UI/Input/Input';
import Button from '@mui/material/Button';

const InputQtyForm = styled('form')`
	display: flex;
	align-items: center;
`;

const MealItemForm = (props) => {
	const quantityInputRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();
		const enteredQuantity = +quantityInputRef.current.value;
		props.onAddToCart(enteredQuantity);
	};

	return (
		<InputQtyForm onSubmit={submitHandler}>
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
				sx={{ textTransform: 'none', borderRadius: '2rem', height: '2rem' }}
				variant='contained'
				type='submit'>
				+ Add
			</Button>
		</InputQtyForm>
	);
};

export default MealItemForm;
