import products from '../../data/dummy-data'

const initialState = {
	availableProducts: products,
	userProducts: products.filter((product) => product.ownerId === 'u1'),
}

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
}
