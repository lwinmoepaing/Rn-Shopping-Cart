import products from '../../data/dummy-data'

const initialState = {
	products,
	availableProducts: products.filter((product) => product.ownerId === 'u1'),
}

// console.log('reducer')
// console.log('initialState', initialState)

export default (state = initialState, action) => {
	switch (action.type) {
		case '':
			return state
		default:
			return state
	}
}
