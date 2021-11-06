import React from 'react';

const CartContext = React.createContext({
	showCart: false,
	onShowCart: () => {},
	onHideCart: () => {},
});

export default CartContext;
