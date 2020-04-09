import products from '../../data/dummy-data'

const initialState = {
	products,
	availableProducts: products.filter((product) => product.id === 'u1'),
}

export default (state = initialState, action) => {
	switch (action.type) {
		case '':
			return state
		default:
			return state
	}
}
