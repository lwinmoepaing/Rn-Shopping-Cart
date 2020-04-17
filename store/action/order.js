import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDER = 'SET_ORDER'

const URL = 'https://react-native-shop-cart.firebaseio.com/'

export const setOrder = () => {
	return async (dispatch) => {
		try {
			const user = 'u1'
			const response = await fetch(`${URL}/orders/${user}.json`)

			if (!response.ok) {
				throw new Error('Something went wrong')
			}

			const resData = await response.json()
			let loadedData = []

			for (let key in resData) {
				loadedData.push(
					new Order(
						key,
						resData[key].cartItems,
						resData[key].totalAmount,
						new Date(resData[key].date)
					)
				)
			}

			dispatch({
				type: SET_ORDER,
				orders: loadedData,
			})
		} catch (e) {
			throw e
		}
	}
}

// Actions Method
export const addOrder = (cartItems, totalAmount) => {
	return async (dispatch) => {
		try {
			const date = new Date()

			const response = await fetch(`${URL}/orders/u1.json`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cartItems,
					totalAmount,
					date: new Date().toISOString(),
				}),
			})

			if (!response.ok) {
				throw new Error('Something Went Wrong')
			}

			const resData = await response.json()

			dispatch({
				type: ADD_ORDER,
				orderData: {
					id: resData.name,
					items: cartItems,
					amount: totalAmount,
					date,
				},
			})
		} catch (e) {
			throw e
		}
	}
}
