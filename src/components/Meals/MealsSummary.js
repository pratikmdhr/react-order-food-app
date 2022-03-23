import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';

const StyledSection = styled('section')(({ mobile, theme }) => ({
	position: 'relative',
	textAlign: 'center',
	maxWidth: '45rem',
	width: '90%',
	margin: 'auto',
	marginTop: theme.spacing(-40),
	padding: theme.spacing(mobile === 'true' ? 6 : 10),
	backgroundColor: '#f5f5f5',
	color: 'black',
	borderRadius: theme.spacing(3.5),
}));

const MealsSummary = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<StyledSection mobile={isMobile.toString()}>
			<Typography fontSize={{ xs: '1.5rem', sm: '1.875rem' }} fontWeight='bold'>
				Delicious Meals! Fast and free delivery!!
			</Typography>
			<Typography fontSize='1.1rem' py={{ xs: 2, sm: 4 }} variant='body1'>
				Too lazy to cook? We are just one click away!!
			</Typography>
			<Typography fontSize='1.1rem' variant='body1'>
				Choose from our broad selection of meals prepared with high-quality
				ingredients and enjoy a delicious lunch or dinner at home.
			</Typography>
		</StyledSection>
	);
};

export default MealsSummary;
