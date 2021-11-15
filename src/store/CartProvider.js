import React, { useState, useReducer, useEffect } from 'react';
import CartContext from './cart-context';

const initializeCartState = {
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
	// Set default cart state equal to data stored in Local storage (if no data, initialize cart state )
	const storedCartState = JSON.parse(localStorage.getItem('cart-item'));
	const defaultCartState = storedCartState
		? storedCartState
		: initializeCartState;

	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	// Store cart data to local storage
	useEffect(
		() => localStorage.setItem('cart-item', JSON.stringify(cartState)),
		[cartState]
	);

	const [showCart, setShowCart] = useState(false);

	const showCartHandler = () => {
		setShowCart(true);
	};
	const hideCartHandler = () => {
		setShowCart(false);
	};

	// const menu = [
	// 	{
	// 		id: 'm1',
	// 		name: 'Sushi',
	// 		description: 'Finest fish and veggies',
	// 		price: 22.99,
	// 	},
	// 	{
	// 		id: 'm2',
	// 		name: 'Schnitzel',
	// 		description: 'A german specialty!',
	// 		price: 16.5,
	// 	},
	// 	{
	// 		id: 'm3',
	// 		name: 'Barbecue Burger',
	// 		description: 'American, raw, meaty',
	// 		price: 12.99,
	// 	},
	// 	{
	// 		id: 'm4',
	// 		name: 'Green Bowl',
	// 		description: 'Healthy...and green...',
	// 		price: 18.99,
	// 	},
	// ];

	// Load menu from Firebase backend server
	const [isLoading, setIsLoading] = useState(false);
	const [httpErrorMsg, setHttpErrorMsg] = useState(false);
	const [menu, setMenu] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		const fetchMenu = async () => {
			const response = await fetch(
				`https://food-order-app-4fc86-default-rtdb.firebaseio.com/menu.jsson`
			);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const responseData = await response.json();
			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}
			setMenu(loadedMeals);
			setIsLoading(false);
		};

		fetchMenu().catch((error) => {
			setIsLoading(false);
			setHttpErrorMsg(error.message);
		});
	}, []);

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
		isLoading,
		httpErrorMsg,

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
