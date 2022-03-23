import React from 'react';
import { styled, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const StyledButton = styled(Button)(({ theme }) => ({
	padding: 0,
	minWidth: '3rem',
	height: '2.2rem',
	borderRadius: theme.spacing(2),
}));

const QuanityDisplay = styled('span')(({ theme }) => ({
	padding: theme.spacing(0.5, 2),
	border: '1px solid #ccc',
	fontSize: '0.9rem',
	borderRadius: theme.spacing(1.5),
}));

const CartItem = (props) => {
	const theme = useTheme();
	const price = `$${props.price.toFixed(2)}`;

	return (
		<Grid
			container
			justifyContent='space-between'
			alignItems='center'
			py={3}
			my={3}
			borderBottom={`1px dotted ${theme.palette.primary.main}`}>
			<Box>
				<Typography fontSize='1.2rem' my={2}>
					{props.name}
				</Typography>
				<Grid
					container
					justifyContent='space-between'
					alignItems='center'
					width='10rem'
          px={3}>
					<Typography fontWeight='bold' color={theme.palette.primary.main}>
						{price}
					</Typography>
					<QuanityDisplay>x {props.quantity}</QuanityDisplay>
				</Grid>
			</Box>
			<Stack justifyContent='flex-end' direction='row' spacing={4}>
				<StyledButton onClick={props.onRemove} variant='outlined'>
					<RemoveRoundedIcon />
				</StyledButton>
				<StyledButton onClick={props.onAdd} variant='outlined'>
					<AddRoundedIcon />
				</StyledButton>
			</Stack>
		</Grid>
	);
};

export default CartItem;
