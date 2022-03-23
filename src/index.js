import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import CartProvider from './store/CartProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CartProvider>
			<App />
		</CartProvider>
	</ThemeProvider>,
	document.getElementById('root')
);
