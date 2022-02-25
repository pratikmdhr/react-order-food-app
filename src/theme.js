import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	spacing: 4,
	palette: {
		primary: {
			main: '#1565c0',
		},
		secondary: {
			main: '#455a64',
		},
		background: {
			default: '#fafafa',
		},
	},
	typography: {
		fontFamily: 'Lato',
		fontSize: 14,
	},
});

export default theme;
