import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	spacing: 4,
	palette: {
		primary: {
			main: '#aa2e25',
		},
		secondary: {
			main: '#fff',
		},
		info: {
			main: '#47824a',
		},
		background: {
			default: '#e0e0e0',
		},
	},
	typography: {
		fontFamily: "Lato, Roboto, sans-serif",
		fontSize: 14,
	},
});

export default theme;
