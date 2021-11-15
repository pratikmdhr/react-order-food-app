import React from 'react';

const CartContext = React.createContext({
	showCart: false,
	onShowCart: () => {},
	onHideCart: () => {},
	menuItems: [],
	isLoading: false,
	httpErrorMsg: null,

	cartItems: [],
	totalAmount: 0,
	addItem: (item) => {},
	removeItem: (id) => {},
});

export default CartContext;
