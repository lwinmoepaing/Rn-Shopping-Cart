import Product from '../../models/product'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const SET_PRODUCT = 'SET_PRODUCT'

const URL = 'https://react-native-shop-cart.firebaseio.com/'

// Actions Methods
export const setProduct = () => {
	return async (dispatch, getState) => {
		try {
			const userId = getState().auth.userId
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
						resData[key].ownerId,
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
					)
				)
			}

			dispatch({
				type: SET_PRODUCT,
				products: products,
				userProducts: products.filter((prod) => prod.ownerId === userId),
			})
		} catch (e) {
			throw e
		}
	}
}

export const createProduct = (title, description, imageUrl, price) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().auth.token
			const userId = getState().auth.userId
			const response = await fetch(`${URL}/products.json?auth=${token}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					description,
					imageUrl,
					price,
					ownerId: userId,
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
					ownerId: userId,
				},
			})
		} catch (e) {
			throw e
		}
	}
}

export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch, getState) => {
		const body = {
			title,
			description,
			imageUrl,
		}

		try {
			const token = getState().auth.token
			const response = await fetch(`${URL}/products/${id}.json?auth=${token}`, {
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
	return async (dispatch, getState) => {
		const token = getState().auth.token
		try {
			await fetch(`${URL}/products/${productId}.json?auth=${token}`, {
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
