import Cart from '../../models/cart-item'
import { ADD_TO_CART, REMOVE_FROM_CART } from '../action/cart'
import { ADD_ORDER } from '../action/order'

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
					state.items[addedProduct.id].quantity + 1,
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

		case REMOVE_FROM_CART:
			const selectedItem = state.items[action.pid]
			const selectedQuantity = selectedItem.quantity
			let updatedCartItems

			if (selectedQuantity > 1) {
				// Remove 1 count not erase
				const updatedCartItem = new Cart(
					selectedItem.quantity - 1,
					selectedItem.productPrice,
					selectedItem.productTitle,
					selectedItem.sum - selectedItem.productPrice
				)

				updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
			} else {
				// Delete
				updatedCartItems = { ...state.items }
				delete updatedCartItems[action.pid]
			}
			return {
				...state,
				items: updatedCartItems,
				totalAmount: state.totalAmount - selectedItem.productPrice,
			}

		case ADD_ORDER:
			return initialState
		default:
			return state
	}
}
