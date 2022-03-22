import React, { Fragment } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeaderCartButton from './HeaderCartButton';
import Box from '@mui/material/Box';
import StorefrontIcon from '@mui/icons-material/Storefront';
import mealsImage from '../../assets/meals.jpg';

const Hero = styled(Box)(() => ({
	width: '100%',
	height: '25rem',
	zIndex: 0,
	overflow: 'hidden',
	'& img': {
		width: '110%',
		height: '100%',
		objectFit: 'cover',
		transform: 'rotateZ(-5deg) translateY(-4rem) translateX(-1rem)',
	},
}));

const Header = () => {
	const theme = useTheme();
	return (
		<Fragment>
			<AppBar
				position='fixed'
				color='primary'
				sx={{ padding: theme.spacing(0, 4) }}>
				<Toolbar>
					<StorefrontIcon sx={{ fontSize: 24 }} />
					<Typography
						variant='h5'
						component='div'
						sx={{ flexGrow: 1, paddingLeft: theme.spacing(4) }}>
						Delicious Meals
					</Typography>
					<HeaderCartButton />
				</Toolbar>
			</AppBar>
			<Hero>
				<img src={mealsImage} alt='Delicious food' />
			</Hero>
		</Fragment>
	);
};

export default Header;
