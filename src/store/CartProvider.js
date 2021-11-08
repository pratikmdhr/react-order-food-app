import React, { useState, useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const addedItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		let updatedItems;
		// Check if item already exist
		// If item exists, increase quanity, else, add item
		if (addedItemIndex === -1) {
			const updatedItem = {
				...action.item,
				displayQuantity: action.item.quantity,
			};
			updatedItems = state.items.concat(updatedItem);
		} else {
			updatedItems = [...state.items];
			updatedItems[addedItemIndex].displayQuantity += action.item.quantity;
		}
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.quantity;
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === 'REMOVE') {
		const addedItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		let updatedTotalAmount;
		let updatedItems = [...state.items];

		// Decrease quanity by one if quanity is >1
		// Remove the item if quantity =1
		if (updatedItems[addedItemIndex].displayQuantity > 1) {
			updatedItems[addedItemIndex].displayQuantity--;
			updatedTotalAmount =
				state.totalAmount - updatedItems[addedItemIndex].price;
		} else {
			updatedTotalAmount =
				state.totalAmount - updatedItems[addedItemIndex].price;
			updatedItems.splice(addedItemIndex, 1);
		}

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
