import { ADD_ORDER } from '../action/order'
import Order from '../../models/order'

const initialState = {
	orders: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ORDER:
			const newOrder = new Order(
				Date.now().toString(),
				action.orderData.items,
				action.orderData.amount,
				new Date()
			)
			return {
				...state,
				orders: [...state.orders, newOrder],
			}

		default:
			return state
	}
}
