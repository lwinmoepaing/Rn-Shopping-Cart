import Cart from '../../models/cart-item'
import { ADD_TO_CART } from '../action/cart'

const initialState = {
	items: {},
	totalAmount: 0,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const addedProduct = action.product
			const prodPrice = addedProduct.price
			const prodTitle = addedProduct.title
			let updatedOrNewItem

			if (state.items[addedProduct.id]) {
				// If Existed Product in Cart
				updatedOrNewItem = new Cart(
					state.items[addedProduct.id].quantity,
					prodPrice,
					prodTitle,
					state.items[addedProduct.id].sum + prodPrice
				)
			} else {
				updatedOrNewItem = new Cart(1, prodPrice, prodTitle, prodPrice)
			}

			return {
				...state,
				items: {
					...state.items,
					[addedProduct.id]: updatedOrNewItem,
				},
				totalAmount: state.totalAmount + prodPrice,
			}

		default:
			return state
	}
}
