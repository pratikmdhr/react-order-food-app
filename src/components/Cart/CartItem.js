import React from 'react';
import classes from './CartItem.module.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Box from '@mui/material/Box';

const CartItem = (props) => {
	const price = `$${props.price.toFixed(2)}`;
  
	return (
		<li className={classes['cart-item']}>
			<Box>
				<h2>{props.name}</h2>
				<Box className={classes.summary}>
					<span className={classes.price}>{price}</span>
					<span className={classes.quantity}>x {props.quantity}</span>
				</Box>
			</Box>
			<Stack sx={{ justifyContent: 'flex-end' }} direction='row' spacing={2}>
				<Button
					onClick={props.onRemove}
					sx={{
						padding: '0',
						borderRadius: '0.5rem',
						minWidth: '3rem',
						height: '2.2rem',
					}}
					variant='outlined'>
					<RemoveRoundedIcon />
				</Button>
				<Button
					onClick={props.onAdd}
					sx={{
						padding: '0',
						borderRadius: '0.5rem',
						minWidth: '3rem',
						height: '2.2rem',
					}}
					variant='outlined'>
					<AddRoundedIcon />
				</Button>
			</Stack>
		</li>
	);
};

export default CartItem;
