import React, { useState, useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedItems = state.items.concat(action.item);
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.quantity;
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const [showCart, setShowCart] = useState(false);

	const showCartHandler = () => {
		setShowCart(true);
	};
	const hideCartHandler = () => {
		setShowCart(false);
	};
	const menu = [
		{
			id: 'm1',
			name: 'Sushi',
			description: 'Finest fish and veggies',
			price: 22.99,
		},
		{
			id: 'm2',
			name: 'Schnitzel',
			description: 'A german specialty!',
			price: 16.5,
		},
		{
			id: 'm3',
			name: 'Barbecue Burger',
			description: 'American, raw, meaty',
			price: 12.99,
		},
		{
			id: 'm4',
			name: 'Green Bowl',
			description: 'Healthy...and green...',
			price: 18.99,
		},
	];

	const addItemToCartHandler = (item) => {
		console.log(item);
		dispatchCartAction({ type: 'ADD', item: item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};

	const cartContext = {
		showCart: showCart,
		onShowCart: showCartHandler,
		onHideCart: hideCartHandler,
		menuItems: menu,

		cartItems: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
