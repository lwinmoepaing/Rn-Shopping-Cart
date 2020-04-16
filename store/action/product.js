import Product from '../../models/product'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const SET_PRODUCT = 'SET_PRODUCT'

const URL = 'https://react-native-shop-cart.firebaseio.com/'

// Actions Methods
export const setProduct = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${URL}/products.json`)
			if (!response.ok) {
				throw new Error('Something went wrong')
			}
			const resData = await response.json()
			let products = []

			for (let key in resData) {
				products.push(
					new Product(
						key,
						'u1',
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
					)
				)
			}

			dispatch({
				type: SET_PRODUCT,
				products,
			})
		} catch (e) {
			throw e
		}
	}
}

export const createProduct = (title, description, imageUrl, price) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${URL}/products.json`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					description,
					imageUrl,
					price,
				}),
			})

			if (!response.ok) {
				throw new Error('Something went Wrong')
			}

			const resData = await response.json()

			dispatch({
				type: CREATE_PRODUCT,
				productData: {
					id: resData.name,
					title,
					description,
					imageUrl,
					price,
				},
			})
		} catch (e) {
			throw e
		}
	}
}

export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch) => {
		const body = {
			title,
			description,
			imageUrl,
		}

		try {
			const response = await fetch(`${URL}/products/${id}.json`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})

			if (!response.ok) {
				throw new Error('Something went wrong')
			}

			dispatch({
				type: UPDATE_PRODUCT,
				pid: id,
				productData: body,
			})
		} catch (e) {
			throw e
		}
	}
}

export const deleteProduct = (productId) => {
	return async (dispatch) => {
		try {
			await fetch(`${URL}/products/${productId}.json`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
		} catch (e) {
			console.error(e)
		}

		dispatch({
			type: DELETE_PRODUCT,
			pid: productId,
		})
	}
}
