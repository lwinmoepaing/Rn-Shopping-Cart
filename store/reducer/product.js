import products from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../action/product'

const initialState = {
	availableProducts: products,
	userProducts: products.filter((product) => product.ownerId === 'u1'),
}

export default (state = initialState, action) => {
	switch (action.type) {
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
