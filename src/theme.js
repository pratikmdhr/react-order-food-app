import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	spacing: 4,
	palette: {
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
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
