import React from 'react';
import classes from './Input.module.css';
import Box from '@mui/material/Box';

const Input = React.forwardRef((props, ref) => {
	return (
		<Box className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</Box>
	);
});

export default Input;
