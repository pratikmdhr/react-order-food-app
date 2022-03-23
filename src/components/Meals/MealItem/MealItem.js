import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CartContext from '../../../store/cart-context';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const ImageContainer = styled(Grid)(({theme}) => ({
	position: 'relative',
	top: theme.spacing(2),
	width: '100%',
	borderRadius: theme.spacing(2),
	overflow: 'hidden',

	'& img': { width: '100%', height: '100%', objectFit: 'cover' },
}));

const MealItem = ({ id, name, description, price, imageUrl }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const cartCtx = useContext(CartContext);
	const addToCartHandler = (quantity) => {
		cartCtx.addItem({
			id,
			name,
			quantity,
			price,
		});
	};
	return (
		<Grid
			container
			flexWrap='nowrap'
			direction='row'
			py={{ xs: 7, sm: 9 }}
			px={{ xs: 2, sm: 6 }}
			borderBottom='1px solid #ccc'>
			<Grid item container direction='column' mr={4} xs={7} sm={9}>
				<Typography sx={{ fontWeight: 'bold' }} variant='h5' m={0} align='left'>
					{name}
				</Typography>
				<Typography variant='body1' sx={{ fontWeight: 'bold' }} py={2}>
					${price.toFixed(2)}
				</Typography>
				<Typography variant='body1' pb={4} color='#858585'>
					{description}
				</Typography>
				<MealItemForm id={id} onAddToCart={addToCartHandler} />
			</Grid>
			<ImageContainer
				item
				alignItems='center'
				xs={5}
				sm={3}
				sx={{ height: isMobile ? '8rem' : '10rem' }}>
				<img src={imageUrl} alt='' />
			</ImageContainer>
		</Grid>
	);
};

export default MealItem;
