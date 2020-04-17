import { SIGN_UP, SIGN_IN } from '../action/auth'

const initialState = {
	token: null,
	userId: null,
	isAuth: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_UP:
			return {
				token: action.token,
				userId: action.userId,
				isAuth: true,
			}
		case SIGN_IN:
			return {
				token: action.token,
				userId: action.userId,
				isAuth: true,
			}
		default:
			return state
	}
}
