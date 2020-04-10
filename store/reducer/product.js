import products from '../../data/dummy-data'

const initialState = {
	products,
	availableProducts: products,
}

// console.log('reducer')
// console.log('initialState', initialState)

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
}
