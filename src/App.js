import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartContext from './context/cart-context';

const App = () => {
	const [showCart, setShowCart] = useState(false);

	const showCartHandler = () => {
		setShowCart(true);
	};
	const hideCartHandler = () => {
		setShowCart(false);
	};

	return (
		<CartContext.Provider
			value={{
				showCart: showCart,
				onShowCart: showCartHandler,
				onHideCart: hideCartHandler,
			}}>
			{showCart && <Cart onHideCart={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartContext.Provider>
	);
};

export default App;
