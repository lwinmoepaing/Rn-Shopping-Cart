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
		const res = await fetch(`${URL}/products.json`, {
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

		const resData = await res.json()
		console.log(resData)

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
	}
}

export const updateProduct = (id, title, description, imageUrl) => {
	return {
		type: UPDATE_PRODUCT,
		pid: id,
		productData: {
			title,
			description,
			imageUrl,
		},
	}
}

export const deleteProduct = (productId) => {
	return {
		type: DELETE_PRODUCT,
		pid: productId,
	}
}
