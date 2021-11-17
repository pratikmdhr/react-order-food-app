import React from 'react';
import useInput from '../hooks/use-input';
import classes from './Checkout.module.css';

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

	// Add invalid classes to input fields if input is not valid
	const nameControlClasses = `${classes.control} ${
		nameInputIsInvalid ? classes.invalid : ''
	}`;
	const streetControlClasses = `${classes.control} ${
		streetInputIsInvalid ? classes.invalid : ''
	}`;
	const postalCodeControlClasses = `${classes.control} ${
		postalCodeInputIsInvalid ? classes.invalid : ''
	}`;
	const cityControlClasses = `${classes.control} ${
		cityInputIsInvalid ? classes.invalid : ''
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					onChange={inputNameChangeHandler}
					onBlur={inputNameBlurHandler}
					value={enteredName}
				/>
				{nameInputIsInvalid && <p>Please enter a valid name</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input
					type='text'
					id='street'
					onChange={inputStreetChangeHandler}
					onBlur={inputStreetBlurHandler}
					value={enteredStreet}
				/>
				{streetInputIsInvalid && <p>Please enter a valid street name</p>}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input
					type='text'
					id='postal'
					onChange={inputPostalCodeChangeHandler}
					onBlur={inputPostalCodeBlurHandler}
					value={enteredPostalCode}
				/>
				{postalCodeInputIsInvalid && (
					<p>Please enter a valid Postal Code (6 characters long)</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input
					type='text'
					id='city'
					onChange={inputCityChangeHandler}
					onBlur={inputCityBlurHandler}
					value={enteredCity}
				/>
				{cityInputIsInvalid && <p>Please enter a valid city name</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
