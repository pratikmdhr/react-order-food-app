import { useReducer } from 'react';

const initialInputState = {
	enteredData: '',
	isTouched: false,
};

const inputStateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return {
			enteredData: action.value,
			isTouched: state.isTouched,
		};
	}
	if (action.type === 'BLUR') {
		return {
			enteredData: state.enteredData,
			isTouched: true,
		};
	}
	if (action.type === 'RESET') {
		return initialInputState;
	}

	return {
		enteredData: '',
		isTouched: false,
	};
};

const useInput = (checkValidity) => {
	const [inputState, dispatch] = useReducer(
		inputStateReducer,
		initialInputState
	);

	const enteredDataIsValid = checkValidity(inputState.enteredData);

	const hasError = !enteredDataIsValid && inputState.isTouched;

	const inputChangeHandler = (e) => {
		dispatch({ type: 'INPUT', value: e.target.value });
	};

	const inputBlurHandler = (e) => {
		dispatch({ type: 'BLUR' });
	};

	const reset = () => {
		dispatch({ type: 'RESET' });
	};

	const inputTouched = () => {
		dispatch({ type: 'BLUR' });
	};

	// const dataInputClasses = hasError ? 'form-control invalid' : 'form-control';

	return {
		enteredData: inputState.enteredData,
		enteredDataIsValid,
		hasError,
		inputChangeHandler,
		inputBlurHandler,
		inputTouched,
		reset,
	};
};

export default useInput;
