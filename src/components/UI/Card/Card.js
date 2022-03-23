import React from 'react';
import Paper from '@mui/material/Paper';

const Card = (props) => {
	return (
		<Paper
			sx={{
				borderRadius: '14px',
				padding: '2.25rem 1rem',
			}}
			elevation={12}>
			{props.children}
		</Paper>
	);
};

export default Card;
