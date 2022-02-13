import React from 'react';
import useInput from '../hooks/use-input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const isNotEmpty = (value) => value.trim() !== '';
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
	const {
		enteredData: enteredName,
		enteredDataIsValid: enteredNameIsValid,
		hasError: nameInputIsInvalid,
		inputChangeHandler: inputNameChangeHandler,
		inputBlurHandler: inputNameBlurHandler,
		inputTouched: nameInputTouched,
		reset: resetName,
	} = useInput(isNotEmpty);

	const {
		enteredData: enteredStreet,
		enteredDataIsValid: enteredStreetIsValid,
		hasError: streetInputIsInvalid,
		inputChangeHandler: inputStreetChangeHandler,
		inputBlurHandler: inputStreetBlurHandler,
		inputTouched: streetInputTouched,
		reset: resetStreet,
	} = useInput(isNotEmpty);

	const {
		enteredData: enteredPostalCode,
		enteredDataIsValid: enteredPostalCodeIsValid,
		hasError: postalCodeInputIsInvalid,
		inputChangeHandler: inputPostalCodeChangeHandler,
		inputBlurHandler: inputPostalCodeBlurHandler,
		inputTouched: postalCodeInputTouched,
		reset: resetPostalCode,
	} = useInput(isSixChars);

	const {
		enteredData: enteredCity,
		enteredDataIsValid: enteredCityIsValid,
		hasError: cityInputIsInvalid,
		inputChangeHandler: inputCityChangeHandler,
		inputBlurHandler: inputCityBlurHandler,
		inputTouched: cityInputTouched,
		reset: resetCity,
	} = useInput(isNotEmpty);

	let formIsValid = false;

	if (
		enteredNameIsValid &&
		enteredStreetIsValid &&
		enteredPostalCodeIsValid &&
		enteredCityIsValid
	) {
		formIsValid = true;
	}

	const confirmHandler = (e) => {
		e.preventDefault();

		// shows error if user submits it directly without touching the input field
		nameInputTouched();
		streetInputTouched();
		postalCodeInputTouched();
		cityInputTouched();

		if (!formIsValid) {
			return;
		}

		// Send user data to Cart
		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postalCode: enteredPostalCode,
		});
		console.log('form has been submitted');

		resetName();
		resetStreet();
		resetPostalCode();
		resetCity();
	};

	return (
		<Stack component='form' onSubmit={confirmHandler}>
			<TextField
				sx={{
					'& .MuiOutlinedInput-root': {
						width: '60%',
						'& fieldset': {
							borderColor: `${nameInputIsInvalid ? 'red' : 'primary'}`,
						},
					},
				}}
				size='small'
				id='name'
				label='Name'
				variant='outlined'
				helperText={nameInputIsInvalid ? 'Please enter a valid name' : ' '}
				onChange={inputNameChangeHandler}
				onBlur={inputNameBlurHandler}
				value={enteredName}
				margin='dense'
			/>
			<TextField
				sx={{
					'& .MuiOutlinedInput-root': {
						width: '60%',
						'& fieldset': {
							borderColor: `${streetInputIsInvalid ? 'red' : 'primary'}`,
						},
					},
				}}
				size='small'
				id='street'
				label='Street'
				variant='outlined'
				helperText={
					streetInputIsInvalid ? 'Please enter a valid street name' : ' '
				}
				onChange={inputStreetChangeHandler}
				onBlur={inputStreetBlurHandler}
				value={enteredStreet}
				margin='dense'
			/>
			<TextField
				sx={{
					'& .MuiOutlinedInput-root': {
						width: '60%',
						'& fieldset': {
							borderColor: `${postalCodeInputIsInvalid ? 'red' : 'primary'}`,
						},
					},
				}}
				size='small'
				id='postal'
				label='Postal Code'
				variant='outlined'
				helperText={
					postalCodeInputIsInvalid
						? 'Please enter a valid Postal Code (6 characters long)'
						: ' '
				}
				onChange={inputPostalCodeChangeHandler}
				onBlur={inputPostalCodeBlurHandler}
				value={enteredPostalCode}
				margin='dense'
			/>
			<TextField
				sx={{
					'& .MuiOutlinedInput-root': {
						width: '60%',
						'& fieldset': {
							borderColor: `${cityInputIsInvalid ? 'red' : 'primary'}`,
						},
					},
				}}
				size='small'
				id='city'
				label='City'
				variant='outlined'
				helperText={cityInputIsInvalid ? 'Please enter a valid city name' : ' '}
				onChange={inputCityChangeHandler}
				onBlur={inputCityBlurHandler}
				value={enteredCity}
				margin='dense'
			/>
			<Stack sx={{ justifyContent: 'flex-end' }} direction='row' spacing={2}>
				<Button
					sx={{ textTransform: 'none', borderRadius: '2rem' }}
					variant='outlined'
					onClick={props.onCancel}>
					Back
				</Button>
				<Button
					sx={{ textTransform: 'none', borderRadius: '2rem' }}
					variant='contained'
					type='submit'>
					Confirm
				</Button>
			</Stack>
		</Stack>
	);
};

export default Checkout;
