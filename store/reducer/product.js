import products from '../../data/dummy-data'
import {
	DELETE_PRODUCT,
	CREATE_PRODUCT,
	UPDATE_PRODUCT,
	SET_PRODUCT,
} from '../action/product'
import Product from '../../models/product'

const initialState = {
	availableProducts: products,
	userProducts: products.filter((product) => product.ownerId === 'u1'),
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCT:
			return {
				availableProducts: action.products,
				userProducts: action.products.filter(
					(product) => product.ownerId === 'u1'
				),
			}
		case CREATE_PRODUCT:
			// id, ownerId, title, imageUrl, description, price
			const newProduct = new Product(
				action.productData.id,
				'u1',
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				action.productData.price
			)
			return {
				...state,
				availableProducts: [...state.availableProducts, newProduct],
				userProducts: [...state.userProducts, newProduct],
			}
		case UPDATE_PRODUCT:
			const { pid } = action
			const productIndex = state.userProducts.findIndex(
				(prod) => prod.id === pid
			)
			const availableProductIndex = state.availableProducts.findIndex(
				(prod) => prod.id === pid
			)

			const updatedProduct = new Product(
				pid,
				state.userProducts[productIndex].ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				state.userProducts[productIndex].price
			)

			const updatedUserProducts = [...state.userProducts]
			updatedUserProducts[productIndex] = updatedProduct

			const updatedAvailableProducts = [...state.availableProducts]
			updatedAvailableProducts[availableProductIndex] = updatedProduct

			return {
				...state,
				availableProducts: updatedAvailableProducts,
				userProducts: updatedUserProducts,
			}
		case DELETE_PRODUCT:
			return {
				userProducts: state.userProducts.filter(
					(prod) => prod.id !== action.pid
				),
				availableProducts: state.availableProducts.filter(
					(prod) => prod.id !== action.pid
				),
			}
		default:
			return state
	}
}
