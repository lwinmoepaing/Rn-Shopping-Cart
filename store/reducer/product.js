import products from '../../data/dummy-data'

const initialState = {
	products,
	availableProducts: products,
}

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
}
