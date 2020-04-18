import { AUTHENTICATE, LOGOUT } from '../action/auth'

const initialState = {
	token: null,
	userId: null,
	isAuth: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				token: action.token,
				userId: action.userId,
				isAuth: true,
			}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
